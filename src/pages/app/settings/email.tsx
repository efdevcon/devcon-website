import { PrivatePage } from 'components/domain/app/account/PrivatePage'
import EmailSettings from 'components/domain/app/account/settings/Email'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetBlogs } from 'services/blogs'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
  return <AppLayout>
    <PrivatePage>
      <EmailSettings {...props} />
    </PrivatePage>
  </AppLayout>
})

export async function getStaticProps(context: any) {
  const intl = await getMessages(context.locale)

  return {
    props: {
      messages: intl,
      blogs: await GetBlogs(),
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: DEFAULT_APP_PAGE
    }
  }
}