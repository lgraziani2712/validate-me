process.env.VUE_CLI_MODERN_BUILD = true;

module.exports = {
  title: 'Validate-me',
  description: 'Blazing fast validation library',
  themeConfig: {
    repo: 'lgraziani2712/validate-me',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    lastUpdated: 'Last updated',
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'API', link: '/api/core/validateme.html' },
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
