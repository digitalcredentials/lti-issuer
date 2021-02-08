module.exports = {
  extends: [
    "google",
    "plugin:react/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },
  ignorePatterns: ["dist"],
  plugins: ["react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: "module",
  },
  root: true,
  rules: {
    "no-undef": "error",
  },
};
