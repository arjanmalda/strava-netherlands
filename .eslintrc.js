// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  ignorePatterns: ['next.config.js', 'postcss.config.js', 'sentry.*.config.js'],
  extends: ['@linkunijmegen/eslint-config-nextjs-typescript'],
  rules: {
    'import/no-default-export': 'off',
    'react/forbid-component-props': [
      1,
      {
        forbid: ['style'],
      },
    ],
  },
};
