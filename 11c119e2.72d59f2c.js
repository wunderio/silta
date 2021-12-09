(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{65:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),i=(r(0),r(96)),a={id:"key-components",title:"Key components"},c={unversionedId:"key-components",id:"key-components",isDocsHomePage:!1,title:"Key components",description:"Github",source:"@site/docs/key_components.md",slug:"/key-components",permalink:"/silta/docs/key-components",editUrl:"https://github.com/wunderio/silta/tree/master/docs/key_components.md",version:"current",sidebar:"someSidebar",previous:{title:"Helping with Silta development",permalink:"/silta/docs/help-with-silta-dev"},next:{title:"Migrating an existing Drupal project",permalink:"/silta/docs/migrating-an-existing-drupal-project"}},s=[{value:"Github",id:"github",children:[]},{value:"CircleCI",id:"circleci",children:[]},{value:"Kubernetes",id:"kubernetes",children:[]},{value:"Helm",id:"helm",children:[]}],l={toc:s};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"github"},"Github"),Object(i.b)("p",null,"All of our code is stored in Github within our organisation. All project-specific infrastructure\nconfiguration is versioned in Git. We provide a default templates for\n",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/drupal-project"},"Drupal projects"),", ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/frontend-project"},"Customized services")," (Originally frontend project) and ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/simple-project"},"Static pages"),", but any Docker-compatible application\nis supported."),Object(i.b)("h2",{id:"circleci"},"CircleCI"),Object(i.b)("p",null,"CircleCI is a cloud-based CI solution that integrates with Github.\nOne of the great features is the possibility to use your own builder images,\nwe use our own called ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/circleci-builder"},"circleci-builder"),"."),Object(i.b)("p",null,"We use CircleCi to check the repository for errors, build the codebase, build custom docker\nimages, push them to the registry and deploy a release of our Helm chart. The build process is based\non a config file located under ",Object(i.b)("inlineCode",{parentName:"p"},".circleci/config.yml")," in the git repository."),Object(i.b)("p",null,"To perform its duties, CircleCI needs certain credentials, for example to push to the docker image\nregistry or to interact with the Kubernetes master. These credentials are stored in a\n",Object(i.b)("a",{parentName:"p",href:"https://circleci.com/docs/2.0/contexts/"},"CircleCI Contexts")," and are available to any repository\nin our Github organisation."),Object(i.b)("h2",{id:"kubernetes"},"Kubernetes"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://kubernetes.io/"},"Kubernetes")," is an open source container orchestration platform supported by all major cloud hosting providers."),Object(i.b)("h2",{id:"helm"},"Helm"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://helm.sh/"},"Helm")," is a package manager for Kubernetes. We published our own chart repository: ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts"},"https://github.com/wunderio/charts"),". The chart is referenced from the CircleCI configuration, and each repository can also override the default values to adapt the configuration."))}p.isMDXComponent=!0},96:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,a=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(r),d=n,m=u["".concat(a,".").concat(d)]||u[d]||b[d]||i;return r?o.a.createElement(m,c(c({ref:t},l),{},{components:r})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var l=2;l<i;l++)a[l]=r[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);