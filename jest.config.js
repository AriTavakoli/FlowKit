/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  // testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
