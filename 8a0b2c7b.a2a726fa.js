(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{113:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),s=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},b=function(e){var t=s(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),b=s(r),m=n,d=b["".concat(o,".").concat(m)]||b[m]||u[m]||i;return r?a.a.createElement(d,c(c({ref:t},l),{},{components:r})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},90:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return c})),r.d(t,"toc",(function(){return p})),r.d(t,"default",(function(){return s}));var n=r(3),a=r(7),i=(r(0),r(113)),o={id:"migrating-an-existing-drupal-project",title:"Migrating an existing Drupal project"},c={unversionedId:"migrating-an-existing-drupal-project",id:"migrating-an-existing-drupal-project",isDocsHomePage:!1,title:"Migrating an existing Drupal project",description:"General tips",source:"@site/docs/migrating_existing_project.md",slug:"/migrating-an-existing-drupal-project",permalink:"/silta/docs/migrating-an-existing-drupal-project",editUrl:"https://github.com/wunderio/silta/docs/migrating_existing_project.md",version:"current",sidebar:"someSidebar",previous:{title:"Key components",permalink:"/silta/docs/key-components"},next:{title:"Request workflow",permalink:"/silta/docs/request-workflow"}},p=[{value:"General tips",id:"general-tips",children:[]},{value:"Step by step instructions",id:"step-by-step-instructions",children:[]}],l={toc:p};function s(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"general-tips"},"General tips"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"We automate as much as possible, but many projects have project-specific differences."),Object(i.b)("li",{parentName:"ul"},"When in doubt, ask for advice."),Object(i.b)("li",{parentName:"ul"},"Ask any questions in our #dev-silta slack channel.")),Object(i.b)("h2",{id:"step-by-step-instructions"},"Step by step instructions"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Set up the project on CircleCI:"),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"Make sure that you have admin permissions for the project repository on Github."),Object(i.b)("li",{parentName:"ul"},"Log in with your Github credentials at ",Object(i.b)("a",{parentName:"li",href:"https://circleci.com"},"https://circleci.com")),Object(i.b)("li",{parentName:"ul"},'Choose the right organisation and go to "Add Projects": ',Object(i.b)("a",{parentName:"li",href:"https://circleci.com/add-projects/gh/wunderio"},"https://circleci.com/add-projects/gh/wunderio")),Object(i.b)("li",{parentName:"ul"},'Find your project on the list and click on "set up project" (or "Follow project" if the project is already using CircleCI).'))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Make sure you have a clean, up-to-date checkout of your repository.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Create a new feature branch:"),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre"},"git checkout -b feature/silta\n"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Run the migration script from the project root:",Object(i.b)("br",{parentName:"p"}),"\n","For Drupal 8+  "),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre"},"curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal-migrate.sh | bash\n")),Object(i.b)("p",{parentName:"li"},"For Drupal 7 with composer.json run      "),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre"},"curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal7-migrate.sh | bash\n")),Object(i.b)("p",{parentName:"li"},"Please check ",Object(i.b)("a",{parentName:"p",href:"/silta/docs/troubleshooting"},"troubleshooting")," for other Drupal 7 cases  "),Object(i.b)("p",{parentName:"li"},Object(i.b)("strong",{parentName:"p"},"Important"),Object(i.b)("br",{parentName:"p"}),"\n","Add to silta.yml config  "),Object(i.b)("pre",{parentName:"li"},Object(i.b)("code",{parentName:"pre"},'php:\n  drupalCoreVersion: "7"\n'))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Read through the output of the script and check for any instructions to perform manual steps.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Check modifications made by the script with ",Object(i.b)("inlineCode",{parentName:"p"},"git diff"),". Pay particular attention to code that has been removed, we don't want to lose anything important.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Commit all changes and push them to Github. You should see a build starting automatically on CircleCI: ",Object(i.b)("a",{parentName:"p",href:"https://circleci.com/gh/wunderio"},"https://circleci.com/gh/wunderio"))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"If the build has errors, try to fix them until the build is green."),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"The ",Object(i.b)("inlineCode",{parentName:"li"},"build-deploy")," is the one that matters the most. The ",Object(i.b)("inlineCode",{parentName:"li"},"validation")," job can point out issues with your code would prevent it from running. However, you may decide to ignore phpcs errors for now."),Object(i.b)("li",{parentName:"ul"},"Have a look at our ",Object(i.b)("a",{parentName:"li",href:"/silta/docs/troubleshooting"},"troubleshooting")," section."))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"The last step of the ",Object(i.b)("inlineCode",{parentName:"p"},"build-deploy")," contains information on how to access your newly created Silta environment."),Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},"You should be able to access the site at the given URL with the given basic authentication username and password."),Object(i.b)("li",{parentName:"ul"},"The site is not yet installed, we'll do that in the next step."),Object(i.b)("li",{parentName:"ul"},"You should also be able to access the environment using the provided SSH instructions."))),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Upload a database dump using the command provided in CircleCI output.\nYou might need to log in via SSH and clear the caches, import configuration or run updates if your database dump is not in sync with the current codebase.\nAt this point you should have a somewhat functioning environment accessible.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Create a pull request for your feature branch, have a peer review it, and merge it.\nCircleCI should automatically build the master environment.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Upload the database dump and the files to the master environment.\nThis is the ",Object(i.b)("em",{parentName:"p"},"reference environment")," by default, meaning that new environments\nwill be created with a copy of this content.")),Object(i.b)("li",{parentName:"ol"},Object(i.b)("p",{parentName:"li"},"Congratulations, your project is now up and running! Please share any issues you had or ideas for improvements."))))}s.isMDXComponent=!0}}]);