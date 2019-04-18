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
      { blankLine: 'any', prev: 'cjs-import', next: '*' },
    ],
  },
};
