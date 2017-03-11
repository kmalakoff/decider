module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
    'jsx-a11y',
    'import'
  ],
  'rules': {
    // http://eslint.org/docs/rules/consistent-return
    'consistent-return': 'off',

    // http://eslint.org/docs/rules/max-len
    'max-len': ['error', 120, 2],

    // http://eslint.org/docs/rules/no-console
    'no-console': 'off',

    // http://eslint.org/docs/rules/global-require
    'global-require': 'off',
    'import/no-dynamic-require': 'off',

    // http://eslint.org/docs/rules/no-bitwise
    'no-bitwise': 'off',

    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': 'off',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
    'import/no-unresolved': [0, { commonjs: true }],

    // http://eslint.org/docs/rules/func-names
    'func-names': 'off',
  }
};
