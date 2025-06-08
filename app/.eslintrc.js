module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: true, // garante que ele use seu babel.config.js
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
};