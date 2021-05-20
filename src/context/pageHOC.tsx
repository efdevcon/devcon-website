import React from 'react'
import { ToNavigationData, ToNotification } from 'src/context/query-mapper'
import { PageContext } from './page-context'

type pageProps = {
  data: any
  location: any
}

export const pageHOC = (
  PageTemplate: React.ComponentType<pageProps>,
  mapDataToContext?: (props: pageProps) => { [key: string]: any }
) => (props: pageProps) => {
  const context = {
    location: props.location,
    navigation: ToNavigationData(props.data.navigationData.nodes),
    notification: ToNotification(props.data.latestNewsItem.nodes[0]),
    ...(mapDataToContext && mapDataToContext(props)),
  }

  return (
    <PageContext.Provider value={context}>
      <PageTemplate {...props} />
    </PageContext.Provider>
  )
}
