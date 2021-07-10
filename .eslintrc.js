module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: [
            './coding-challenge/tsconfig.json',
        ]
    },
    plugins: ['prefer-arrow'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        eqeqeq: 2,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': [1, { allowSingleExtends: true }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-implicit-any-catch': 2,
        '@typescript-eslint/no-redeclare': 0,
        '@typescript-eslint/consistent-type-imports': 'error',
        'no-restricted-imports': [
            'error',
            {
                paths: [],
                patterns: [
                    {
                        group: ['antd/*', '!antd/dist'],
                        message: 'Please use antd folder'
                    }
                ]
            }
        ],
        'prefer-arrow/prefer-arrow-functions': 1,
        'arrow-body-style': [1, 'as-needed'],
        'prettier/prettier': 1
    }
}