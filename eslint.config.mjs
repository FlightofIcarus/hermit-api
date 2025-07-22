import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: { parser: tseslint.parsers.TypeScript },
    plugins: { tseslint: tseslint.plugin }
  },
  { files: ["**/*.ts"], 
    languageOptions: { sourceType: "module" }, 
    rules: {
      "tseslint/no-unused-vars": "error",
      "tseslint/no-unsafe-assignment": "error",
      "tseslint/no-unsafe-member-access": "error",
      "tseslint/no-unsafe-return": "error", 
      "tseslint/no-unsafe-call": "error",
      "tseslint/no-unsafe-argument": "error",
      "tseslint/no-unsafe-enum-comparison": "error",
      "tseslint/no-unsafe-enum-member": "error",
      "tseslint/no-unsafe-type-assertion": "error",
      "tseslint/no-unsafe-template-expression": "error",
      "tseslint/no-unsafe-optional-chaining": "error", } },
]);
