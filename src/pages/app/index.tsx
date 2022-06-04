import { Home } from 'components/domain/app/home'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { DEFAULT_APP_PAGE } from 'utils/constants'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Home {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  return {
    props: {
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: DEFAULT_APP_PAGE,
    },
  }
}
