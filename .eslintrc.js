module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true,
    'es6': true
  },
  globals: {
    'numeral': true,
    '_': true
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'ember-suave/no-const-outside-module-scope': 'off',
    'operator-linebreak': ['error', 'after']
  }
};
