module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        spec: true,
        debug: true,
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  return {
    presets,
    plugins,
  };
};
