import { Info } from 'components/domain/app/info'
import { AppLayout } from 'components/domain/app/Layout'
import { Session } from 'components/domain/app/session'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetSessions, GetSpeakers } from 'services/programming'
import { DEFAULT_APP_PAGE, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { getMessages } from 'utils/intl'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Session {...props} />
    </AppLayout>
  )
})

export async function getStaticPaths() {
  const sessions = await GetSessions()
  const paths = sessions.map(i => {
    return { params: { id: i.id }, locale: 'en' }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const session = (await GetSessions()).find(i => i.id === context.params.id)

  if (!session) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  return {
    props: {
      ...(await getGlobalData(context.locale)),
      page: DEFAULT_APP_PAGE,
      session,
    },
  }
}
