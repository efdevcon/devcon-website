import React from 'react'
import { ToNavigationData, ToNotification, ToPage } from 'src/context/query-mapper'
import { PageContext } from './page-context'

type pageProps = {
  data: any
  pageContext: any
  location: any
}

export const pageHOC =
  (PageTemplate: React.ComponentType<pageProps>, mapDataToContext?: (props: pageProps) => { [key: string]: any }) =>
  (props: pageProps) => {
    let pageType = 'default'

    if (props.location?.pathname?.startsWith('/archive')) pageType = 'archive'
    if (props.location?.pathname?.startsWith('/app')) pageType = 'app'

    const context = {
      data: props.data,
      location: props.location,
      pageContext: props.pageContext,
      navigation: ToNavigationData(props.data.navigationData.nodes, props.data.distinctVideoTags, pageType),
      notification: ToNotification(props.data.notification.nodes[0]),
      ...(mapDataToContext && mapDataToContext(props)),
      current: props.data.page ? ToPage(props.data.page) : undefined,
    }

    return (
      <PageContext.Provider value={context}>
        <PageTemplate {...props} />
      </PageContext.Provider>
    )
  }
