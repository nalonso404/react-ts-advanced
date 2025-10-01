import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import parser from '@typescript-eslint/parser'

const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL('.', import.meta.url)),
})

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'dist/**',
      '.yarn/**',
      'node_modules/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'plugin:@typescript-eslint/recommended'),
  {
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'accessor-pairs': 'error',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 'first',
          CallExpression: { arguments: 'first' },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
        },
      ],
      'no-console': 'off',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': ['off', { ignoreTranspilerName: true }],
    },
  },
]

export default eslintConfig