module.exports = {
  title: 'Silta',
  tagline: 'Silta is a combination of open source tools and cloud services to provide a simple but flexible, self-service infrastructure for development teams, as well as a stable production hosting.',
  url: 'https://silta.wunder.io',
  baseUrl: '/silta/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Sofia+Sans+Condensed:wght@600;700&family=Sofia+Sans+Extra+Condensed:wght@800&family=Sofia+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap',
      type: 'text/css',
    },
  ],
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
  ],
  organizationName: 'wunderio', // Usually your GitHub org/user name.
  projectName: 'silta', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
    navbar: {
      // title: 'Silta',
      logo: {
        alt: 'Wunder Silta',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/anatomy-of-silta',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/wunderio/silta',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: 'P70R8SQEIU',
      apiKey: 'c2c3d7a21744f0d6f60ee42b2f7c5801',
      indexName: 'silta',
      contextualSearch: false,
      searchParameters: { 'facetFilters': ["content"] },
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Social presence' ,
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/wunder.io',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/company/wunder.io',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Wunder_io',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/wunder.io/',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCsBoaJt5sX12IFBu1giXZJg',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://wunder.io/articles/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/wunderio/silta',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wunder`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/wunderio/silta/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
