import { Speaker } from 'types/Speaker'
import { Room } from 'types/Room'
import { Session as SessionType } from 'types/Session'
import { defaultSlugify } from 'utils/formatting'
import moment from 'moment'
import fs from 'fs'
import fetch from 'cross-fetch'
import sessionData from 'content/session-data.json'
import speakerData from 'content/speakers-data.json'
import roomsData from 'content/rooms-data.json'
import { makeConsoleLogger } from '@notionhq/client/build/src/logging'

require('dotenv').config()

const cache = new Map()
const baseUrl = 'https://speak.devcon.org/api'
const eventName = 'devcon-vi-2022' // 'devcon-vi-2022' // 'pwa-data'
const defaultLimit = 100
const websiteQuestionId = 29
const twitterQuestionId = 44
const githubQuestionId = 43
const expertiseQuestionId = 40
const tagsQuestionId = 42

const organizationQuestionId = 23 // not used
const roleQuestionId = 24 // not used

console.log('Pretalx Service', eventName)

export async function ImportSchedule() {
  console.log('Import Pretalx Event Schedule..')
  const rooms = await GetRooms(false)
  fs.writeFile("./src/content/rooms-data.json", JSON.stringify(rooms, null, 2), function (err) {
    if (err) {
      console.log(err)
    }
  })
  console.log('Rooms imported', rooms.length)

  const sessions = await GetSessions(false)
  fs.writeFile("./src/content/session-data.json", JSON.stringify(sessions, null, 2), function (err) {
    if (err) {
      console.log(err)
    }
  })
  console.log('Sessions imported', sessions.length)

  const speakers = await GetSpeakers(false)
  const filtered = speakers.filter(i => sessions.map(x => x.speakers.map(y => y.id)).some(x => x.includes(i.id)))
  fs.writeFile("./src/content/speakers-data.json", JSON.stringify(filtered, null, 2), function (err) {
    if (err) {
      console.log(err)
    }
  })
  console.log('Speakers imported', filtered.length)
}

export async function GetEvent(): Promise<any> {
  const event = await get(`/events/${eventName}`)

  return event;
}

// const testTime = async () => {
//   // const talks = await exhaustResource(`/events/${eventName}/talks`)
//   const data = await get(`/events/${eventName}/talks`);
//   const firstTalk = data.results[0];
//   console.log(firstTalk.title, 'title');
//   console.log(firstTalk.slot, 'data')
//   console.log(firstTalk.duration)
//   const wrong = new Date(firstTalk.slot.start).getTime()
//   console.log(moment.utc(firstTalk.slot.start).utc())
//   console.log(moment.utc(wrong).utc())
// }
// testTime();

// ImportSchedule();

