module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    es6: true
  },
  extends: [
    'standard',
    'standard-react',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
      jsx: true,
      legacyDecorators: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'babel',
    'react',
    'promise'
  ],
  rules: {
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']
      }
    ],
    '@typescript-eslint/no-var-requires': 0,
    'react/jsx-indent': [0, 2],
    semi: 0,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 0,
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'import/no-named-default': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  overrides: [{
    files: ['**/*.ts', '**/*.tsx'],
    env: {
      browser: true,
      commonjs: true,
      es2020: true,
      es6: true
    },
    extends: [
      'standard',
      'standard-react',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    // globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        legacyDecorators: true
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json'
    },
    plugins: [
      'babel',
      'react',
      'promise',
      '@typescript-eslint'
    ],
    rules: {
      indent: [
        'error',
        2,
        {
          ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']
        }
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 0,
      'react/jsx-indent': [0, 2],
      semi: 0,
      'react/no-unused-prop-types': 0,
      'react/prop-types': 0,
      'generator-star-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      'comma-dangle': ['error', 'only-multiline'],
      'import/no-named-default': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 0
    },

  }]
};
