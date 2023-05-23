{
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    rules: {
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      quotes: ["error", "double", { avoidEscape: true }],
      "prefer-destructuring": ["error", { object: false, array: false }],
    },
};