const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  root: true,
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: [".eslintrc.js"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "no-console": "off",
    "require-await": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/naming-convention": "off",
    "unicorn/filename-case": "off",
    "no-nested-ternary": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "react/function-component-definition": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "tsdoc/syntax": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["object"],
      },
    ],
    "import/no-extraneous-dependencies": [
      "warn",
      {
        devDependencies: false,
        includeInternal: false,
        includeTypes: false,
        packageDir: [".", "../.."],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
};
