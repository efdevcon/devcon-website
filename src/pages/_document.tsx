import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class AppDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {process.env.NODE_ENV === 'production' && (
                        <script type="text/javascript" dangerouslySetInnerHTML={{
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