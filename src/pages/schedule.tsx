import { AppLayout } from 'components/domain/app/Layout'
import { Schedule } from 'components/domain/app/schedule'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { useRouter } from 'next/router'
import {
  GetSessions,
  GetSpeakers,
  GetRooms,
  GetTracks,
  GetEvent,
  GetExpertiseLevels,
  GetSessionTypes,
} from 'services/programming'
import { API_URL, DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { Session } from 'components/domain/app/session'
import { Session as SessionType } from 'types/Session'
import { SEO } from 'components/domain/seo'

export default pageHOC((props: any) => {
  const { query } = useRouter()
  const sessionID = query.session
  const session = props.sessions.find((session: SessionType) => session.id === sessionID)

  return (
    <AppLayout>
      {session ? (
        <>
          <SEO
            title={session.title}
            description={session.description}
            imageUrl={`${API_URL}api/image/og?id=${session.id}`}
          />
          <Session session={session} {...props} />
        </>
      ) : (
        <Schedule {...props} />
      )}
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
      expertiseLevels: await GetExpertiseLevels(),
      sessionTypes: await GetSessionTypes(),
    },
  }
}
