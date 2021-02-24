module.exports = {
    root: true,
    ignorePatterns: ['projects/**/*'],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json', 'e2e/tsconfig.json'],
                createDefaultProgram: true,
            },
            plugins: ['eslint-plugin-header', 'deprecation'],
            extends: [
                'plugin:@angular-eslint/ng-cli-compat',
                'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
                'plugin:@angular-eslint/template/process-inline-templates',
            ],
            rules: {
                'header/header': [
                    'error',
                    'block',
                    [
                        '!',
                        {
                            pattern: '[ *]* Copyright \\d{4}(-\\d{4})? VMware, Inc.',
                            template: ' * Copyright 2021 VMware, Inc.',
                        },
                        ' * SPDX-License-Identifier: BSD-2-Clause',
                        ' ',
                    ],
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'vcd',
                        style: 'kebab-case',
                    },
                ],
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'vcd',
                        style: 'camelCase',
                    },
                ],
                '@typescript-eslint/adjacent-overload-signatures': 'off',
                '@typescript-eslint/explicit-member-accessibility': [
                    'off',
                    {
                        accessibility: 'explicit',
                    },
                ],
                '@typescript-eslint/no-inferrable-types': [
                    'off',
                    {
                        ignoreParameters: true,
                    },
                ],
                '@typescript-eslint/prefer-function-type': 'off',
                'arrow-parens': ['off', 'always'],
                'import/order': 'error',
                'max-len': [
                    'off',
                    {
                        code: 140,
                    },
                ],
                'no-bitwise': 'off',
                'no-multiple-empty-lines': 'error',
                'no-new-func': 'error',
                'no-octal': 'error',
                'no-octal-escape': 'error',
                'no-underscore-dangle': 'off',
                'arrow-body-style': 'off',
                '@typescript-eslint/naming-convention': 'off',
                'jsdoc/newline-after-description': 'off',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: ['static-field', 'instance-field', 'static-method', 'instance-method'],
                    },
                ],
                'prefer-arrow/prefer-arrow-functions': 'off',
                '@typescript-eslint/ban-types': 'off',
                'space-before-function-paren': 'off',
                'id-blacklist': 'off',
                '@angular-eslint/no-input-rename': 'off',
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
                'no-delete-var': 'error',
                'no-restricted-syntax': ['error', 'document.domain', 'exec'],
                'deprecation/deprecation': 'warn',
            },
        },
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {},
        },
    ],
};
