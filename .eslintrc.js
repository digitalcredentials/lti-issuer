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
  plugins: ["react", "react-hooks"],
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
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
