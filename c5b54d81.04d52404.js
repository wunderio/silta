(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{105:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=a.a.createContext({}),u=function(e){var n=a.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=u(e.components);return a.a.createElement(c.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},d=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(t),d=r,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return t?a.a.createElement(m,s(s({ref:n},c),{},{components:t})):a.a.createElement(m,s({ref:n},c))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=d;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=t[c];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},91:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return u}));var r=t(3),a=t(7),o=(t(0),t(105)),i={},s={unversionedId:"vendor-gcs",id:"vendor-gcs",isDocsHomePage:!1,title:"vendor-gcs",description:"Google Cloud compatibility",source:"@site/docs/vendor-gcs.md",slug:"/vendor-gcs",permalink:"/silta/docs/vendor-gcs",editUrl:"https://github.com/wunderio/silta/tree/master/docs/vendor-gcs.md",version:"current"},l=[{value:"Cluster requirements",id:"cluster-requirements",children:[]},{value:"Deployment specifics",id:"deployment-specifics",children:[]},{value:"Google Cloud features",id:"google-cloud-features",children:[{value:"VPC native cluster",id:"vpc-native-cluster",children:[]},{value:"GKE Ingress for HTTP(S) Load Balancing",id:"gke-ingress-for-https-load-balancing",children:[]},{value:"Cloud Armor",id:"cloud-armor",children:[]},{value:"Filestore",id:"filestore",children:[]},{value:"ingress-nginx load balancer on GKE private cluster",id:"ingress-nginx-load-balancer-on-gke-private-cluster",children:[]}]}],c={toc:l};function u(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"google-cloud-compatibility"},"Google Cloud compatibility"),Object(o.b)("p",null,"Silta is fully GKE compatible since it's primarily used on it."),Object(o.b)("h2",{id:"cluster-requirements"},"Cluster requirements"),Object(o.b)("p",null,"Requirements are listed on ",Object(o.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/tree/master/silta-cluster#requirements"},"silta-cluster chart page"),", those are common for all silta-cluster installations. "),Object(o.b)("h2",{id:"deployment-specifics"},"Deployment specifics"),Object(o.b)("p",null,"There is no extra configuration required for basic deployments. The only change would be ",Object(o.b)("inlineCode",{parentName:"p"},"cluster.type")," but it's normally overridden in CI pipeline."),Object(o.b)("p",null,"Drupal, frontend and simple charts:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"cluster:\n  type: gke\n")),Object(o.b)("h2",{id:"google-cloud-features"},"Google Cloud features"),Object(o.b)("h3",{id:"vpc-native-cluster"},"VPC native cluster"),Object(o.b)("p",null,"GKE clusters are ",Object(o.b)("a",{parentName:"p",href:"https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips"},"VPC native")," the default now, but for compatibility reasons silta deployments are set to route-based mode by default now. This is normally overridden in CI, according to cluster."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"cluster:\n  type: gke\n  vpcNative: true\n")),Object(o.b)("h3",{id:"gke-ingress-for-https-load-balancing"},"GKE Ingress for HTTP(S) Load Balancing"),Object(o.b)("p",null,"Projects can define ",Object(o.b)("inlineCode",{parentName:"p"},"exposeDomain")," hosts and use ",Object(o.b)("a",{parentName:"p",href:"https://cloud.google.com/kubernetes-engine/docs/concepts/ingress"},"GKE Ingress Class")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"exposeDomains:\n  example-gce-ingress:\n    hostname: example.com\n    # see ingress.gce definition. This can also be a custom ingress too.\n    ingress: gce\n    \ningress:\n  gce:\n    # Request a global static ip from cluster administrator first\n    staticIpAddressName: custom-ip-name\n\nnginx:\n  # Reverse proxy IP's to trust with contents of X-Forwarded-For header \n  realipfrom: \n    # Load Balancer IP (static ip you were given)\n    gce-lb-ip: 1.2.3.4/32\n")),Object(o.b)("h3",{id:"cloud-armor"},"Cloud Armor"),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-features#cloud_armor"},"Cloud Armor")," can only be used with GKE Ingress. Once enabled, You can define security policy (Cloud Armor policy) for Your service's backendConfig."),Object(o.b)("p",null,'Silta uses "silta-ingress" security policy name by default, it can be adjusted.'),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'backendConfig:\n  securityPolicy:\n    name: "silta-ingress"\n')),Object(o.b)("h3",{id:"filestore"},"Filestore"),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"https://cloud.google.com/filestore"},"Filestore")," - add an alternate storageclass with a shared Filestore volume.",Object(o.b)("br",null),"\nPublic and private files can be stored on Google Filestore via NFS mount, providing higher i/o access than default storage. This option is useful for projects with lots of files served.",Object(o.b)("br",null),"\nHave an exported share named ",Object(o.b)("inlineCode",{parentName:"p"},"/main_share"),".",Object(o.b)("br",null)),Object(o.b)("p",null,"Example configuration for ",Object(o.b)("strong",{parentName:"p"},"new deployments"),"."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  public-files:\n    enabled: true\n    storage: 1G\n    mountPath: /app/web/sites/default/files\n    storageClassName: nfs-shared\n  private-files:\n    enabled: true\n    storage: 1G\n    mountPath: /app/private\n    storageClassName: nfs-shared\n")),Object(o.b)("p",null,"Add ",Object(o.b)("inlineCode",{parentName:"p"},"USER")," directive to ",Object(o.b)("inlineCode",{parentName:"p"},"silta/php.Dockerfile")," right after the COPY line so files are created with correct permissions and can be modified via shell (i.e. ",Object(o.b)("inlineCode",{parentName:"p"},"drush cr"),")."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"USER www-data\n")),Object(o.b)("p",null,"Dockerfile example of a project"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},"FROM wunderio/silta-php-fpm:8.2-fpm-v1\nCOPY --chown=www-data:www-data . /app\nUSER www-data\n")),Object(o.b)("p",null,"Full example on using the provisioned storageclass in ",Object(o.b)("strong",{parentName:"p"},"new and existing")," projects ",Object(o.b)("a",{parentName:"p",href:"/silta/docs/gcp_filestore_migration"},"here")),Object(o.b)("h3",{id:"ingress-nginx-load-balancer-on-gke-private-cluster"},"ingress-nginx load balancer on GKE private cluster"),Object(o.b)("p",null,"When using GKE private cluster, ",Object(o.b)("a",{parentName:"p",href:"https://github.com/kubernetes/ingress-nginx"},"ingress-nginx")," requires an additional firewall rule that allows control plane connection to nodes on port 8443.\nExample and solution is borrowed from ",Object(o.b)("a",{parentName:"p",href:"https://github.com/kubernetes/ingress-nginx/issues/5401"},"https://github.com/kubernetes/ingress-nginx/issues/5401")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"# Control pane range (normally 172.16.0.0/28)\n# gcloud container clusters describe [CLUSTER_NAME] --region europe-north1 --format json | jq -r '.privateClusterConfig.masterIpv4CidrBlock'\nCONTROL_PLANE_RANGE=172.16.0.0/28\n\n# Get cluster tag\nNETWORK_TAGS=$(gcloud compute instances describe \\\n    $(kubectl get nodes -o jsonpath='{.items[0].metadata.name}') \\\n    --format=\"value(tags.items[0])\")\n\n# Print firewall rule command\necho gcloud compute firewall-rules create silta-nginx-lb-ingress \\\n    --action ALLOW \\\n    --direction INGRESS \\\n    --source-ranges ${CONTROL_PLANE_RANGE} \\\n    --rules tcp:8443 \\\n    --target-tags ${NETWORK_TAGS}\n\n")),Object(o.b)("p",null,"Review and execute command printed above."))}u.isMDXComponent=!0}}]);