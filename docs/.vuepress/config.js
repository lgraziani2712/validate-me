module.exports = {
  title: 'Validate-me',
  description: 'Blazing fast validation library',
  base: '/validate-me/',
  themeConfig: {
    repo: 'dimax/validate-me',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last updated',
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'API', link: '/api/core/validateme.html' },
      {
        text: 'Changelog',
        link: 'https://github.com/dimax/validate-me/blob/master/CHANGELOG.md',
      },
      {
        text: 'Roadmap',
        link: 'https://validate-me.canny.io/feature-requests',
      },
    ],
    sidebar: {
      '/guides/': ['', 'rules.html'],
      '/api/': [
        {
          title: 'Core API',
          collapsable: false,
          children: [
            'core/validateme-rule.html',
            'core/validateme-rules.html',
            'core/validateme-dictionary.html',
            'core/validateme.html',
            'core/validateme-field.html',
          ],
        },
        {
          title: 'Vue API',
          collapsable: false,
          children: ['vue/plugin.html', 'vue/directive.html', 'vue/mixin.html'],
        },
      ],
    },
  },
};
