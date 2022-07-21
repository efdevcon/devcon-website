import { AppLayout } from 'components/domain/app/Layout'
import { SpeakerDetails } from 'components/domain/app/speakers'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetSessionsBySpeaker, GetSpeakers, GetTracks } from 'services/programming'
import { DEFAULT_APP_PAGE, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { getMessages } from 'utils/intl'

export default pageHOC((props: any) => {
  return <AppLayout>
    <SpeakerDetails {...props} />
  </AppLayout>
})

export async function getStaticPaths() {
  const speakers = await GetSpeakers()
  const paths = speakers.map((i) => {
    return { params: { id: i.id }, locale: "en" }
  })

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context: any) {
  const intl = await getMessages(context.locale)
  const speaker = (await GetSpeakers()).find(i => i.id === context.params.id)

  if (!speaker) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  const sessions = await GetSessionsBySpeaker(speaker.id)
  return {
    props: {
      messages: intl,
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: DEFAULT_APP_PAGE,
      speaker,
      sessions,
    }
  }
}