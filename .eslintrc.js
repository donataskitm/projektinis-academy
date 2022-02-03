module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "amd": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { extensions: ['.js', '.jsx'] }],
    "no-plusplus": 0,
    "import/extensions": 0,
    "linebreak-style": 0,
    "import/no-unresolved": 0,
    "react/react-in-jsx-scope": 0,
    "max-lines": ["error", { max: 200 }],
    semi: ["error", "always"],
    indent: ["error", 2],
    "react/require-default-props": "error",
  }
};
