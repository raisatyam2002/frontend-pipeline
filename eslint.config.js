// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";

export default defineConfig([
  // 🔹 Core JS Rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
      "react/prop-types": "off", // You use TypeScript
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
]);
