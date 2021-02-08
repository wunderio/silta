(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{113:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),b=p(n),u=a,m=b["".concat(l,".").concat(u)]||b[u]||d[u]||i;return n?r.a.createElement(m,o(o({ref:t},s),{},{components:n})):r.a.createElement(m,o({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},84:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),i=(n(0),n(113)),l={id:"silta-examples",title:"Silta examples"},o={unversionedId:"silta-examples",id:"silta-examples",isDocsHomePage:!1,title:"Silta examples",description:"silta.yml configuration examples",source:"@site/docs/silta-examples.md",slug:"/silta-examples",permalink:"/silta/docs/silta-examples",editUrl:"https://github.com/wunderio/silta/docs/silta-examples.md",version:"current",sidebar:"someSidebar",previous:{title:"Request workflow",permalink:"/silta/docs/request-workflow"},next:{title:"CircleCI build issues",permalink:"/silta/docs/troubleshooting"}},c=[{value:"silta.yml configuration examples",id:"siltayml-configuration-examples",children:[]},{value:"Allocate more storage for your database.",id:"allocate-more-storage-for-your-database",children:[]},{value:"Mount Drupal public files to a different location",id:"mount-drupal-public-files-to-a-different-location",children:[]},{value:"Enabling private files for drupal",id:"enabling-private-files-for-drupal",children:[]},{value:"Change how often the standard Drupal cron is executed",id:"change-how-often-the-standard-drupal-cron-is-executed",children:[]},{value:"Run a custom cron job",id:"run-a-custom-cron-job",children:[]},{value:"Add aditional environment variables",id:"add-aditional-environment-variables",children:[]},{value:"Changing basic auth username and password",id:"changing-basic-auth-username-and-password",children:[]},{value:"Enable elasticsearch",id:"enable-elasticsearch",children:[]},{value:"Enable memcached",id:"enable-memcached",children:[]},{value:"Using varnish",id:"using-varnish",children:[]},{value:"Sanitize a table that contains sensitive information",id:"sanitize-a-table-that-contains-sensitive-information",children:[]},{value:"Skip taking reference data dumps on each deployment",id:"skip-taking-reference-data-dumps-on-each-deployment",children:[]},{value:"Sending e-mail",id:"sending-e-mail",children:[]},{value:"Exposed domains and SSL certificates",id:"exposed-domains-and-ssl-certificates",children:[]},{value:"Adding redirects",id:"adding-redirects",children:[]},{value:"Adding custom include files for nginx",id:"adding-custom-include-files-for-nginx",children:[]}],s={toc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"siltayml-configuration-examples"},"silta.yml configuration examples"),Object(i.b)("p",null,"The default values are documented here: "),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Drupal chart: ",Object(i.b)("a",{parentName:"li",href:"https://github.com/wunderio/charts/blob/master/drupal/values.yaml"},"https://github.com/wunderio/charts/blob/master/drupal/values.yaml")),Object(i.b)("li",{parentName:"ul"},"Frontend chart: ",Object(i.b)("a",{parentName:"li",href:"https://github.com/wunderio/charts/blob/master/frontend/values.yaml"},"https://github.com/wunderio/charts/blob/master/frontend/values.yaml")),Object(i.b)("li",{parentName:"ul"},"Simple chart: ",Object(i.b)("a",{parentName:"li",href:"https://github.com/wunderio/charts/blob/master/simple/values.yaml"},"https://github.com/wunderio/charts/blob/master/simple/values.yaml"))),Object(i.b)("p",null,"Below is a list of examples for common needs.\nAll examples are meant to be used in the ",Object(i.b)("inlineCode",{parentName:"p"},"silta.yml")," file of your project. Most of examples work with both drupal chart and frontend chart, unless name is explicitly mentioned above the code snippet. Double-check with default value files for each chart - ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/blob/master/drupal/values.yaml"},"drupal")," and ",Object(i.b)("a",{parentName:"p",href:"https://github.com/wunderio/charts/blob/master/frontend/values.yaml"},"frontend"),"."),Object(i.b)("p",null,"Also note that increasing resources will result in increased costs, so use sensible values."),Object(i.b)("h2",{id:"allocate-more-storage-for-your-database"},"Allocate more storage for your database."),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mariadb:\n  master:\n    persistence:\n      size: 2G\n")),Object(i.b)("p",null,"Note that storage can only be increased, not decreased."),Object(i.b)("h2",{id:"mount-drupal-public-files-to-a-different-location"},"Mount Drupal public files to a different location"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  public-files:\n    mountPath: `/app/web/sites/my-other-location/files`\n")),Object(i.b)("h2",{id:"enabling-private-files-for-drupal"},"Enabling private files for drupal"),Object(i.b)("p",null,"There is a pre-built mount template for drupal private file storage in silta (check values.yaml), you just have to enable it"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"mounts:\n  private-files:\n    enabled: true\n")),Object(i.b)("p",null,"Enabling this will mount shared storage to ",Object(i.b)("inlineCode",{parentName:"p"},"/app/private")," and set ",Object(i.b)("inlineCode",{parentName:"p"},"$settings['file_private_path']")," accordingly. See chart values for override parameters."),Object(i.b)("h2",{id:"change-how-often-the-standard-drupal-cron-is-executed"},"Change how often the standard Drupal cron is executed"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"php:\n  cron:\n    drupal:\n      # Run every 5 minutes\n      schedule: '*/5 * * * *'\n")),Object(i.b)("h2",{id:"run-a-custom-cron-job"},"Run a custom cron job"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"php:\n  cron:\n    my-custom-cron-job:\n      # Run a custom drush command at midnight\n      schedule: '0 0 * * *'\n      command: 'drush my-custom-command'\n")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"services:\n  myservice:\n    cron:\n      my-custom-cron-job:\n        # Run a custom command at midnight\n        schedule: '0 0 * * *'\n        command: 'my-custom-command'\n")),Object(i.b)("h2",{id:"add-aditional-environment-variables"},"Add aditional environment variables"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"php:\n  env:\n    MY_VARIABLE_NAME: 'theValueOfMyVariable'\n")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"services:\n  myservice:\n    env:\n      MY_VARIABLE_NAME: 'theValueOfMyVariable'\n")),Object(i.b)("h2",{id:"changing-basic-auth-username-and-password"},"Changing basic auth username and password"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart and Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"nginx:\n  basicauth:\n    credentials:\n      username: hello\n      password: My$ecretP4ssw0rd\n")),Object(i.b)("h2",{id:"enable-elasticsearch"},"Enable elasticsearch"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart and Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"elasticsearch:\n  enabled: true\n")),Object(i.b)("h2",{id:"enable-memcached"},"Enable memcached"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"memcached:\n  enabled: true\n")),Object(i.b)("h2",{id:"using-varnish"},"Using varnish"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"varnish:\n  enabled: true\n")),Object(i.b)("p",null,"If extra cookies are needed, they can be defined in a vcl_extra_cookies variable:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},'varnish:\n  vcl_extra_cookies: |\n    if (req.http.Cookie ~ "extra_cookie_name") {\n      return (pass);\n    }\n\n')),Object(i.b)("p",null,"When varnish is enabled in silta config, drupal configuration needs to be adjusted, so purge can find the varnish server."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Using ",Object(i.b)("a",{parentName:"strong",href:"https://www.drupal.org/project/varnish"},"varnish")," module:")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"You should consider using purge module instead"),"\nNo adjustments needed"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Using ",Object(i.b)("a",{parentName:"strong",href:"https://www.drupal.org/project/varnish_purge"},"varnish_purge")," module:")),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Add varnish purger to purge settings."),Object(i.b)("li",{parentName:"ol"},"Find purger configuration name. You can see it by hovering over the configuration link (i.e. ",Object(i.b)("inlineCode",{parentName:"li"},"1b619ba479"),"). This will be Your ",Object(i.b)("inlineCode",{parentName:"li"},"<PURGER_ID>"),"."),Object(i.b)("li",{parentName:"ol"},"Put this snippet into your ",Object(i.b)("inlineCode",{parentName:"li"},"settings.php")," file:")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"if (getenv('SILTA_CLUSTER') && getenv('VARNISH_ADMIN_HOST')) {\n  $config['varnish_purger.settings.<PURGER_ID>']['hostname'] = trim(getenv('VARNISH_ADMIN_HOST'));\n  $config['varnish_purger.settings.<PURGER_ID>']['port'] = '80';\n}\n")),Object(i.b)("p",null,"Make sure to replace ",Object(i.b)("inlineCode",{parentName:"p"},"<PURGER_ID>")," with an actual id of purger configuration!"),Object(i.b)("h2",{id:"sanitize-a-table-that-contains-sensitive-information"},"Sanitize a table that contains sensitive information"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"gdprDump:\n  my_table_name:\n    my_field_name:\n      formatter: name\n")),Object(i.b)("p",null,"Here ",Object(i.b)("inlineCode",{parentName:"p"},"name")," is the formatter type. See ",Object(i.b)("a",{parentName:"p",href:"https://github.com/machbarmacher/gdpr-dump/#using-gdpr-replacements"},"https://github.com/machbarmacher/gdpr-dump/#using-gdpr-replacements")," for additonal formatter types."),Object(i.b)("h2",{id:"skip-taking-reference-data-dumps-on-each-deployment"},"Skip taking reference data dumps on each deployment"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"referenceData:\n  updateAfterDeployment: false\n")),Object(i.b)("p",null,"For some sites with a lot of files, taking a reference data dump after each deployment can cause the builds to time out. Disabling ",Object(i.b)("inlineCode",{parentName:"p"},"updateAfterDeployment")," means new environments will be created with reference data from the previous nightly dump."),Object(i.b)("h2",{id:"sending-e-mail"},"Sending e-mail"),Object(i.b)("p",null,"Note: There is no e-mail handling for frontend chart currently. You must implement the smtp workflow via application. "),Object(i.b)("p",null,"If you just want to test email, you can use mailhog:"),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"mailhog:\n  enabled: true\n")),Object(i.b)("p",null,"For emails to be actually sent out of the cluster, You can use any external smtp server. Here's an example for sparkpost."),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},'smtp:\n  enabled: true\n  address: smtp.sparkpostmail.com:587 # or smtp.eu.sparkpost.com:587\n  tls: "YES"\n  # StartTLS is required when you use smtp.office365.com:587\n  # starttls: "YES"\n  username: "SMTP_Injection"\n  # Encrypt this password. See: docs/encrypting_sensitive_configuration.md\n  password: "MYAPIKEY"\n')),Object(i.b)("p",null,"Note: To get the sparkpost API key, you have to ",Object(i.b)("a",{parentName:"p",href:"https://www.sparkpost.com/docs/getting-started/setting-up-domains/"},"validate your domain")," first."),Object(i.b)("p",null,"If the ",Object(i.b)("inlineCode",{parentName:"p"},"smtp")," is configured and enabled, but it does not appear to send anything, make sure ",Object(i.b)("inlineCode",{parentName:"p"},"mailhog")," is not enabled."),Object(i.b)("h2",{id:"exposed-domains-and-ssl-certificates"},"Exposed domains and SSL certificates"),Object(i.b)("p",null,"Various ",Object(i.b)("inlineCode",{parentName:"p"},"exposeDomains")," examples for SSL certificate issuers. Same structure can be reused for release ",Object(i.b)("inlineCode",{parentName:"p"},"ssl")," parameter too. "),Object(i.b)("p",null,"Note: You can also use ",Object(i.b)("inlineCode",{parentName:"p"},"letsencrypt-staging")," issuer to avoid hitting ",Object(i.b)("inlineCode",{parentName:"p"},"letsencrypt")," ",Object(i.b)("a",{parentName:"p",href:"https://letsencrypt.org/docs/rate-limits/"},"rate limits"),"."),Object(i.b)("p",null,"Note 2: For custom certificates it's advised to add CA root certificate to ",Object(i.b)("inlineCode",{parentName:"p"},"exposeDomains[].ssl.crt")," value. Having it under ",Object(i.b)("inlineCode",{parentName:"p"},"exposeDomains[].ssl.ca")," is not enough."),Object(i.b)("p",null,"Note 3: Deploy ",Object(i.b)("inlineCode",{parentName:"p"},"exposeDomains")," entries only when DNS entries are changed or are soon to be changed. Otherwise, Letsencrypt validation might eventually get stuck due to retries.  "),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart and Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"exposeDomains:\n\n  example-le:\n    hostname: ssl-le.example.com\n    ssl:\n      enabled: true\n      issuer: letsencrypt\n\n  example-customcert:\n    hostname: ssl-custom.example.com\n    ssl:\n      enabled: true\n      issuer: custom\n      # Encrypt key and certificate. See: docs/encrypting_sensitive_configuration.md\n      ca: |\n        -----BEGIN PRIVATE KEY-----\n        MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1AnQnJXBJWw3A\n        (..)\n        N/a90beSt0vJ6Cy+jMCVQ0s=\n        -----END PRIVATE KEY-----\n      key: |\n        -----BEGIN PRIVATE KEY-----\n        MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1AnQnJXBJWw3A\n        (..)\n        N/a90beSt0vJ6Cy+jMCVQ0s=\n        -----END PRIVATE KEY-----\n      crt: |\n        -----BEGIN CERTIFICATE-----\n        MIIDPzCCAiegAwIBAgIUe0NEJnh4ffNBsdKzT5/PTlFRoQYwDQYJKoZIhvcNAQEL\n        (..)\n        jyj9OmdjZTJAwwqDdcs6TaRXxQ==\n        -----END CERTIFICATE-----\n")),Object(i.b)("p",null,"You don't need a custom static ip (via gce ingress) normally, but if Your project requires, here's how - "),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'exposeDomains:\n  example-gce-ingress:\n    hostname: gce-ingress.example.com\n    # see ingress.gce definition. This can also be a custom ingress too.\n    ingress: gce\n    ssl:\n      enabled: true\n      issuer: letsencrypt\n\ningress:\n  gce:\n    # Request a global static ip from OPS team first\n    staticIpAddressName: custom-ip-name\n\n# Whitelist reverse proxy ip\'s to accept X-Forwarded-For header \nnginx:\n  serverExtraConfig: |\n    # Traefik IP for pre-generated hostname\n    set_real_ip_from 10.0.0.0/8;\n    # Load Balancer IP\n    set_real_ip_from 1.2.3.4/32;\n    # Google load balancer IP\'s\n    set_real_ip_from 130.211.0.0/22;\n    set_real_ip_from 35.191.0.0/16;\n    real_ip_recursive on;\n\n# Depending on the cluster type, You might need to enable this. \n# A safe default is "false" (works in both cases), but "VPC Native" \n# clusters work more correcly with cluster.vpcNative set to "true".\ncluster: \n  vpcNative: true\n')),Object(i.b)("h2",{id:"adding-redirects"},"Adding redirects"),Object(i.b)("p",null,"Redirects can be relative to current domain or contain full domain for more targeted redirects when multiple external domains (",Object(i.b)("inlineCode",{parentName:"p"},"exposeDomains"),") are attached to deployment, and you only need this redirect for a specific URL. Redirect URL's can have regular expressions."),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Drupal chart and Frontend chart"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"nginx:\n  redirects:\n    - from: /test1 \n      to: /\n    - from: http://exact-matching.example.com/test2\n      to: /test2-redirect\n    - from: '~://partial-matching.example.com/test3$' \n      to: /test3-redirect\n    - from: ~/test4$ \n      to: https://another-domain.example.com/test4-redirect\n")),Object(i.b)("h2",{id:"adding-custom-include-files-for-nginx"},"Adding custom include files for nginx"),Object(i.b)("p",null,"Drupal chart builds nginx container using web/ folder as build context. This prevents files being included from outside the web folder and it's not a good idea to put config files under it.\nTo be able to add include files the build context needs to be changed from ",Object(i.b)("inlineCode",{parentName:"p"},"web/")," into ",Object(i.b)("inlineCode",{parentName:"p"},".")," by passing ",Object(i.b)("inlineCode",{parentName:"p"},'nginx_build_context: "."')," to ",Object(i.b)("inlineCode",{parentName:"p"},"drupal-docker-build")," in ",Object(i.b)("inlineCode",{parentName:"p"},".circleci/config.yml"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'jobs:\n  - silta/drupal-docker-build:\n      nginx_build_context: "."\n')),Object(i.b)("p",null,"Due root containing Drupal / shell container compatible .dockerignore file and for frontend there is a separate one inside the web/ folder this doesn't work anymore. Since version 19.03 Docker supports separate .dockerignore files for each Dockerfile. This requires Docker build to be made with BuildKit enabled. To enable BuildKit just pass the ",Object(i.b)("inlineCode",{parentName:"p"},"DOCKER_BUILDKIT=1")," to the build environment as an environment variable:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"environment:\n  DOCKER_BUILDKIT: 1\n")),Object(i.b)("p",null,"The ignore file itself needs to be named the same as the Dockerfile with .dockerignore appended to the end and need to reside at the same place as the Dockerfile:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"cp web/.gitignore silta/nginx.Dockerfile.dockerignore\n")),Object(i.b)("p",null,"Note: our validation checks if the .dockerignore is present under web/ so you can either leave it there or just add an empty file in it's place.\nTo make the image to build correctly in this new context you need to update the COPY command in the nginx.Dockerfile to copy ",Object(i.b)("inlineCode",{parentName:"p"},"web")," instead of ",Object(i.b)("inlineCode",{parentName:"p"},".")," and also add COPY commands to any custom config files you want to be able to include:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"COPY silta/nginx.serverextra.conf /etc/nginx\n\nCOPY web /app/web\n")),Object(i.b)("p",null,"Now you can include the config file in silta.yml like this:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"nginx:\n  serverExtraConfig: |\n    include nginx.serverextra.conf;\n")),Object(i.b)("p",null,"or if you ",Object(i.b)("inlineCode",{parentName:"p"},"COPY")," the file under ",Object(i.b)("inlineCode",{parentName:"p"},"/etc/nginx/conf.d")," they will be included automatically without the need to add them to silta.yml configs."))}p.isMDXComponent=!0}}]);