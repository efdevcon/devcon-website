import { AppLayout } from 'components/domain/app/Layout'
import { Speakers } from 'components/domain/app/speakers'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetEventDays, GetSpeakers, GetTracks } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Speakers {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await getGlobalData(context.locale)),
      page: DEFAULT_APP_PAGE,
      speakers: await GetSpeakers(),
      tracks: await GetTracks(),
      eventDays: await GetEventDays(),
    },
  }
}
