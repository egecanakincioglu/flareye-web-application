import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    { files: ["**/*.ts"] },
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
            globals: globals.browser,
        },
        ignores: ["node_modules"],
        rules: {
            "@typescript-eslint/no-extraneous-class": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "@typescript-eslint/no-invalid-void-type": "off",
        },
    },
);
