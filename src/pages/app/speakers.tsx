import { AppLayout } from 'components/domain/app/Layout'
import { Speakers } from 'components/domain/app/speakers'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import {
  GetEventDays,
  GetSessions,
  GetSpeakers,
  GetTracks,
  GetRooms,
  GetExpertiseLevels,
  GetSessionTypes,
} from 'services/programming'
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
  const sessions = await GetSessions()
  const speakers = await GetSpeakers()

  const sessionsBySpeakerId: any = {}

  sessions.forEach(session => {
    session.speakers.forEach(speaker => {
      if (sessionsBySpeakerId[speaker.id]) {
        sessionsBySpeakerId[speaker.id].push(session)
      } else {
        sessionsBySpeakerId[speaker.id] = [session]
      }
    })
  })

  const speakersWithSessions = speakers.map(speaker => {
    return {
      ...speaker,
      sessions: sessionsBySpeakerId[speaker.id],
    }
  })

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      sessions,
      speakers: speakersWithSessions,
      tracks: await GetTracks(),
      eventDays: await GetEventDays(),
      rooms: await GetRooms(),
      expertiseLevels: await GetExpertiseLevels(),
      sessionTypes: await GetSessionTypes(),
    },
  }
}
