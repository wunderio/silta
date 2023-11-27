(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{104:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return d}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),u=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=u(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},m=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(t),m=r,d=p["".concat(i,".").concat(m)]||p[m]||b[m]||o;return t?a.a.createElement(d,c(c({ref:n},s),{},{components:t})):a.a.createElement(d,c({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=m;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<o;s++)i[s]=t[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},68:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return u}));var r=t(3),a=t(7),o=(t(0),t(104)),i={},c={unversionedId:"vendor-uks",id:"vendor-uks",isDocsHomePage:!1,title:"vendor-uks",description:"Upcloud compatibility",source:"@site/docs/vendor-uks.md",slug:"/vendor-uks",permalink:"/silta/docs/vendor-uks",editUrl:"https://github.com/wunderio/silta/tree/master/docs/vendor-uks.md",version:"current"},l=[{value:"Cluster requirements",id:"cluster-requirements",children:[]},{value:"Missing functionality",id:"missing-functionality",children:[]},{value:"Deployment specifics",id:"deployment-specifics",children:[]}],s={toc:l};function u(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"upcloud-compatibility"},"Upcloud compatibility"),Object(o.b)("p",null,"Silta is mostly Upcloud compatible, there are some requirements for environments deployed to UKS cluster."),Object(o.b)("h2",{id:"cluster-requirements"},"Cluster requirements"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Load balancers are configured using json in annotations, see ",Object(o.b)("a",{parentName:"p",href:"https://github.com/UpCloudLtd/uks-instructions/blob/main/ccm/README.md#customising-load-balancer-configuration"},"https://github.com/UpCloudLtd/uks-instructions/blob/main/ccm/README.md#customising-load-balancer-configuration")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"By default, they are in HTTP mode, which needs to be changed to TCP"),Object(o.b)("li",{parentName:"ul"},"Example configuration for ingress-nginx:",Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'ingress-nginx:\n  controller:\n  admissionWebhooks:\n    enabled: true\n  autoscaling:\n    enabled: false\n  config:\n    use-forwarded-headers: "true"\n    compute-full-forwarded-for: "true"\n    use-proxy-protocol: "true"\n    real-ip-header: "proxy_protocol"\n  service:\n    type: LoadBalancer\n  annotations:\n  service.beta.kubernetes.io/upcloud-load-balancer-config: |\n    {\n      "name": "silta-ingress-1",\n      "plan": "production-small",\n      "frontends": [\n        {\n          "name": "https",\n          "mode": "tcp",\n          "port": 443\n        },\n        {\n          "name": "http",\n          "mode": "tcp",\n          "port": 80\n        }\n      ],\n      "backends": [\n      {\n        "name": "https",\n        "properties": { "outbound_proxy_protocol": "v1"}\n      },\n      {\n        "name": "http",\n        "properties": { "outbound_proxy_protocol": "v1"}\n      }\n    ]\n    }\n')),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"To enable whitelist for VPN, SSH service has to annotated with:")),Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre"},'gitAuth:\n  annotations:\n        service.beta.kubernetes.io/upcloud-load-balancer-config: |\n          {\n            "name": "silta-ssh-1",\n            "plan": "development",\n            "frontends": [\n              {\n                "name": "ssh",\n                "mode": "tcp",\n                "port": 22,\n                "rules": [\n                  {\n                    "name": "allow-vpn",\n                    "priority": 100,\n                    "matchers": [\n                      {\n                          "type": "src_ip",\n                          "inverse": true,\n                          "match_src_ip": {\n                              "value": "<VPN_IP_HERE>"\n                          }\n                      }\n                    ],\n                    "actions": [\n                      {\n                        "type": "tcp_reject",\n                        "action_tcp_reject": {}\n                      }\n                    ]\n                  }\n                ]\n              }\n            ]\n          }\n'))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Creating an object storage and configuring rclone is quite well explained at ",Object(o.b)("a",{parentName:"p",href:"https://upcloud.com/resources/tutorials/migrate-object-storage-rclone"},"https://upcloud.com/resources/tutorials/migrate-object-storage-rclone")),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"Example configuration:",Object(o.b)("pre",{parentName:"li"},Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"rclone:\n  params:\n    remote: s3\n    remotePath: silta-shared\n    s3-access-key-id: <ACCESS_KEY>\n    s3-acl: private\n    s3-endpoint: xyz.fi-hel2.upcloudobjects.com\n    s3-provider: Other\n    s3-region: fi-hel2\n    s3-secret-access-key: <SECRET_KEY>\n"))))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"If using managed database, create a new database user and set authentication method to ",Object(o.b)("inlineCode",{parentName:"p"},"mysql_native_password"))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"Smallest size for UKS storage volumes is 1Gi - set this for mariadb, elasticsearch pods"))),Object(o.b)("p",null,"There are few more requirements listed on ",Object(o.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/tree/master/silta-cluster#requirements"},"silta-cluster chart page"),", those are common for all silta-cluster installations "),Object(o.b)("h2",{id:"missing-functionality"},"Missing functionality"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Managed Docker image registry"),Object(o.b)("li",{parentName:"ul"},"Managed NFS storage")),Object(o.b)("h2",{id:"deployment-specifics"},"Deployment specifics"),Object(o.b)("p",null,"There is no extra configuration required for basic deployments. The only change would be ",Object(o.b)("inlineCode",{parentName:"p"},"cluster.type")," but it's normally overridden in CI pipeline."))}u.isMDXComponent=!0}}]);