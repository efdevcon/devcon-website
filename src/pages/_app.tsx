import type { AppProps } from 'next/app'
import { NextIntlProvider } from 'next-intl'

function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  )
}

export default App
