process.env.VUE_CLI_MODERN_BUILD = true;

module.exports = {
  title: 'Validate-me',
  description: 'Extensible & blazing fast validation library',
  head: [
    ['link', { rel: 'icon', href: '/icon.svg' }],
    ['link', { rel: 'icon', href: '/icon.png' }],
    ['meta', { property: 'og:title', content: 'Validate-me' }],
    ['meta', { property: 'og:site_name', content: 'Validate-me' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Extensible & Blazing fast validation library',
      },
    ],
    ['meta', { property: 'og:image', content: '/icon.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    repo: 'lgraziani2712/validate-me',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last updated',
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'API', link: '/api/core/rules.html' },
      {
        text: 'Changelog',
        link:
          'https://github.com/lgraziani2712/validate-me/blob/master/CHANGELOG.md',
      },
      {
        text: 'Roadmap',
        link: 'https://validate-me.canny.io/feature-requests',
      },
    ],
    sidebar: {
      '/guides/': ['', 'react.html', 'vue.html', 'rules.html'],
      '/api/': [
        {
          title: 'Core API',
          collapsable: false,
          children: ['core/rules.html', 'core/dictionary.html'],
        },
        {
          title: 'Vanilla API',
          collapsable: false,
          children: ['vanilla/form.html', 'vanilla/field.html'],
        },
        {
          title: 'Vue API',
          collapsable: false,
          children: [
            'vue/plugin.html',
            'vue/directive.html',
            'vue/mixins.html',
          ],
        },
        {
          title: 'React API',
          collapsable: false,
          children: ['react/useForm.html', 'react/useField.html'],
        },
      ],
    },
  },
  configureWebpack(config, isServer) {
    if (process.env.NODE_ENV !== 'production' || isServer) {
      return;
    }

    config.optimization.splitChunks.cacheGroups.vuepress = {
      test: /vuepress/,
      chunks: 'initial',
      name: 'vuepress',
      priority: 20,
      enforce: true,
    };

    config.optimization.splitChunks.cacheGroups['vue-router'] = {
      test: /vue-router/,
      chunks: 'initial',
      name: 'vue-router',
      priority: 20,
      enforce: true,
    };

    config.optimization.splitChunks.cacheGroups.vue = {
      test: /vue/,
      chunks: 'initial',
      name: 'vue',
      priority: 10,
      enforce: true,
    };

    config.optimization.splitChunks.cacheGroups.vendor = {
      test: /node_modules/,
      chunks: 'initial',
      name: 'vendor',
      priority: 0,
      enforce: true,
    };
  },
};
