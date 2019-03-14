module.exports = {
  extends: ['@dimax-ar/dimax/vue', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  settings: {
    react: {
      createClass: 'createReactClass',
      version: '16',
    },
  },
  rules: {
    'filenames/match-exported': 0,
    'prettier/prettier': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
  },
};
