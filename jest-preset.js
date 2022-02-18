module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/test/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/lambda/**/*.test.{js,jsx,ts,tsx}',
  ],
  // Always use js and json first.  This order is used when parsing node_modules
  // and will crash when trying to compile deps.
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx', 'node', 'mjs'],
};
