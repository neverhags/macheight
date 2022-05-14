module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'no-plusplus': 0,
    'no-extend-native': 'off',
  },
  'ignorePatterns': ['node_modules'],
};
