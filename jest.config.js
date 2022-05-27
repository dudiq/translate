module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testMatch: ['**/*.test.ts'],
}
