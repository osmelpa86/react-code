import * as js from "@eslint/js"
import * as globals from "globals"
import * as tseslint from "typescript-eslint"
import * as pluginReact from "eslint-plugin-react"
import json from "@eslint/json"
import css from "@eslint/css"
import {defineConfig} from "eslint/config"

export default defineConfig([
    // --- Configuración base JS ---
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.eslint.json", // 👈 usa este proyecto
                tsconfigRootDir: __dirname,
            }
        },
        extends: [js.configs.recommended]
    },

    // --- Configuración TypeScript ---
    ...tseslint.configs.recommended,

    // --- Configuración React ---
    {
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {version: "detect"}
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        }
    },

    // --- Configuración JSON ---
    json.configs.recommended,

    // --- Configuración CSS ---
    css.configs.recommended
])