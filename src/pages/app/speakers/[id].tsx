import { AppLayout } from 'components/domain/app/Layout'
import { SpeakerDetails } from 'components/domain/app/speakers'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetSessionsBySpeaker, GetSpeaker, GetSpeakers } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { SEO } from 'components/domain/seo'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <>
        <SEO title={props.speaker.name} description={props.speaker.description} />
        <SpeakerDetails {...props} />
      </>
    </AppLayout>
  )
})

export async function getStaticPaths() {
  const speakers = await GetSpeakers()
  const paths = speakers.map(i => {
    return { params: { id: i.id }, locale: 'en' }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const speaker = await GetSpeaker(context.params.id)

  if (!speaker) {
    return {
      props: null,
      notFound: true,
    }
  }

  const sessions = await GetSessionsBySpeaker(speaker.id)
  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      speaker,
      sessions,
    },
  }
}
