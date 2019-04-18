/**
 * @type {jest.GlobalConfig}
 */
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    './packages/**/*.{js,jsx}',
    // FIXME: Remove this filter after adding tests to it
    '!./packages/apollo-error-parser/*.{js,jsx}',
    '!**/.eslintrc.js',
    '!./packages/core/(dictionaries|rules)/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  coverageDirectory: './coverage',
  cacheDirectory: './.jest-cache',
  testPathIgnorePatterns: ['/node_modules/', './scripts'],
};
