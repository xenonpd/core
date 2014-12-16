from collections import OrderedDict

from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.core import serializers
import cvs.models as cm
import projects.models as pm


class CCCSDetailView(DetailView):

    def get_context_data(self, **kwargs):
        context = super(CCCSDetailView, self).get_context_data(**kwargs)
        context['serialized'] = serializers.serialize('python', [self.get_object()])[0]
        return context


class ProjectDetailView(CCCSDetailView):
    model = pm.Project

    def get_context_data(self, **kwargs):
        context = super(ProjectDetailView, self).get_context_data(**kwargs)
        context['cvproject_list'] = self.get_object().cvproject_set.all()
        context['sub_projects'] = pm.Project.objects.filter(parent=self.get_object()).all()
        context['super_project'] = self.get_object().parent

        if not self.request.user.is_staff:
            context['cvproject_list'] = self.get_object().cvproject_set.filter(cv__status=cm.CONTENT_STATUS_PUBLISHED)
            context['sub_projects']  = context['sub_projects'].filter(status=cm.CONTENT_STATUS_PUBLISHED)
            if context['super_project'] and context['super_project'].status==cm.CONTENT_STATUS_DRAFT:
                context['super_project'] = None

        return context


class ProjectCCCSThemeListView(ListView):
    model = pm.Project
    categorization_fieldname = 'cccs_subthemes'
    categorization_parent_fieldname = 'theme'
    categorization_label = 'CCCS Theme'
    template_name = "projects/project_list2.html"
    show_piechart1 = True
    def get_context_data(self, **kwargs):
        context = super(ProjectCCCSThemeListView, self).get_context_data(**kwargs)
        context['categorization_name'] = self.categorization_label
        context['use_right_col'] = "No"  # a bit hacky but it will do for now
        context['show_piechart1'] = self.show_piechart1
        if self.show_piechart1:
            context['categorization'] = categorize_projects2(context['object_list'],
                                                             self.categorization_fieldname,
                                                             self.categorization_parent_fieldname,
                                                             not self.request.user.is_staff)

            context['country_categorization'] = categorize_projects2_by_country(context['object_list'],
                                                             self.categorization_fieldname,
                                                             self.categorization_parent_fieldname,
                                                             not self.request.user.is_staff)

            temp = []
            max = 0
            color_max = 0xFFCC00
            color_min = 0x990000
            for c in pm.Country.objects.all():
                if c.project_count > 0:
                    temp.append({'id': c.iso.encode('ascii','ignore') if c.iso_3166 else '', 'value': c.project_count})
                    if max < c.project_count:
                        max = c.project_count
            context['max'] = max
            context['country_projects'] = temp

        return context


class ProjectIFCThemeListView(ProjectCCCSThemeListView):
    categorization_fieldname = 'ifc_subthemes'
    categorization_label = 'IFC Performance Standard'
    show_piechart1 = True

class ProjectCCCSSectorListView(ProjectCCCSThemeListView):
    categorization_fieldname = 'cccs_subsectors'
    categorization_parent_fieldname = 'sector'
    categorization_label = 'CCCS Sector'
    show_piechart1 = False

class ProjectCCCSSubSectorListView(ListView):
    model = pm.Project
    template_name = "projects/project_cccs_sub_list.html"

    def get_context_data(self, **kwargs):
        context = super(ProjectCCCSSubSectorListView, self).get_context_data(**kwargs)
        sub = pm.CCCSSubSector.objects.get(pk=int(self.kwargs['pk']))
        context['sub'] = sub
        projects = pm.Project.objects.filter(cccs_subsectors=sub, parent=None)
        if not self.request.user.is_staff:
            projects = projects.filter(status=pm.CONTENT_STATUS_PUBLISHED, parent=None)
        context['projects'] = projects
        return context


class ProjectCCCSSectorExperienceView(ProjectCCCSThemeListView):
    categorization_fieldname = 'cccs_subsectors'
    categorization_parent_fieldname = 'sector'
    categorization_label = 'CCCS Sector'
    template_name = "projects/cccs_sector_experience.html"
    def get_context_data(self, **kwargs):
        context = super(ProjectCCCSSectorExperienceView, self).get_context_data(**kwargs)
        context['show_piechart1'] = False
        # Create a roughly equal pair of columns for the categorization
        categorization = context['categorization']
        categorization_cols = (OrderedDict(), OrderedDict())

        def next_col():
            while True:
                yield 0
                yield 1
        col = next_col()
        for super_name in categorization:
            categorization_cols[col.next()][super_name] = categorization[super_name]
        context['categorization_cols'] = categorization_cols
        return context


