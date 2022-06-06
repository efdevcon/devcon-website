import { Dashboard } from 'components/domain/app/dashboard'
import { AppLayout } from 'components/domain/app/Layout'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetNavigationData } from 'services/navigation'
import { GetLatestNotification } from 'services/notifications'
import { GetRooms, GetSessions, GetSpeakers } from 'services/programming'
import { Session as SessionType } from 'types/Session'
import { Speaker } from 'types/Speaker'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getMessages } from 'utils/intl'

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
  const intl = await getMessages(context.locale)

  return {
    props: {
      messages: intl,
      navigationData: await GetNavigationData(context.locale),
      notification: GetLatestNotification(context.locale),
      page: DEFAULT_APP_PAGE,
      sessions: await GetSessions(),
      speakers: await GetSpeakers(),
    },
  }
}
