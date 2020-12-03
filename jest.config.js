module.exports = {
  automock: false,
  clearMocks: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}
