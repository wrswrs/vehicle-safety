module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // allow debugger in development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow alert in development
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'warn',
    // max nest callback 3
    'max-nested-callbacks': ['error', 3],
    // allow modify param property
    'no-param-reassign': ['error', { props: false }],
    'comma-dangle': ['warn', 'always-multiline'], //多行末尾逗号
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase' || 'kebab-case',
      {
        ignores: [],
      },
    ],
    'vue/no-unused-vars': 'warn',
    'vue/html-quotes': 'error',
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/order-in-components': 'warn',
    'vue/this-in-template': 'warn',
    'vue/html-self-closing': 'warn',
    //template 单行不换行,多行换行
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    //属性排序
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ],
    //属性换行
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false, //不允许首行属性
        },
      },
    ],
    // vue html 4个缩进
    'vue/html-indent': [
      'error',
      4,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/v-slot-style': 'warn',
    'vue/valid-v-bind-sync': 'warn',
    'vue/valid-v-slot': 'warn',
    'vue/v-on-function-call': 'warn',
    'vue/no-unsupported-features': [
      'error',
      {
        version: '^2.6.11',
        ignores: [],
      },
    ],
    // 'vue/no-reserved-component-names': 'error',
    'vue/camelcase': 'off',
    'vue/no-empty-pattern': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-deprecated-slot-scope-attribute': 'off',
    'vue/no-deprecated-scope-attribute': 'off',
    'vue/eqeqeq': 'warn',
    'vue/match-component-file-name': 'warn',
    'vue/component-definition-name-casing': 'warn',
    'vue/require-default-prop': 'warn',
  },

  // parserOptions: {
  //   parser: '@typescript-eslint/parser',
  // },

  extends: ['plugin:vue/strongly-recommended', '@vue/typescript'],
}
