module.exports = {
  extends: ['@dimax-ar/dimax'],
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  rules: {
    'filenames/match-exported': 0,
    eqeqeq: [1, 'always', { null: 'ignore' }],
  },
};
