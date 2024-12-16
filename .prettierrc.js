'use strict'

module.exports = {
  overrides: [
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
        printWidth: 120,
        semi: false,
        arrowParens: 'avoid',
        quoteProps: 'consistent',
      },
    },
  ],
}
