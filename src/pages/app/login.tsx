import LoginStyled from 'components/domain/app/account/LoginStyled'
import { AccountContextProvider } from 'context/account-context-provider'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetBlogs } from 'services/blogs'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { TITLE } from 'utils/constants'

export default pageHOC((props: any) => {
  return <AccountContextProvider>
    <LoginStyled {...props} />
  </AccountContextProvider>
})

export async function getStaticProps(context: any) {
  const intl = (await import(`../../../content/i18n/${context.locale}.json`)).default

  return {
    props: {
      messages: intl,
      blogs: await GetBlogs(),
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: {
        title: TITLE,
        description: intl.description,
        template: 'index',
        tags: [],
        lang: context.locale,
        id: 'index',
        slug: 'index'
      }
    }
  }
}