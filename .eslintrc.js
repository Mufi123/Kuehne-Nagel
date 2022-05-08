module.exports = {
  "env": {
    "jest": true,
    "browser": true,
    "es2021": true,
    "node": true,
    "cypress/globals": true
  },

  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:cypress/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "cypress"
  ],
  "globals": {
    "testEnvironment": true,
    "logger": true,
    "should": true,
    "expect": true,
    "libs": true,
  },
  "rules": {
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
    "no-undef": "error",
    "no-console": "error",
    "no-unreachable": "error",
    "indent": [
      1,
      2
    ],
    "no-unused-vars": "error",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn"
  }
}
