module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-key': 0,
    'no-undef': 0,
    'react/react-in-jsx-scope': 0,
    'no-unused-vars': 0,
    'no-case-declarations': 0,
    'no-console': 'error',
    'prefer-const': 'error',
    'consistent-return': 0,
    'no-param-reassign': 0,
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': 0,
    'react-hooks/exhaustive-deps': 0,
    'import/no-unresolved': 0,
    indent: 'off',
    'prefer-template': 'off',
    'no-shadow': 0,
  },
};
