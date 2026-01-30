import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import next from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Ignore les trucs générés
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "**/*.d.ts",
    ],
  },

  // Base JS
  js.configs.recommended,

  // TypeScript (recommandé)
  ...tseslint.configs.recommended,

  // Règles Next (plugin)
  {
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,

      // Rend le lint vivable pendant la refonte
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Contexte TS/JS + globals
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Scripts Node / configs (CJS, config files): on permet require()
  {
    files: ["**/*.cjs", "**/*.config.{js,cjs,mjs}", "tailwind.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
