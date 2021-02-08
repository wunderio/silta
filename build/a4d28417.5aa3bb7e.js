(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{113:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=i.a.createContext({}),u=function(e){var t=i.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return i.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,h=p["".concat(c,".").concat(d)]||p[d]||b[d]||a;return n?i.a.createElement(h,o(o({ref:t},s),{},{components:n})):i.a.createElement(h,o({ref:t},s))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var s=2;s<a;s++)c[s]=n[s];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},93:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),i=n(7),a=(n(0),n(113)),c={id:"go-live-checklist",title:"Go-live checklist"},o={unversionedId:"go-live-checklist",id:"go-live-checklist",isDocsHomePage:!1,title:"Go-live checklist",description:"These are the Silta-specific steps that should be checked before going live.",source:"@site/docs/go-live-checklist.md",slug:"/go-live-checklist",permalink:"/silta/build/docs/go-live-checklist",editUrl:"https://github.com/wunderio/silta/docs/go-live-checklist.md",version:"current",sidebar:"someSidebar",previous:{title:"Encrypting sensitive configuration",permalink:"/silta/build/docs/encrypting-sensitive-configuration"},next:{title:"Helping with Silta development",permalink:"/silta/build/docs/help-with-silta-dev"}},l=[{value:"Github",id:"github",children:[]},{value:"Resources",id:"resources",children:[]}],s={toc:l};function u(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"These are the Silta-specific steps that should be checked before going live.\nNote that this list does not include application-specific steps\n(for example making sure that the root account of the CMS is disabled)."),Object(a.b)("p",null,"The production environment only costs more when it requests additional resources.\nWe recommend setting up and using the production branch early in the project so any issues are\nidentified as soon as possible."),Object(a.b)("h2",{id:"github"},"Github"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Set up deletion protection for the master and production branches."),Object(a.b)("li",{parentName:"ul"},"Make sure the required people are added to the group which has access to the production CircleCI context.")),Object(a.b)("h2",{id:"resources"},"Resources"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Make sure all services have dedicated resources:",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"PHP / Javascript"),Object(a.b)("li",{parentName:"ul"},"MariaDB"),Object(a.b)("li",{parentName:"ul"},"Elasticsearch / Memcached / etc."))),Object(a.b)("li",{parentName:"ul"},"Make sure relevant services are using autoscaling with at least two replicas\nfor high availability."),Object(a.b)("li",{parentName:"ul"},"Do a basic load test to make sure that autoscaling works.")),Object(a.b)("h1",{id:"configuration"},"Configuration"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Sparkpost key is set (if applicable)"),Object(a.b)("li",{parentName:"ul"},"Backups are enabled"),Object(a.b)("li",{parentName:"ul"},"Make sure the production static IP is set up if any whitelisting is needed for third-party integrations")),Object(a.b)("h1",{id:"web-access"},"Web access"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Recommended: set up a ",Object(a.b)("inlineCode",{parentName:"li"},"beta.example.com")," domain that can be used to test the process of configuring DNS."),Object(a.b)("li",{parentName:"ul"},"Domain names are set in silta.yml, configured to use SSL with letsencrypt or custom certifcates"),Object(a.b)("li",{parentName:"ul"},"Some time before switching the DNS, set the TTL of any existing DNS entries to be short, like 1 minute (cached DNS\nentries can cause a variety of issues, like failing letsencrypt DNS challenges)."),Object(a.b)("li",{parentName:"ul"},"BasicAuth is disabled")))}u.isMDXComponent=!0}}]);