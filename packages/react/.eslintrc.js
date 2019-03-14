module.exports = {
  extends: ['plugin:react/recommended'],
  plugins: ['react'],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'filenames/match-exported': 2,
  },
};
