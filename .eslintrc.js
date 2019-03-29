module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true
    },
    project: './tsconfig.json'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['prettier', '@typescript-eslint', 'jest'],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off',
    "vue/attribute-hyphenation": ["error", "never"]
  }
}
