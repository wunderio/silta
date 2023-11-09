(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{103:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return f}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=i.a.createContext({}),p=function(e){var t=i.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},b=function(e){var t=p(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=p(n),d=r,f=b["".concat(c,".").concat(d)]||b[d]||u[d]||a;return n?i.a.createElement(f,o(o({ref:t},l),{},{components:n})):i.a.createElement(f,o({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,c[1]=o;for(var l=2;l<a;l++)c[l]=n[l];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},165:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/files/pfx-ready-ecdc2d70ae99d08a03d552fa94262a35.sh"},93:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(3),i=n(7),a=(n(0),n(103)),c={},o={unversionedId:"ssl_certificates",id:"ssl_certificates",isDocsHomePage:!1,title:"ssl_certificates",description:"Basics",source:"@site/docs/ssl_certificates.md",slug:"/ssl_certificates",permalink:"/silta/docs/ssl_certificates",editUrl:"https://github.com/wunderio/silta/tree/master/docs/ssl_certificates.md",version:"current"},s=[{value:"Basics",id:"basics",children:[]},{value:"PFX to PEM",id:"pfx-to-pem",children:[]},{value:"SSL certificate verification",id:"ssl-certificate-verification",children:[]},{value:"Tips",id:"tips",children:[]}],l={toc:s};function p(e){var t=e.components,c=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,c,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"basics"},"Basics"),Object(a.b)("p",null,"Full chain consists of 3 parts.",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"End-Entity (Server) Certificate:")," This is your server's SSL/TLS certificate, also known as the end-entity certificate. It is the certificate that identifies your server's domain.",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"Intermediate Certificates:")," These are the certificates of intermediate Certificate Authorities (CAs) that form the chain between your end-entity certificate and the root CA certificate. Intermediate certificates help build the trust chain between your certificate and a root CA. They are necessary because root CA certificates are typically not distributed widely due to security reasons.",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"Root CA Certificate:")," This is the certificate of the root Certificate Authority. This certificate is the ultimate trust anchor in the chain. The root CA certificate establishes trust in the entire chain.  "),Object(a.b)("p",null,"You can have multiple Intermediate Certificates in chain.     "),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"exposeDomains:\n  example-customcert:\n    hostname: ssl-custom.example.com\n    ssl:\n      enabled: true\n      issuer: custom\n      key: |\n        -----BEGIN RSA PRIVATE KEY-----\n        <KEY>\n        -----END RSA PRIVATE KEY-----\n      crt: |\n        -----BEGIN CERTIFICATE-----\n        < DOMAIN CERTIFICATE >\n        -----END CERTIFICATE-----\n        -----BEGIN CERTIFICATE-----\n        < INTERMEDIATE CERTIFICATE 1 >\n        -----END CERTIFICATE-----\n        -----BEGIN CERTIFICATE-----\n        < INTERMEDIATE CERTIFICATE 2 >\n        -----END CERTIFICATE-----\n        -----BEGIN CERTIFICATE-----\n        < INTERMEDIATE CERTIFICATE N >\n        -----END CERTIFICATE-----        \n        -----BEGIN CERTIFICATE-----\n        < ROOT CA CERTIFICATE >\n        -----END CERTIFICATE-----\n")),Object(a.b)("h2",{id:"pfx-to-pem"},"PFX to PEM"),Object(a.b)("p",null,"Extraction (legacy flag is required if older version of PKCS#12 was used to create PFX file):",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl pkcs12 -legacy -in custom_cert.pfx -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > private.key"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl pkcs12 -legacy -in custom_cert.pfx -cacerts -nokeys -chain | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > ca.crt"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl pkcs12 -legacy -in custom_cert.pfx -clcerts -nokeys | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > domain.crt"),"  "),Object(a.b)("p",null,"Creating full chain:\n",Object(a.b)("inlineCode",{parentName:"p"},"cat domain.crt ca.crt > fullchain.crt")),Object(a.b)("p",null,"You can also use ",Object(a.b)("a",{target:"_blank",href:n(165).default},"this script"),"."),Object(a.b)("h2",{id:"ssl-certificate-verification"},"SSL certificate verification"),Object(a.b)("p",null,"You can verify full chain part:",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl verify -CAfile fullchain.crt domain.crt"),Object(a.b)("br",{parentName:"p"}),"\n","And then matching with private key",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl x509 -noout -modulus -in fullchain.crt | openssl md5"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl rsa -noout -modulus -in private.key | openssl md5"),Object(a.b)("br",{parentName:"p"}),"\n","Output values should match."),Object(a.b)("p",null,"Testing certificate on live server can be done only on different cluster/environment.\n",Object(a.b)("em",{parentName:"p"},"!NB Do not try to test it on Production cluster/environment where production hostname is in use already."),"  "),Object(a.b)("h4",{id:"steps-to-test-ssl-certificate-on-development-cluster"},"Steps to test SSL certificate on Development cluster"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Make a new Git branch"),Object(a.b)("li",{parentName:"ul"},"Add SSL certificates domain to Exposed domains in ",Object(a.b)("inlineCode",{parentName:"li"},"stila.yml")),Object(a.b)("li",{parentName:"ul"},"Create secrets file, put relevant structure and encrypt it with cluster's secret key"),Object(a.b)("li",{parentName:"ul"},"Modify ",Object(a.b)("inlineCode",{parentName:"li"},".circleci/config.yml")," to decrypt secret and use it in ",Object(a.b)("inlineCode",{parentName:"li"},"silta_config")," part"),Object(a.b)("li",{parentName:"ul"},"Push branch to trigger deployment  "),Object(a.b)("li",{parentName:"ul"},"Verify SSL certificate with ",Object(a.b)("inlineCode",{parentName:"li"},"openssl s_client -connect [IP]:443 -servername [hostname]"),". Expected result",Object(a.b)("br",{parentName:"li"}),Object(a.b)("inlineCode",{parentName:"li"},"SSL handshake has read 7583 bytes and written 408 bytes Verification: OK"),". If something is wrong You'll get",Object(a.b)("br",{parentName:"li"}),Object(a.b)("inlineCode",{parentName:"li"},"Verification error: unable to verify the first certificate")," and/or ",Object(a.b)("inlineCode",{parentName:"li"},"Verify return code: 21 (unable to verify the first certificate)")," "),Object(a.b)("li",{parentName:"ul"},"You can also change ",Object(a.b)("inlineCode",{parentName:"li"},"/etc/hosts")," to resolve hostname and verify SSL certificate via browser"),Object(a.b)("li",{parentName:"ul"},"When everything looks good delete the testing branch and proceed with production release. ")),Object(a.b)("h2",{id:"tips"},"Tips"),Object(a.b)("p",null,"PEM strings can be encoded in different formats. Both cases are valid",Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"-----BEGIN RSA PRIVATE KEY-----"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"-----BEGIN PRIVATE KEY-----"),Object(a.b)("br",{parentName:"p"}),"\n",Object(a.b)("inlineCode",{parentName:"p"},"openssl")," will take care of correct decoding. ",Object(a.b)("a",{parentName:"p",href:"https://git.openssl.org/?p=openssl.git;a=blob;f=include/openssl/pem.h;hb=HEAD#l35"},"List of all supported formats"),". "))}p.isMDXComponent=!0}}]);