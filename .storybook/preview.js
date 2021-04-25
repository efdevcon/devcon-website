import { addDecorator, configure } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import '!style-loader!css-loader!sass-loader!src/assets/css/index.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import { setIntlConfig, withIntl } from 'storybook-addon-intl'
// import { GatsbyIntlProvider } from './intl'
// import { addLocaleData } from 'gatsby-plugin-intl'
// import enLocaleData from 'react-intl/locale-data/en'
// import esLocaleData from 'react-intl/locale-data/es'

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/'

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// Set supported locales
// export const locales = ['en', 'es']

// // Import translation messages
// export const messages = locales.reduce((acc, locale) => {
//   return {
//     ...acc,
//     [locale]: require(`../src/content/i18n/${locale}.json`),
//   }
// }, {})

// const getMessages = locale => messages[locale]

// // Set `storybook-addon-intl` configuration (handles `react-intl`)
// setIntlConfig({
//   locales,
//   defaultLocale: 'en',
//   getMessages,
// })

// // Load the locale data for all your supported locales
// addLocaleData(enLocaleData)
// addLocaleData(esLocaleData)

// // Adds gatsby-plugin-intl IntlContextProvider
// addDecorator(GatsbyIntlProvider)

// // Adds storybook-addon-intl
// addDecorator(withIntl)

// configure(() => require('./main.js').stories, module)
