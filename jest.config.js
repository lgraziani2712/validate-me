/**
 * @type {jest.GlobalConfig}
 */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './packages/**/*.{js,jsx}',
    '!**/.eslintrc.js',
    '!./packages/core/(dictionaries|rules)/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  coverageDirectory: './coverage',
  cacheDirectory: './.jest-cache',
  testPathIgnorePatterns: ['/node_modules/', './scripts'],
};
