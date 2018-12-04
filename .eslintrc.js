module.exports = {
  parser: 'babel-eslint',
  globals: {
    _: false,
    __dirname: false,
    document: false,
    console: false,
    module: false
  },
  env: { es6: true, node: true, browser: true },
  parserOptions: {
    //     ecmaVersion: 2017,
    //     sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  plugins: ['react'],
  //   extends: ['eslint:recommended', 'plugin:react/recommended'],
  extends: ['airbnb-base'],
  rules: {
    'no-use-before-define': [2, 'nofunc'],
    'no-console': 0,
    indent: [2, 2],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'react/prop-types': [2],
    'linebreak-style': 0,
    'comma-dangle': [1, 'only-multiline']
  }
};
