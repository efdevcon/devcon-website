import { Dashboard } from 'components/domain/app/dashboard'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetRooms, GetSessions, GetSpeakers } from 'services/programming'
import { Session as SessionType } from 'types/Session'
import { Speaker } from 'types/Speaker'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Dashboard {...props} />
    </AppLayout>
  )
})

// <Venue {...eventData} path="/venue" />
// <Room {...eventData} path="/venue/:floor" />
// <Dashboard {...eventData} path="/dashboard" />
// <Schedule {...eventData} path="/schedule" />
// <Session {...eventData} path="/schedule/:session" />
// <Speakers {...eventData} path="/speakers" />
// <SpeakerDetails {...eventData} path="/speakers/:speaker" />
// <Notifications {...eventData} path="/notifications" />
// <Info {...eventData} path="/info" />
// <SideEvents {...eventData} path="/side-events" />

// schedule/:session
// speakers/:speaker
// venue/:floor

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await getGlobalData(context.locale)),
      page: DEFAULT_APP_PAGE,
      sessions: await GetSessions(),
      speakers: await GetSpeakers(),
    },
  }
}