class ProjectCountryListView(ListView):
    model = pm.Project
    categorization_fieldname = 'countries'
    categorization_label = 'Country'
    template_name = "projects/project_list1.html"
    country_map = True
    def get_context_data(self, **kwargs):
        context = super(ProjectCountryListView, self).get_context_data(**kwargs)
        context['categorization_name'] = self.categorization_label
        context['country_map'] = self.country_map
        context['use_right_col'] = "No"  # a bit hacky but it will do for now
        context['categorization'] = categorize_projects(context['object_list'],
                                                        self.categorization_fieldname,
                                                        not self.request.user.is_staff)

        return context

    def get_queryset(self):
        qs = super(ProjectCountryListView, self).get_queryset()
        qs = qs.filter(parent=None)
        if not self.request.user.is_staff:
            qs = qs.filter(status=pm.CONTENT_STATUS_PUBLISHED)

        return qs


class ProjectIFCSectorListView(ProjectCountryListView):
    categorization_fieldname = 'ifc_sectors'
    categorization_label = 'IFC Sector'
    country_map = False

class ProjectCCCSProjectListView(ListView):
    model = pm.Project
    template_name = "projects/cccs_project_list.html"

    def get_queryset(self):
        qs = super(ProjectCCCSProjectListView, self).get_queryset()
        qs = qs.filter(parent=None)
        if not self.request.user.is_staff:
            qs = qs.filter(status=pm.CONTENT_STATUS_PUBLISHED)
        return qs.filter(tags__name__in=['CCCS'])


def categorize_projects(projects, categorization_fieldname, published_only):
    """
    Organise the projects using a single categorization layer
    """
    categorization = dict()
    for project in projects:
        if project.parent:
            continue
        if published_only and project.status == pm.CONTENT_STATUS_DRAFT:
            continue
        categories = getattr(project, categorization_fieldname).all()
        for category in categories:
            category_name = category.name
            if category_name not in categorization:
                categorization[category_name] = dict(projects=list(), count=0)
            categorization[category_name]['count'] += 1
            categorization[category_name]['id'] = category.id
            if categorization_fieldname == 'countries':
                country = pm.Country.objects.filter(name=category_name).first()
                categorization[category_name]['code'] = country.iso if country else ''
            categorization[category_name]['projects'].append(project)
    return OrderedDict(((k, categorization[k]) for k in sorted(categorization.keys())))


def categorize_projects2(projects, categorization_fieldname, categorization_parent_fieldname, published_only):
    """
    Organise the projects so that they are nested in the sub categorizations
    """
    categorization = dict()
    for project in projects:
        if project.parent:
            continue
        if published_only and project.status == pm.CONTENT_STATUS_DRAFT:
            continue
        sub_categorizations = getattr(project, categorization_fieldname).all()

        for sub in sub_categorizations:
            sub_name = sub.name
            super_name = getattr(sub, categorization_parent_fieldname).name

            if super_name not in categorization:
                categorization[super_name] = dict(subs=dict(), count=0)

            if sub_name not in categorization[super_name]['subs']:
                categorization[super_name]['subs'][sub_name] = dict(projects=list(), count=0)

            categorization[super_name]['count'] += 1
            categorization[super_name]['id'] = getattr(sub, categorization_parent_fieldname).id
            categorization[super_name]['subs'][sub_name]['projects'].append(project)
            categorization[super_name]['subs'][sub_name]['count'] += 1
            categorization[super_name]['subs'][sub_name]['id'] = sub.id

    for info in categorization.values():
        info['subs'] = OrderedDict(((k, info['subs'][k]) for k in sorted(info['subs'].keys())))
    return OrderedDict(((k, categorization[k]) for k in sorted(categorization.keys())))

def categorize_projects2_by_country(projects, categorization_fieldname, categorization_parent_fieldname, published_only):
    """
    Organize he projects so that they are nested in the countries and then sub categorizations
    """
    country_categorization = dict()
    for project in projects:
        if project.parent:
            continue
        if published_only and project.status == pm.CONTENT_STATUS_DRAFT:
            continue
        categorization = dict()
        countries = getattr(project, 'countries').all()
        for country in countries:
            country_code = country.iso.encode('ascii','ignore')
            if country_code not in country_categorization:
                country_categorization[country_code] = dict()

            sub_categorizations = getattr(project, categorization_fieldname).all()

            for sub in sub_categorizations:
                super_name = getattr(sub, categorization_parent_fieldname).name.encode('ascii','ignore')

                if super_name not in country_categorization[country_code]:
                    country_categorization[country_code][super_name] = 0

                country_categorization[country_code][super_name] += 1
    for country_code in country_categorization:
        country_categorization[country_code] = sorted([[key, country_categorization[country_code][key]] for key in country_categorization[country_code]], key=lambda x: x[0])
    return country_categorization