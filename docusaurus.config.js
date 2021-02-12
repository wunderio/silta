module.exports = {
  title: 'Silta',
  tagline: 'Silta is a combination of open source tools and cloud services to provide a simple but flexible, self-service infrastructure for development teams, as well as a stable production hosting.',
  url: 'https://silta.wunder.io',
  baseUrl: '/silta/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wunderio', // Usually your GitHub org/user name.
  projectName: 'silta', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'), // would have used shadesOfPurple.js, but the .yaml highlightinng is buggy.
      darkTheme: require('prism-react-renderer/themes/dracula'),
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
          label: 'Internal 🔒',
          position: 'left', // or 'right'
          items: [
            {
              label: 'FAQ',
              href: 'https://intra.wunder.io/info/silta/silta-faq',
            },
            {
              label: 'Dashboard',
              href: 'https://dashboard.silta.wdr.io/',
            },
            {
              label: 'Slack',
              href: 'https://wunder.slack.com/archives/C8UN6AG9W'
            }
          ],
        },
        {
          href: 'https://github.com/wunderio/silta',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      apiKey: 'dea4d95a5d7d736429669fdf0169961e', // this can and will be public
      indexName: 'silta',
      contextualSearch: false,
      searchParameters: {'facetFilters': ["content"]},
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
