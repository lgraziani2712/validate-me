module.exports = {
  extends: ['@dimax-ar/dimax/vue', 'plugin:react/recommended'],
  settings: {
    react: {
      createClass: 'createReactClass',
      version: '16',
    },
  },
  rules: {
    'filenames/match-exported': 0,
    'prettier/prettier': 0,
  },
};
