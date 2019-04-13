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
    // deprecated. Use padding-line-between-statements
    'newline-after-var': 0,
    // deprecated. Use padding-line-between-statements
    'newline-before-return': 0,
    'padding-line-between-statements': [
      1,
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'never',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
  },
};
