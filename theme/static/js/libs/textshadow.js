var textShadowForMSIE=new function(){function i(e,t,n){e.addEventListener?e.addEventListener(t,n,false):e.attachEvent?e.attachEvent("on"+t,function(){n.call(e,window.event)}):e["on"+t]=function(t){n.call(e,t||window.event)}}function s(e){return n&&(r==7||r==8)?e.currentStyle:document.defaultView.getComputedStyle(e,"")}function o(e){if(e.firstElementChild){return e.firstElementChild}else{var t=e.children;for(var n=0;n<t.length;n++){if(t[n].nodeType==1){return t[n]}}return null}}function u(e){var t=document.createElement("span");t.innerHTML='<a href="'+e+'" />';return t.firstChild.href}function a(e){return e.nodeType==1?e:(e=e.previousSibling,e!=null?a(e):null)}function f(e){var t=[];for((e=e.previousSibling)&&e.nodeType==1&&(t[t.length]=e);e!=null;){(e=e.previousSibling)&&e.nodeType==1&&(t[t.length]=e)}return t}function l(e){var t=[];if(e=e.parentNode){for(t[t.length]=e;e.nodeName.toLowerCase()!="body";){(e=e.parentNode)&&(t[t.length]=e)}}return t}function c(e){if(e.match(/(rgba?)\(\s*([0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?)\s*(,\s*[01]?[\.0-9]*)?\s*\)/)){for(var t=RegExp.$1,n=RegExp.$2.split(/,/),r=RegExp.$3||"",i=[],s=0,o=n.length;s<o;s++){n[s].match(/([0-9\.]+)%/)&&(n[s]=Math.round(RegExp.$1*255/100));i[i.length]=n[s]}return t+"("+i.join(",")+r+")"}}function h(e,t){if(/px$/.test(e)){return parseInt(e)}var n=document.createElement("div");n.style.visbility="hidden";n.style.position="absolute";n.style.lineHeight="0";if(/%$/.test(e)){t=t.parentNode||t;n.style.height=e}else{n.style.borderStyle="solid";n.style.borderBottomWidth="0";n.style.borderTopWidth=e}if(!t){t=document.body}t.appendChild(n);var r=n.offsetHeight;t.removeChild(n);return r}function p(e,t){var n=function(e){var t=m(),n=document.createElement("div");n.id="dummyDiv"+t;t++;n.style.width=e;n.style.height=0;n.style.visibility="hidden";var r=document.getElementsByTagName("body")[0];r.appendChild(n);var i=document.getElementById(n.id),s=i.getBoundingClientRect().right-i.getBoundingClientRect().left;r.removeChild(i);return s>=0?s:s*-1};if(e.match(/^0(em|ex|px|cm|mm|in|pt|pc)?$/)){return 0}else if(e.match(/^(\-?[0-9\.]+)px$/)){return RegExp.$1*1}else if(e.match(/^(\-?[0-9\.]+)(cm|mm|in|pt|pc)$/)){return RegExp.$1*1>=0?n(e):n(RegExp.$1*-1+RegExp.$2)*-1}else if(e.match(/^(\-?[0-9\.]+)(em|ex)$/)){var r=n(e)/n("1"+RegExp.$2);var i=l(t),o=document.getElementsByTagName("html")[0],u=[];i.unshift(t);i[i.length]=o;for(var a=0,f=i.length;a<f;a++){u[u.length]=s(i[a]).fontSize}for(a=0,f=u.length;a<f;a++){if(u[a].match(/^([0-9\.]+)%$/)){r*=RegExp.$1/100}else if(u[a].match(/^([0-9\.]+)(em|ex)$/)){r*=n(u[a])/n("1"+RegExp.$2)}else if(u[a].match(/^smaller$/)){r/=1.2}else if(u[a].match(/^larger$/)){r*=1.2}else if(u[a].match(/^([0-9\.]+)(px|cm|mm|in|pt|pc)$/)){r*=n(u[a]);break}else if(u[a].match(/^xx\-small$/)){r*=n(s(o).fontSize)/1.728;break}else if(u[a].match(/^x\-small$/)){r*=n(s(o).fontSize)/1.44;break}else if(u[a].match(/^small$/)){r*=n(s(o).fontSize)/1.2;break}else if(u[a].match(/^medium$/)){r*=n(s(o).fontSize);break}else if(u[a].match(/^large$/)){r*=n(s(o).fontSize)*1.2;break}else if(u[a].match(/^x\-large$/)){r*=n(s(o).fontSize)*1.44;break}else if(u[a].match(/^xx\-large$/)){r*=n(s(o).fontSize)*1.728;break}else if(u[a].match(/^([0-9\.]+)([a-z]+)/)){r*=n(u[a]);break}else{break}}return Math.round(r)}}function d(e){for(var t=e.replace(/\s+/,"").split(/;/),n=[],r,i=0,s=t.length;i<s;i++){r=true;for(var o=i;o<s;o++){i!=o&&t[i]==t[o]&&(r=false)}r&&t[i]!=""&&(n[n.length]=t[i])}return n.join(";")+";"}var e=this;var t=0;e.ieShadowSettings=new Array;var n=false;var r=function(e){return n&&navigator.userAgent.match(e)?RegExp.$1*1:null}(/MSIE\s([0-9]+[\.0-9]*)/);var v=function(e){for(var t=[],n=0,r=e.length;n<r;n++){t.unshift(e[n])}return t};var m=function(e){return function(){return e++}}(0);e.showElm=function(e){e.style.visibility="visible"};e.hideElm=function(e){e.style.visibility="hidden"};var g=function(e){var n=function(e){for(var t=e.childNodes,r=0,i=t.length;r<i;r++){if(t[r].nodeType==1){if(!t[r].hasChildNodes()){t[r].style.visibility="hidden"}else{t[r].style.color=e.style.color;n(t[r])}}}};var i=function(e,t){for(var n=t.childNodes,r=0,s=n.length;r<s;r++){if(n[r].hasChildNodes()){if(n[r].nodeName.toLowerCase()==e.tagName.toLowerCase()&&n[r].firstChild==e.firstChild){n[r].style.visibility="hidden"}else{i(e,n[r])}}}};var o=function(e){for(var t=true,n=l(e),r=0,i=n.length;r<i;r++){if(n[r].tagName.toLowerCase()=="span"&&n[r].className.match(/dummyShadow/)){t=false;break}}return t};if(e.shadow!="invalid"){for(var u=[],a=e.elm.childNodes,f=false,c=0,h=a.length;c<h;c++){if(a[c].nodeName.toLowerCase()=="span"&&a[c].className.match(/dummyShadow/)){a[c].className.match(/hasImp/)&&(f=true);u[u.length]=a[c].id}}if(f==false||e.hasImp==true){var m=e.elm.getAttribute("onmouseover")||"";var g=e.elm.getAttribute("onmouseout")||"";m!=""&&!m.match(/;$/)&&(m+=";");g!=""&&!g.match(/;$/)&&(g+=";");for(c=0,h=u.length;c<h;c++){if(e.ePseudo=="hover"&&e.shadow=="none"){m+="textShadowForMSIE.hideElm("+u[c]+");";g+="textShadowForMSIE.showElm("+u[c]+");"}else if(!(e.ePseudo=="hover"&&e.shadow!="none")){e.elm.removeChild(document.getElementById(u[c]))}}e.ePseudo=="hover"&&e.shadow=="none"&&(e.elm.setAttribute("onmouseover",m),e.elm.setAttribute("onmouseout",g));for(var y,b=l(e.elm),c=0,h=b.length;c<h;c++){y==null&&(s(b[c]).backgroundColor!="transparent"||s(b[c]).backgroundImage!="none")&&(y=b[c]);for(var w=b[c].childNodes,E=0,S=w.length;E<S;E++){w[E].nodeType==1&&w[E].nodeName.toLowerCase()=="span"&&w[E].className.match(/dummyShadow/)&&i(e.elm,document.getElementById(w[E].id))}}e.shadow!="none"&&e.shadow.length>1&&(s(e.elm).backgroundColor!="transparent"||s(e.elm).backgroundImage!="none")&&(e.shadow=v(e.shadow));if(e.shadow=="none"&&e.ePseudo!="hover"){for(var u=e.elm.parentNode.childNodes,c=0,h=u.length;c<h;c++){if(u[c].nodeName.toLowerCase()=="span"&&u[c].className=="dummyShadow"){s(e.elm).position=="relative"?e.elm.style.position="static":s(e.elm).position;s(e.elm).display=="inline-block"?e.elm.style.display="inline":s(e.elm).display;break}}}if(e.shadow!="none"&&a.length!=0&&o(e.elm)){for(var x=[],T=e.elm.cloneNode(true),N=T.childNodes,c=0,h=N.length;c<h;c++){N[c]!=null&&N[c].hasChildNodes()&&N[c].nodeName.toLowerCase()=="span"&&N[c].className.match(/dummyShadow/)&&(x[x.length]=N[c].id,T.removeChild(N[c]))}var C=T.innerHTML;r==9&&(C=C.replace(/\n/," "));r==8&&(e.elm.innerHTML=e.elm.innerHTML);var k=-1;for(c=0,h=e.shadow.length;c<h;c++){var L=p(e.shadow[c].z,e.elm);var A=p(e.shadow[c].x,e.elm)-L+p(s(e.elm).paddingLeft,e.elm)-p(s(e.elm).borderTopLeftRadius,e.elm)/2;var O=p(e.shadow[c].y,e.elm)-L+p(s(e.elm).paddingTop,e.elm);var M=e.shadow[c].cProf||s(e.elm).color;var _=1;e.shadow[c].cProf!=null&&e.shadow[c].cProf.match(/rgba\(\s*([0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+)\s*,\s*([01]?[\.0-9]*)\)/)&&(M="rgb("+RegExp.$1+")",_=RegExp.$2*1);var D=document.createElement("span");D.id="dummyShadow"+t;t++;D.className=e.hasImp==true?"dummyShadow hasImp":"dummyShadow";D.style.display="block";D.style.position="absolute";D.style.left=A+"px";D.style.top=O+"px";D.style.width="100%";D.style.color=M;var P=DOMHelpers.getDatasetItem(e.elm,"cssSandpaper-chroma");if(!P){P="#808080"}D.style.backgroundColor=P;D.style.filter="progid:DXImageTransform.Microsoft.Chroma(color="+P+"), progid:DXImageTransform.Microsoft.Blur(PixelRadius="+L+", MakeShadow=false, ShadowOpacity="+_+")";D.style.zIndex=-(c+1);D.innerHTML=C;if(s(e.elm).display=="inline"){e.elm.style.display="inline-block"}if(!(s(e.elm).position=="absolute"||s(e.elm).position=="fixed")){e.elm.style.position="relative";r==7&&e.elm.nodeName!="TD"&&e.elm.nodeName!="TH"&&(e.elm.style.top=s(e.elm).paddingTop)}if(s(e.elm).backgroundColor!="transparent"||s(e.elm).backgroundImage!="none"){s(e.elm).zIndex!=("auto"||null)?D.style.zIndex=e.elm.style.zIndex:e.elm.style.zIndex=D.style.zIndex=-1}if(y&&y.tagName.toLowerCase()!="body"){e.elm.style.zIndex=1;D.style.zIndex=k;var H=e.elm.currentStyle.backgroundColor;if(r>7||H=="transparent"){k--}}e.elm.appendChild(D);if(e.ePseudo=="hover"){D.style.visibility="hidden";m=e.elm.getAttribute("onmouseover")||"";g=e.elm.getAttribute("onmouseout")||"";m!=""&&!m.match(/;$/)&&(m+=";");g!=""&&!g.match(/;$/)&&(g+=";");m+="textShadowForMSIE.showElm("+D.id+");";g+="textShadowForMSIE.hideElm("+D.id+");";if(x.length>0){for(E=0,S=x.length;E<S;E++){var B=document.getElementById(x[E]);if(B){m+="textShadowForMSIE.hideElm("+B.id+");";g+="textShadowForMSIE.showElm("+B.id+");"}}}e.elm.setAttribute("onmouseover",d(m));e.elm.setAttribute("onmouseout",d(g))}}for(var j=document.getElementsByTagName("span"),c=0,h=j.length;c<h;c++){j[c].className.match(/dummyShadow/)&&n(j[c])}}}}};var y=function(e){var t=function(e){if(!e){return null}else{return e.id!=null?document.getElementById(e.id):document.getElementsByTagName(e.elm)}};var n=function(e,t){return(e.id!=null&&t.id!=null&&e.id==t.id||e.id==null||t.id==null)&&(e.elm==t.tagName.toLowerCase()||e.elm=="*")&&(e.eClass!=null&&t.className!=null&&e.eClass==t.className||e.eClass==null)?true:false};var r=t(e.tElm);var i={elm:null,ePseudo:e.tElm?e.tElm.ePseudo:null,shadow:e.sVal,hasImp:e.sImp};for(var s=0,o=e.elm.length;s<o;s++){i.elm=e.elm[s];g(i)}};var b=function(e){if(e.match(/none/)){return"none"}else{for(var t=[],n=e.match(/((rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\s)?(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s*){2,3}(rgba?\(\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*,\s*[0-9\.]+%?\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)?/g),r=0,i=n.length;r<i;r++){t[r]={x:"0",y:"0",z:"0",cProf:null};var s=n[r].match(/\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?\s+\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?(\s+[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)?/);if(s=s[0].split(/\s+/),s[0].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/)&&s[1].match(/^(\-?[0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/)){s.length>=2&&(t[r].x=s[0],t[r].y=s[1]);s.length==3&&s[2].match(/^([0-9\.]+(em|ex|px|cm|mm|in|pt|pc)?)$/)&&(t[r].z=s[2]);n[r].match(/%/)&&(n[r]=c(n[r]));n[r].match(/^(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|[a-zA-Z]+)/)?t[r].cProf=RegExp.$1:n[r].match(/\s(rgba?\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[0-9]+\s*(,\s*[01]?[\.0-9]*\s*)?\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/)&&(t[r].cProf=RegExp.$1)}else{t="invalid";break}}return t}};var w=function(e){if(e!=null){var t={elm:"*",id:null,eClass:null,ePseudo:null};e.match(/^([a-zA-Z\*]{1}[a-zA-Z0-9]*)/)&&(t.elm=RegExp.$1);e.match(/#([a-zA-Z_]{1}[a-zA-Z0-9_\-]*)/)&&(t.id=RegExp.$1);e.match(/\.([a-zA-Z_]{1}[a-zA-Z0-9_\-]*)/)&&(t.eClass=RegExp.$1);e.match(/:([a-z]{1}[a-z0-9\(\)\-]+)/)&&(t.ePseudo=RegExp.$1);return t}if(e==null){return null}};e.init=function(){for(var t=e.ieShadowSettings,n=m(),r=0,i=t.length;r<i;r++){for(var s=t[r].sel.split(/,/),o=/^\s*([a-zA-Z0-9#\.:_\-\s>\+~]+)\s*$/,u=0,a=s.length;u<a;u++){s[u].match(o)&&(s[u]=RegExp.$1);var f={type:null,tElm:null,rElm:null,sVal:null,sImp:null};if(document.querySelectorAll){f.elm=document.querySelectorAll(s[u].trim())}else{f.elm=cssQuery(s[u].trim())}f.sVal=b(t[r].shadow);f.sImp=t[r].shadow.match(/important/)?true:false;if(f.elm.length>0){y(f)}}}}}