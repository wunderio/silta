(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{100:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(118);Object.defineProperty(t,"useThemeConfig",{enumerable:!0,get:function(){return r.useThemeConfig}});var o=n(139);Object.defineProperty(t,"docVersionSearchTag",{enumerable:!0,get:function(){return o.docVersionSearchTag}}),Object.defineProperty(t,"DEFAULT_SEARCH_TAG",{enumerable:!0,get:function(){return o.DEFAULT_SEARCH_TAG}});var i=n(119);Object.defineProperty(t,"isDocsPluginEnabled",{enumerable:!0,get:function(){return i.isDocsPluginEnabled}});var u=n(143);Object.defineProperty(t,"isSamePath",{enumerable:!0,get:function(){return u.isSamePath}});var s=n(144);Object.defineProperty(t,"useTitleFormatter",{enumerable:!0,get:function(){return s.useTitleFormatter}});var c=n(145);Object.defineProperty(t,"useDocsPreferredVersion",{enumerable:!0,get:function(){return c.useDocsPreferredVersion}}),Object.defineProperty(t,"useDocsPreferredVersionByPluginId",{enumerable:!0,get:function(){return c.useDocsPreferredVersionByPluginId}});var a=n(120);Object.defineProperty(t,"DocsPreferredVersionContextProvider",{enumerable:!0,get:function(){return a.DocsPreferredVersionContextProvider}})},101:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}t.a=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},102:function(e,t,n){try{e.exports=n(140)}catch(r){e.exports={}}},103:function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=n(11),u=n(110),s=n(10),c=Object(r.createContext)({collectLink:function(){}}),a=n(105),f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};t.a=function(e){var t,n,d,l=e.isNavLink,v=e.to,g=e.href,p=e.activeClassName,h=e.isActive,D=e["data-noBrokenLinkCheck"],P=e.autoAddBaseUrl,b=void 0===P||P,m=f(e,["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"]),V=Object(a.b)().withBaseUrl,_=Object(r.useContext)(c),O=v||g,A=Object(u.a)(O),y=null==O?void 0:O.replace("pathname://",""),j=void 0!==y?(n=y,b&&function(e){return e.startsWith("/")}(n)?V(n):n):void 0,w=Object(r.useRef)(!1),C=l?i.e:i.c,E=s.a.canUseIntersectionObserver;Object(r.useEffect)((function(){return!E&&A&&window.docusaurus.prefetch(j),function(){E&&d&&d.disconnect()}}),[j,E,A]);var L=null!==(t=null==j?void 0:j.startsWith("#"))&&void 0!==t&&t,x=!j||!A||L;return j&&A&&!L&&!D&&_.collectLink(j),x?o.a.createElement("a",Object.assign({href:j},O&&!A&&{target:"_blank",rel:"noopener noreferrer"},m)):o.a.createElement(C,Object.assign({},m,{onMouseEnter:function(){w.current||(window.docusaurus.preload(j),w.current=!0)},innerRef:function(e){var t,n;E&&e&&A&&(t=e,n=function(){window.docusaurus.prefetch(j)},(d=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(d.unobserve(t),d.disconnect(),n())}))}))).observe(t))},to:j||""},l&&{isActive:h,activeClassName:p}))}},104:function(e,t,n){"use strict";n.r(t);var r=n(11);n.d(t,"MemoryRouter",(function(){return r.d})),n.d(t,"Prompt",(function(){return r.f})),n.d(t,"Redirect",(function(){return r.g})),n.d(t,"Route",(function(){return r.h})),n.d(t,"Router",(function(){return r.i})),n.d(t,"StaticRouter",(function(){return r.j})),n.d(t,"Switch",(function(){return r.k})),n.d(t,"generatePath",(function(){return r.l})),n.d(t,"matchPath",(function(){return r.m})),n.d(t,"useHistory",(function(){return r.n})),n.d(t,"useLocation",(function(){return r.o})),n.d(t,"useParams",(function(){return r.p})),n.d(t,"useRouteMatch",(function(){return r.q})),n.d(t,"withRouter",(function(){return r.r})),n.d(t,"BrowserRouter",(function(){return r.a})),n.d(t,"HashRouter",(function(){return r.b})),n.d(t,"Link",(function(){return r.c})),n.d(t,"NavLink",(function(){return r.e}))},105:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return u}));var r=n(22),o=n(110);function i(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var i=void 0===r?{}:r,u=i.forcePrependBaseUrl,s=void 0!==u&&u,c=i.absolute,a=void 0!==c&&c;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(s)return t+n;var f=n.startsWith(t)?n:t+n.replace(/^\//,"");return a?e+f:f}(i,n,e,t)}}}function u(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},110:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))},118:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useThemeConfig=void 0;var o=r(n(22));t.useThemeConfig=function(){return o.default().siteConfig.themeConfig}},119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDocsPluginEnabled=void 0;var r=n(102);t.isDocsPluginEnabled=!!r.useAllDocsData},120:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useDocsPreferredVersionContext=t.DocsPreferredVersionContextProvider=void 0;var s=i(n(0)),c=n(118),a=n(119),f=n(102),d=u(n(146));function l(e){var t=e.pluginIds,n=e.versionPersistence,r=e.allDocsData;var o={};return t.forEach((function(e){o[e]=function(e){var t=d.default.read(e,n);return r[e].versions.some((function(e){return e.name===t}))?{preferredVersionName:t}:(d.default.clear(e,n),{preferredVersionName:null})}(e)})),o}function v(){var e=f.useAllDocsData(),t=c.useThemeConfig().docs.versionPersistence,n=s.useMemo((function(){return Object.keys(e)}),[e]),r=s.useState((function(){return function(e){var t={};return e.forEach((function(e){t[e]={preferredVersionName:null}})),t}(n)})),o=r[0],i=r[1];return s.useEffect((function(){i(l({allDocsData:e,versionPersistence:t,pluginIds:n}))}),[e,t,n]),[o,s.useMemo((function(){return{savePreferredVersion:function(e,n){d.default.save(e,t,n),i((function(t){var r;return Object.assign(Object.assign({},t),((r={})[e]={preferredVersionName:n},r))}))}}}),[i])]}var g=s.createContext(null);function p(e){var t=e.children,n=v();return s.default.createElement(g.Provider,{value:n},t)}t.DocsPreferredVersionContextProvider=function(e){var t=e.children;return a.isDocsPluginEnabled?s.default.createElement(p,null,t):s.default.createElement(s.default.Fragment,null,t)},t.useDocsPreferredVersionContext=function(){var e=s.useContext(g);if(!e)throw new Error("Can't find docs preferred context, maybe you forgot to use the DocsPreferredVersionContextProvider ?");return e}},139:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.docVersionSearchTag=t.DEFAULT_SEARCH_TAG=void 0,t.DEFAULT_SEARCH_TAG="default",t.docVersionSearchTag=function(e,t){return"docs-"+e+"-"+t}},140:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDocVersionSuggestions=t.useActiveDocContext=t.useActiveVersion=t.useLatestVersion=t.useVersions=t.useActivePluginAndVersion=t.useActivePlugin=t.useDocsData=t.useAllDocsData=void 0;var r=n(104),o=n(141),i=n(142);t.useAllDocsData=function(){return o.useAllPluginInstancesData("docusaurus-plugin-content-docs")},t.useDocsData=function(e){return o.usePluginData("docusaurus-plugin-content-docs",e)},t.useActivePlugin=function(e){void 0===e&&(e={});var n=t.useAllDocsData(),o=r.useLocation().pathname;return i.getActivePlugin(n,o,e)},t.useActivePluginAndVersion=function(e){void 0===e&&(e={});var n=t.useActivePlugin(e),o=r.useLocation().pathname;if(n)return{activePlugin:n,activeVersion:i.getActiveVersion(n.pluginData,o)}},t.useVersions=function(e){return t.useDocsData(e).versions},t.useLatestVersion=function(e){var n=t.useDocsData(e);return i.getLatestVersion(n)},t.useActiveVersion=function(e){var n=t.useDocsData(e),o=r.useLocation().pathname;return i.getActiveVersion(n,o)},t.useActiveDocContext=function(e){var n=t.useDocsData(e),o=r.useLocation().pathname;return i.getActiveDocContext(n,o)},t.useDocVersionSuggestions=function(e){var n=t.useDocsData(e),o=r.useLocation().pathname;return i.getDocVersionSuggestions(n,o)}},141:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return o})),n.d(t,"useAllPluginInstancesData",(function(){return i})),n.d(t,"usePluginData",(function(){return u}));var r=n(22);function o(){var e=Object(r.default)().globalData;if(!e)throw new Error("Docusaurus global data not found");return e}function i(e){var t=o()[e];if(!t)throw new Error("Docusaurus plugin global data not found for pluginName="+e);return t}function u(e,t){void 0===t&&(t="default");var n=i(e)[t];if(!n)throw new Error("Docusaurus plugin global data not found for pluginName="+e+" and pluginId="+t);return n}},142:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDocVersionSuggestions=t.getActiveDocContext=t.getActiveVersion=t.getLatestVersion=t.getActivePlugin=void 0;var r=n(104);t.getActivePlugin=function(e,t,n){void 0===n&&(n={});var o=Object.entries(e).find((function(e){e[0];var n=e[1];return!!r.matchPath(t,{path:n.path,exact:!1,strict:!1})})),i=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!i&&n.failfast)throw new Error("Can't find active docs plugin for pathname="+t+", while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: "+Object.values(e).map((function(e){return e.path})).join(", "));return i},t.getLatestVersion=function(e){return e.versions.find((function(e){return e.isLast}))},t.getActiveVersion=function(e,n){var o=t.getLatestVersion(e);return[].concat(e.versions.filter((function(e){return e!==o})),[o]).find((function(e){return!!r.matchPath(n,{path:e.path,exact:!1,strict:!1})}))},t.getActiveDocContext=function(e,n){var o,i,u=t.getActiveVersion(e,n),s=null==u?void 0:u.docs.find((function(e){return!!r.matchPath(n,{path:e.path,exact:!0,strict:!1})}));return{activeVersion:u,activeDoc:s,alternateDocVersions:s?(o=s.id,i={},e.versions.forEach((function(e){e.docs.forEach((function(t){t.id===o&&(i[e.name]=t)}))})),i):{}}},t.getDocVersionSuggestions=function(e,n){var r=t.getLatestVersion(e),o=t.getActiveDocContext(e,n),i=o.activeVersion!==r;return{latestDocSuggestion:i?null==o?void 0:o.alternateDocVersions[r.name]:void 0,latestVersionSuggestion:i?r:void 0}}},143:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isSamePath=void 0,t.isSamePath=function(e,t){var n=function(e){return!e||(null==e?void 0:e.endsWith("/"))?e:e+"/"};return n(e)===n(t)}},144:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.useTitleFormatter=void 0;var o=r(n(22));t.useTitleFormatter=function(e){var t=o.default().siteConfig,n=void 0===t?{}:t,r=n.title,i=n.titleDelimiter,u=void 0===i?"|":i;return e&&e.trim().length?e.trim()+" "+u+" "+r:r}},145:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDocsPreferredVersionByPluginId=t.useDocsPreferredVersion=void 0;var r=n(0),o=n(120),i=n(102),u=n(147);t.useDocsPreferredVersion=function(e){void 0===e&&(e=u.DEFAULT_PLUGIN_ID);var t=i.useDocsData(e),n=o.useDocsPreferredVersionContext(),s=n[0],c=n[1],a=s[e].preferredVersionName;return{preferredVersion:a?t.versions.find((function(e){return e.name===a})):null,savePreferredVersionName:r.useCallback((function(t){c.savePreferredVersion(e,t)}),[c])}},t.useDocsPreferredVersionByPluginId=function(){var e=i.useAllDocsData(),t=o.useDocsPreferredVersionContext()[0],n=Object.keys(e),r={};return n.forEach((function(n){r[n]=function(n){var r=e[n],o=t[n].preferredVersionName;return o?r.versions.find((function(e){return e.name===o})):null}(n)})),r}},146:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return"docs-preferred-version-"+e},o={save:function(e,t,n){"none"===t||window.localStorage.setItem(r(e),n)},read:function(e,t){return"none"===t?null:window.localStorage.getItem(r(e))},clear:function(e,t){"none"===t||window.localStorage.removeItem(r(e))}};t.default=o},147:function(e,t,n){"use strict";n.r(t),n.d(t,"DEFAULT_PLUGIN_ID",(function(){return r}));var r="default"}}]);