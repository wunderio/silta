(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return d}));var n=r(0),i=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=i.a.createContext({}),u=function(e){var t=i.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=u(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),b=n,d=p["".concat(c,".").concat(b)]||p[b]||m[b]||o;return r?i.a.createElement(d,a(a({ref:t},s),{},{components:r})):i.a.createElement(d,a({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=b;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:n,c[1]=a;for(var s=2;s<o;s++)c[s]=r[s];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},67:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return a})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),i=r(7),o=(r(0),r(101)),c={},a={unversionedId:"vendor-eks",id:"vendor-eks",isDocsHomePage:!1,title:"vendor-eks",description:"Amazon Web Services compatibility",source:"@site/docs/vendor-eks.md",slug:"/vendor-eks",permalink:"/silta/docs/vendor-eks",editUrl:"https://github.com/wunderio/silta/tree/master/docs/vendor-eks.md",version:"current"},l=[{value:"Cluster requirements",id:"cluster-requirements",children:[]},{value:"Missing functionality",id:"missing-functionality",children:[]},{value:"Deployment specifics",id:"deployment-specifics",children:[]}],s={toc:l};function u(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"amazon-web-services-compatibility"},"Amazon Web Services compatibility"),Object(o.b)("p",null,"Silta is mostly AWS compatible, there are some requirements for environments deployed to EKS cluster."),Object(o.b)("h2",{id:"cluster-requirements"},"Cluster requirements"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Calico service which helps enforcing namespace (project) network separation;")),Object(o.b)("p",null,"There are few more requirements listed on ",Object(o.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/tree/master/silta-cluster#requirements"},"silta-cluster chart page"),", those are common for all silta-cluster installations "),Object(o.b)("h2",{id:"missing-functionality"},"Missing functionality"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"ALB ingress")),Object(o.b)("h2",{id:"deployment-specifics"},"Deployment specifics"),Object(o.b)("p",null,"There is no extra configuration required for basic deployments. The only change would be ",Object(o.b)("inlineCode",{parentName:"p"},"cluster.type")," but it's normally overridden in CI pipeline."),Object(o.b)("p",null,"Drupal, frontend and simple charts:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"cluster:\n  type: aws\n")))}u.isMDXComponent=!0}}]);