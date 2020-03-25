module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // not sure if these are needed:
  "globals": {
    "ts-jest": {
      "babelConfig": true,
      "tsConfig": "jest.tsconfig.json"
    }
  },
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
};
