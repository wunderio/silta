(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{108:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return l})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return s}));var n=r(3),o=r(7),a=(r(0),r(113)),i={id:"help-with-silta-dev",title:"Helping with Silta development"},l={unversionedId:"help-with-silta-dev",id:"help-with-silta-dev",isDocsHomePage:!1,title:"Helping with Silta development",description:"First and foremost, help updating this docs directory.",source:"@site/docs/helping_with_silta_development.md",slug:"/help-with-silta-dev",permalink:"/silta/docs/help-with-silta-dev",editUrl:"https://github.com/wunderio/silta/docs/helping_with_silta_development.md",version:"current",sidebar:"someSidebar",previous:{title:"Go-live checklist",permalink:"/silta/docs/go-live-checklist"},next:{title:"Key components",permalink:"/silta/docs/key-components"}},c=[{value:"Development workflow",id:"development-workflow",children:[]},{value:"Testing workflow",id:"testing-workflow",children:[]},{value:"Some tips and external documentation when working with HELM charts",id:"some-tips-and-external-documentation-when-working-with-helm-charts",children:[]}],p={toc:c};function s(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"First and foremost, help updating this docs directory."),Object(a.b)("h2",{id:"development-workflow"},"Development workflow"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Each chart (drupal, frontend, simple) has respective project that uses the chart as subfolder under ",Object(a.b)("inlineCode",{parentName:"li"},"/charts"),". So adjustments to chart can be made on each commit. Check ",Object(a.b)("a",{parentName:"li",href:"https://github.com/wunderio/drupal-project-k8s/blob/master/.circleci/config.yml#L29"},".cirlceci/config.yml")," in Drupal chart to see how it's defined. So you make a PR for a specific chart (either ",Object(a.b)("a",{parentName:"li",href:"https://github.com/wunderio/drupal-project-k8s"},"drupal-project-k8s")," or ",Object(a.b)("a",{parentName:"li",href:"https://github.com/wunderio/frontend-project-k8s"},"frontend-project-k8s")," or ",Object(a.b)("a",{parentName:"li",href:"https://github.com/wunderio/simple-project-k8s"},"simple-project-k8s"),")"),Object(a.b)("li",{parentName:"ol"},"Someone from core dev team will review changes and accept or reject the PR. Once accepted by one of them, it can be merged to master."),Object(a.b)("li",{parentName:"ol"},"Then there are 2 options:",Object(a.b)("ol",{parentName:"li"},Object(a.b)("li",{parentName:"ol"},"Time to time one of us diffs wunderio/charts/drupal to wunderio/drupal-project-k8s/charts/drupal and just copies over multiple changes in bulk and increments chart version in both repos, making them in sync again."),Object(a.b)("li",{parentName:"ol"},"You can make a copy of that accepted PR to wunderio/charts repo where it will be accepted again.")))),Object(a.b)("h2",{id:"testing-workflow"},"Testing workflow"),Object(a.b)("p",null,"If you want to test a feature PR, you can do it like this:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Make a new branch from feature/myAwesomeThing -> feature/myAwesomeThing-test."),Object(a.b)("li",{parentName:"ol"},"Enable the myAwesomeThing related functionality or apply new configuration related to the feature."),Object(a.b)("li",{parentName:"ol"},"Commit the changes to the test branch and push to origin."),Object(a.b)("li",{parentName:"ol"},"Check that functionality works as it should."),Object(a.b)("li",{parentName:"ol"},"Write tests when possible and push them to the original feature branch or request the original author to add them."),Object(a.b)("li",{parentName:"ol"},"Delete the test branch if everything works.")),Object(a.b)("h2",{id:"some-tips-and-external-documentation-when-working-with-helm-charts"},"Some tips and external documentation when working with HELM charts"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"https://helm.sh/docs/chart_template_guide/control_structures/"},"Helm template guide - control structures"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("a",{parentName:"p",href:"http://masterminds.github.io/sprig/defaults.html"},"Goland Sprig functions")),Object(a.b)("p",null,"To test charts locally You will need access to ",Object(a.b)("a",{parentName:"p",href:"https://intra.wunder.io/info/silta/silta-ops-manual"},"Silta Dev cluster")," and Helm installed locally",Object(a.b)("br",{parentName:"p"}),"\n","Most likely You will need to add Helm repos before testing.",Object(a.b)("br",{parentName:"p"}),"\n","See example below.",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"helm repo add wunderio https://storage.googleapis.com/charts.wdr.io"),"  "),Object(a.b)("p",null,"Do dry-run with",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"helm upgrade --install test charts/drupal --dry-run --debug --values silta/silta.yml"),"  "))}s.isMDXComponent=!0},113:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return h}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=o.a.createContext({}),s=function(e){var t=o.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=s(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(r),m=n,h=u["".concat(i,".").concat(m)]||u[m]||d[m]||a;return r?o.a.createElement(h,l(l({ref:t},p),{},{components:r})):o.a.createElement(h,l({ref:t},p))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:n,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);