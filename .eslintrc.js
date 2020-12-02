const prettier = require('./prettier.config.js')
module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:cypress/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      generators: true,
    },
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './']],
        extensions: ['.js'],
      },
    },
  },
  plugins: ['babel', 'react', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': ['error', prettier],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    camelcase: 'off',
    'react/forbid-prop-types': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'jest/no-focused-tests': 'error',
    'react/jsx-props-no-spreading': 'off',
  },
}
