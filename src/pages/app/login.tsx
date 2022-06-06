import LoginPage from 'components/domain/app/account/Login'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
  return <AppLayout>
    <LoginPage {...props} />
  </AppLayout>
})

export async function getStaticProps(context: any) {
  const intl = await getMessages(context.locale)

  return {
    props: {
      messages: intl,
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: DEFAULT_APP_PAGE
    }
  }
}