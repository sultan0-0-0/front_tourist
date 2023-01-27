// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'arrow-parens': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
    'no-undef': 0,
    'no-useless-escape': 0,
  },
};
