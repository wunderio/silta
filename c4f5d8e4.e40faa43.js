(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{85:function(e,t,a){"use strict";a.r(t);var n=a(3),i=a(0),r=a.n(i),l=a(102),s=a(109),c=a(104),o=a(22),m=a(106),u=a(86),d=a.n(u),p=[{title:"What does Silta mean?",imageUrl:"img/carrot_1.svg",description:r.a.createElement(r.a.Fragment,null,'It means "bridge" in Finnish.')},{title:"Can I use Silta outside of Wunder?",imageUrl:"img/carrot_3.svg",description:r.a.createElement(r.a.Fragment,null,"Yes, our code is open. However, we haven't put special attention to this use case at this point.")},{title:"Does Silta support multisite?",imageUrl:"img/carrot_2.svg",description:r.a.createElement(r.a.Fragment,null,"This might be technically possible, but multisite setups provide little benefits in a container-based environment. Instead, it is recommended to trigger the deployment of multiple sites into dedicated environments from the same repository.")}];function g(e){var t=e.imageUrl,a=e.title,n=e.description,i=Object(m.a)(t);return r.a.createElement("div",{className:Object(l.a)("col col--4",d.a.feature)},i&&r.a.createElement("div",{className:"text--center"},r.a.createElement("img",{className:d.a.featureImage,src:i,alt:a})),r.a.createElement("h3",null,a),r.a.createElement("p",null,n))}t.default=function(){var e=Object(o.default)().siteConfig,t=void 0===e?{}:e;return r.a.createElement(s.a,{title:"Hello from "+t.title,description:"Description will go into a meta tag in <head />"},r.a.createElement("header",{className:Object(l.a)("hero hero--primary",d.a.heroBanner)},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"hero__title"},t.title),r.a.createElement("p",{className:"hero__subtitle"},t.tagline),r.a.createElement("div",{className:d.a.buttons},r.a.createElement(c.a,{className:Object(l.a)("button button--outline button--secondary button--lg",d.a.getStarted),to:Object(m.a)("docs/anatomy-of-silta")},"Get Started")))),r.a.createElement("main",null,p&&p.length>0&&r.a.createElement("section",{className:d.a.features},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},p.map((function(e,t){return r.a.createElement(g,Object(n.a)({key:t},e))})))))))}}}]);