export async function GetSessions(fromCache = true): Promise<Array<SessionType>> {
  if (fromCache) return sessionData as SessionType[]

  const talks = await exhaustResource(`/events/${eventName}/talks`)
  const rooms = await GetRooms(fromCache)
  const speakers = await GetSpeakers()

  const sessions = talks.map((i: any) => {
    const expertise = i.answers?.find((i: any) => i.question.id === expertiseQuestionId)?.answer as string
    const tagsAnswer = i.answers?.find((i: any) => i.question.id === tagsQuestionId)?.answer as string

    return {
      id: i.code,
      speakers: i.speakers.map((x: any) => {
        return {
          id: x.code,
          name: x.name,
          description: x.biography,
          twitter: speakers.find(speaker => x.code === speaker.id)?.twitter,
          avatar: x.avatar ?? '',
        }
      }),
      title: i.title,
      track: i.track?.en ?? '',
      duration: i.duration,
      start: moment.utc(i.slot.start).subtract(5, 'hours').valueOf(),
      end: moment.utc(i.slot.end).subtract(5, 'hours').valueOf(),
      room: rooms.find(x => x.name === i.slot?.room?.en) || null,
      type: i.submission_type?.en ?? '',
      description: i.description,
      abstract: i.abstract ?? '',
      expertise: expertise ?? '',
      // image?: string
      // resources?: string[]
      tags: tagsAnswer ? tagsAnswer.includes(',') ?
        tagsAnswer.split(',').map(i => i.replace(/['"]+/g, '').trim()) :
        tagsAnswer.split(' ').map(i => i.replace(/['"]+/g, '').trim()) :
        []
    };
  })

  return sessions
}

export async function GetSessionsBySpeaker(id: string): Promise<Array<SessionType>> {
  // no endpoint exists, so fetches and filters all sessions recursively
  return (await GetSessions()).filter(i => i.speakers.some(x => x.id === id))
}

export async function GetSessionsByRoom(id: string): Promise<Array<SessionType>> {
  // no endpoint exists, so fetches and filters all sessions recursively
  return (await GetSessions()).filter(i => i.room?.id === id)
}

export async function GetExpertiseLevels(): Promise<Array<string>> {
  return Array.from((await GetSessions()).reduce((acc: any, session: SessionType) => {
    if (session.expertise) {
      acc.add(session.expertise);
    }

    return acc;
  }, new Set()));
}

export async function GetSessionTypes(): Promise<Array<string>> {
  return Array.from((await GetSessions()).reduce((acc: any, session: SessionType) => {
    if (session.type) {
      acc.add(session.type);
    }

    return acc;
  }, new Set()));
}

export async function GetTracks(): Promise<Array<string>> {
  // no endpoint exists, so fetches and filters all sessions recursively
  const tracks = (await GetSessions()).map(i => i.track)
  return [...new Set(tracks)].sort()
}

export async function GetEventDays(): Promise<Array<number>> {
  // no endpoint exists, so fetches and filters all sessions recursively
  const days = (await GetSessions()).map(i => moment.utc(i.start).startOf('day').valueOf())
  return [...new Set(days)].sort()
}

export async function GetRooms(fromCache = true): Promise<Array<Room>> {
  if (fromCache) return roomsData as Room[]

  const rooms = await exhaustResource(`/events/${eventName}/rooms`)
  return rooms.map((i: any) => {
    return {
      id: i.name?.en ? defaultSlugify(i.name?.en) : String(i.id),
      name: i.name?.en ?? '',
      description: i.description?.en ?? '',
      info: i.speaker_info?.en ?? '',
      capacity: i.capacity,
    }
  })
}

export async function GetFloors(): Promise<Array<string>> {
  const rooms = await GetRooms()
  return [...new Set(rooms.map(i => i.info).filter(i => !!i))]
}

export async function GetSpeaker(id: string, fromCache = true): Promise<Speaker | undefined> {
  if (fromCache) {
    const speakers = await GetSpeakers()
    return speakers.find(i => i.id === id)
  }

  const speaker = await get(`/events/${eventName}/speakers/${id}`)
  if (!speaker || speaker.detail === 'Not found.') return undefined

  return speaker
}

export async function GetSpeakers(fromCache = true): Promise<Array<Speaker>> {
  if (fromCache) return speakerData as Speaker[]

  const sessions = await GetSessions()
  const speakersData = await exhaustResource(`/events/${eventName}/speakers`)
  const speakers = speakersData.map((i: any) => {
    const speakerSessions = sessions.filter((s: SessionType) => i.submissions.find((x: string) => x === s.id))
    const organization = i.answers?.find((i: any) => i.question.id === organizationQuestionId)?.answer
    const role = i.answers?.find((i: any) => i.question.id === roleQuestionId)?.answer
    const website = i.answers?.find((i: any) => i.question.id === websiteQuestionId)?.answer
    const twitter = i.answers?.find((i: any) => i.question.id === twitterQuestionId)?.answer
    const github = i.answers?.find((i: any) => i.question.id === githubQuestionId)?.answer

    let speaker: any = {
      id: i.code,
      name: i.name,
      avatar: i.avatar,
      description: i.biography ?? '',
      tracks: [...new Set(speakerSessions.map(i => i.track))],
      eventDays: [...new Set(speakerSessions.map(i => moment.utc(i.start).startOf('day').valueOf()))],
    }

    if (role) speaker.role = role
    if (organization) speaker.company = organization
    if (website) speaker.website = website
    if (twitter) speaker.twitter = twitter
    if (github) speaker.github = github

    return speaker
  })

  return speakers
}

async function exhaustResource(slug: string, limit = defaultLimit, offset = 0, results = [] as any): Promise<any> {
  return get(`${slug}${slug.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}`).then((data: any) => {
    results.push(data.results)
    if (data.next) {
      console.log('GET', slug, 'TOTAL COUNT', data.count)
      return exhaustResource(slug, defaultLimit, offset + defaultLimit, results)
    } else {
      console.log('Return results', slug, results.flat().length)
      return results.flat()
    }
  })
}

async function get(slug: string) {
  if (cache.has(slug)) {
    return cache.get(slug)
  }

  const response = await fetch(`${baseUrl}${slug}`, {
    headers: {
      Authorization: `Token ${process.env.PRETALX_API_KEY}`,
    },
  })

  const data = await response.json()
  cache.set(slug, data)
  return data
}
