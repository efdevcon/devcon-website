import { AppLayout } from 'components/domain/app/Layout'
import { Schedule } from 'components/domain/app/schedule'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { useRouter } from 'next/router'
import { GetSessions, GetRooms, GetTracks, GetEvent, GetExpertiseLevels, GetSessionTypes } from 'services/programming'
import { API_URL, DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { Session } from 'components/domain/app/session'
import { Session as SessionType } from 'types/Session'
import { SEO } from 'components/domain/seo'
import { GetRelatedSessions } from './schedule/[id]'
// import Fuse from 'fuse.js'

// const options = {
//   includeScore: true,
//   useExtendedSearch: true,
//   shouldSort: true,
//   ignoreLocation: true,
//   keys: [
//     {
//       name: 'speakers.name',
//       weight: 1,
//     },
//     {
//       name: 'track',
//       weight: 0.5,
//     },
//     {
//       name: 'tags',
//       weight: 0.2,
//     },
//   ],
// }

// export function GetRelatedSessions(id: string, sessions: SessionType[]): Array<SessionType> {
//   const session = sessions.find(i => i.id === id)
//   if (!session) return []

//   const fuse = new Fuse(sessions, options)
//   const query = `${session.speakers.map(i => `"${i.name}"`).join(' | ')} | "${session.track}" | ${session.tags
//     ?.map(i => `"${i}"`)
//     .join(' | ')}`
//   const result = fuse.search(query)

//   return result
//     .map(i => i.item)
//     .filter(i => i.id !== id)
//     .slice(0, 5)
// }

export default pageHOC((props: any) => {
  const { query } = useRouter()
  const sessionID = query.session
  const session = props.sessions.find((session: SessionType) => session.id === sessionID)
  const related = session ? GetRelatedSessions(String(sessionID), props.sessions) : []

  return (
    <AppLayout>
      {session ? (
        <>
          <SEO
            title={session.title}
            description={session.description}
            imageUrl={`${API_URL}api/image/og?id=${session.id}`}
          />
          <Session session={session} {...props} relatedSessions={related} sessionID={sessionID} />
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
      // speakers: await GetSpeakers(),
      rooms: await GetRooms(),
      expertiseLevels: await GetExpertiseLevels(),
      sessionTypes: await GetSessionTypes(),
    },
  }
}
