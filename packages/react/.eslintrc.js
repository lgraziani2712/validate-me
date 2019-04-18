module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16',
    },
  },
  rules: {
    'filenames/match-exported': 2,
  },
};
