import { AppLayout } from 'components/domain/app/Layout'
import { Schedule } from 'components/domain/app/schedule'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetSessions, GetSpeakers, GetRooms, GetTracks, GetEvent } from 'services/programming'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Schedule {...props} />
    </AppLayout>
  )
})

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      event: await GetEvent(),
      sessions: await GetSessions(),
      tracks: await GetTracks(),
      speakers: await GetSpeakers(),
      rooms: await GetRooms(),
    },
  }
}
