const NODE_ENV = process.env.NODE_ENV;

module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      { debug: true, modules: NODE_ENV === 'test' && 'auto' },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        development: NODE_ENV !== 'production',
      },
    ],
  ];

  let plugins = ['@babel/plugin-syntax-dynamic-import'];

  if (NODE_ENV === 'production') {
    plugins = plugins.concat([
      ['remove-test-ids', { attributes: ['data-cy'] }],
      'transform-vue-props',
      ['transform-react-remove-prop-types', { removeImport: true }],
    ]);
  }

  return {
    presets,
    plugins,
    env: {
      test: {
        plugins: ['transform-dynamic-import'],
      },
    },
  };
};
