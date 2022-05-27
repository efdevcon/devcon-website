import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

// family = Roboto
// family = Space + Mono

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Space+Mono&display=swap"
            rel="stylesheet"
          />

          {process.env.NODE_ENV === 'production' && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `var _paq = window._paq = window._paq || [];
                                _paq.push(['trackPageView']);
                                _paq.push(['enableLinkTracking']);
                                (function() {
                                var u="https://matomo.ethereum.org/";
                                _paq.push(['setTrackerUrl', u+'matomo.php']);
                                _paq.push(['setSiteId', '8']);
                                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                                })();`,
              }}
            />
          )}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
