(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{105:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return f}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=r.a.createContext({}),c=function(e){var t=r.a.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},b=function(e){var t=c(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),b=c(a),d=n,f=b["".concat(o,".").concat(d)]||b[d]||m[d]||i;return a?r.a.createElement(f,l(l({ref:t},p),{},{components:a})):r.a.createElement(f,l({ref:t},p))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:n,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},65:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return o})),a.d(t,"metadata",(function(){return l})),a.d(t,"toc",(function(){return s})),a.d(t,"default",(function(){return c}));var n=a(3),r=a(7),i=(a(0),a(105)),o={},l={unversionedId:"gcp_filestore_migration",id:"gcp_filestore_migration",isDocsHomePage:!1,title:"gcp_filestore_migration",description:"Replace file storage with Google's Filestore volume.",source:"@site/docs/gcp_filestore_migration.md",slug:"/gcp_filestore_migration",permalink:"/silta/docs/gcp_filestore_migration",editUrl:"https://github.com/wunderio/silta/tree/master/docs/gcp_filestore_migration.md",version:"current"},s=[{value:"!! LIMITATIONS, PITFALLS",id:"-limitations-pitfalls",children:[]},{value:"Changing storage for an existing environment:",id:"changing-storage-for-an-existing-environment",children:[]},{value:"Changing storage for a new deployment, project:",id:"changing-storage-for-a-new-deployment-project",children:[]}],p={toc:s};function c(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"replace-file-storage-with-googles-filestore-volume"},"Replace file storage with Google's Filestore volume."),Object(i.b)("p",null,"This example will change storage for Drupal public files.\nRepeat the same steps for other volumes, such as private files."),Object(i.b)("p",null,"This will first add a new mount for the new Google filestore to ",Object(i.b)("inlineCode",{parentName:"p"},"/app/web/sites/default/files-new")," where the files from the existing object storage ",Object(i.b)("inlineCode",{parentName:"p"},"public-files")," mount ",Object(i.b)("inlineCode",{parentName:"p"},"/app/web/sites/default/files")," are copied from and then the new filestore is mounted to the existing ",Object(i.b)("inlineCode",{parentName:"p"},"/app/web/sites/default/files")," mount at the same time when the old ",Object(i.b)("inlineCode",{parentName:"p"},"public-files")," mount is disabled."),Object(i.b)("h3",{id:"-limitations-pitfalls"},"!! LIMITATIONS, PITFALLS"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Do not delete the old public-files section, nor change their names. Kubernetes tracks the volumes by these names."),Object(i.b)("li",{parentName:"ol"},"Do not change storage size after the first deployment. You will end up in an error state: Ignoring the PVC: didn't find a plugin capable of expanding the volume; waiting for an external controller to process this PVC."),Object(i.b)("li",{parentName:"ol"},"The provisioned storage limit is not enforced. The application can expand to use all the available storage regardless of the provisioned size.\nIf you run out of free space on volume, contact cluster administrator for its expansion."),Object(i.b)("li",{parentName:"ol"},"The provisioned storage is not guaranteed. You may allocate more than the NFS share's total size. The share may also not have enough storage space left to actually accommodate the request.")),Object(i.b)("h2",{id:"changing-storage-for-an-existing-environment"},"Changing storage for an existing environment:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Add a new location which uses the new storage. We will extend default values from ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/blob/039f29d9d507813d40a182fa2320adfd6a3db06a/drupal/values.yaml#L355"},"https://github.com/wunderio/charts/blob/039f29d9d507813d40a182fa2320adfd6a3db06a/drupal/values.yaml#L355")),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  public-files-filestore:\n    enabled: true\n    storage: 10G\n    mountPath: /app/web/sites/default/files-new\n    storageClassName: nfs-shared\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Deploy")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Find and exec into the shell deployment to get root access"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-bash"},"kubectl --namespace=<namespace> get deployments | grep shell\nkubectl --namespace=<namespace> exec -it deployment/<shell deployment name> -- sh\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Copy public files from the old location to the new one"),Object(i.b)("p",{parentName:"li"}," 4.1. Simple way, for small amounts of files:"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-bash"},"rsync --info=progress2 -az /app/web/sites/default/files/ /app/web/sites/default/files-new/\n")),Object(i.b)("p",{parentName:"li"}," 4.2. Advanced way, for large amounts of files:"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-bash"},"cd /app/web/sites/default/files\nfind . -maxdepth 2 -mindepth 2 -type d | xargs -P15 -I% rsync --relative --info=progress2 -az % /app/web/sites/default/files-new/ \\\n  && find . -maxdepth 2 -mindepth 2 -type f  | xargs -P15 -I% rsync --relative --info=progress2 -az % /app/web/sites/default/files-new/ \\\n  && find . -maxdepth 1 -mindepth 1 -type f  | xargs -P15 -I% rsync --relative --info=progress2 -az % /app/web/sites/default/files-new/\n\n# Verify file count matches in both directories\nfind /app/web/sites/default/files/ | wc -l \\\n  && find /app/web/sites/default/files-new/ | wc -l\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Set ownership and permissions for the new location"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-bash"},'dir=/app/web/sites/default/files-new\nchown -R www-data:www-data "$dir"\nchmod 770 "$dir"\nfind "$dir" -type d -print0 | xargs -0 --max-args=100 chmod 770\nfind "$dir" -type f -print0 | xargs -0 --max-args=100 chmod 660\n'))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Update the mount path for the new mount, disable the old one"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  public-files-filestore:\n    enabled: true\n    storage: 10G\n    mountPath: /app/web/sites/default/files\n    storageClassName: nfs-shared\n  public-files:\n    enabled: false\n    mountPath: /app/web/sites/default/files-old\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Add the original Drupal file paths as environment variables (ignore the private files path if the project doesn't have private file system enabled)"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"php:\n  env:\n    PRIVATE_FILES_PATH: /app/private\n    PUBLIC_FILES_PATH: /app/web/sites/default/files\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"To run PHP as user ",Object(i.b)("inlineCode",{parentName:"p"},"www-data"),", add this line in your ",Object(i.b)("inlineCode",{parentName:"p"},"silta/php.Dockerfile")," right after the ",Object(i.b)("inlineCode",{parentName:"p"},"COPY")," line"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-dockerfile"},"USER www-data\n")),Object(i.b)("p",{parentName:"li"},"Dockerfile example of a project"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-dockerfile"},"FROM wunderio/silta-php-fpm:8.0-fpm-v1\n\nCOPY --chown=www-data:www-data . /app\n\nUSER www-data\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Deploy")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Check owners of the files directory, it should be www-data"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre",className:"language-bash"},"ls -alh /app/web/sites/default/files\n")),Object(i.b)("p",{parentName:"li"},"If some of the files are owned by root - rerun step 5, but for the files path (not files-new)")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Check that the public files path shows up correctly when running ",Object(i.b)("inlineCode",{parentName:"p"},"drush status"),".\nIf it doesn't, make sure that it has not been overridden in settings.php file."))),Object(i.b)("h2",{id:"changing-storage-for-a-new-deployment-project"},"Changing storage for a new deployment, project:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Redefine the default public and private files volumes.")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  public-files:\n    enabled: true\n    storage: 10G\n    mountPath: /app/web/sites/default/files\n    storageClassName: nfs-shared\n  private-files:\n    enabled: true\n    storage: 1G\n    mountPath: /app/private\n    storageClassName: nfs-shared\n")),Object(i.b)("ol",{start:2},Object(i.b)("li",{parentName:"ol"},"Deploy - this is your first deployment for the project or environment.")))}c.isMDXComponent=!0}}]);