module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { debug: true, modules: false }],
    '@babel/preset-react',
  ];

  let plugins = ['@babel/plugin-syntax-dynamic-import'];

  if (process.env.NODE_ENV === 'production') {
    plugins = plugins.concat([
      ['remove-test-ids', { attributes: ['data-cy'] }],
      'transform-vue-props',
      ['transform-react-remove-prop-types', { removeImport: true }],
    ]);
  }

  return {
    presets,
    plugins,
  };
};
