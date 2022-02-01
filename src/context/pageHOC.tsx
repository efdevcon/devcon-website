import React from 'react'
import { ToNavigationData, ToNotification, ToPage } from 'context/query-mapper'
import { PageContext } from './page-context'

type pageProps = {
  data: any
  pageContext: any
  location: any
}

export const pageHOC =
  (PageTemplate: React.ComponentType<pageProps>, mapDataToContext?: (props: pageProps) => { [key: string]: any }) =>
    (props: pageProps) => {
      // const notFound = props.data?.files?.nodes[0]?.childImageSharp?.fluid?.src?.endsWith('404.png') ?? false
      // const pageType = notFound ? '404' : props.location?.pathname?.startsWith('/archive') ? 'archive' : 'default'
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        console.log('HOSTNAME', hostname)
     }
      console.log('PROPS', props.location)
      const context = {
        data: props.data,
        location: 'http://localhost:3000/',
        pageContext: props.pageContext,
        navigation: {
          top: [],
          site: [],
          footer: {
            bottom: [],
            highlights: [],
            left: [],
            right: [],
          },
        },
        notification: {
          title: 'Test notification',
          url: 'www.google.com',
          label: 'Notif Label',
          labelType: 'type',
        },
        ...(mapDataToContext && mapDataToContext(props)),
        current: {
          title: 'Page title',
          description: 'description',
          body: 'source.html',
          template: 'content',
          tags: [],
          lang: 'en',
          id: 'page',
          slug: 'en',
        }
      }

      return (
        <PageContext.Provider value={context}>
          <PageTemplate {...props} />
        </PageContext.Provider>
      )
    }
