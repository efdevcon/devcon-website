import { Speaker } from 'types/Speaker'
import { Room } from 'types/Room'
import { Session as SessionType } from 'types/Session'
import { defaultSlugify } from 'utils/formatting'
import moment from 'moment'
import fs from 'fs'
import speakerData from '../content/speakers-data.json'

require('dotenv').config()

const cache = new Map()
const baseUrl = 'https://speak.devcon.org/api'
const eventName = 'pwa-data' // 'devcon-vi-2022' // 'pwa-data'
const defaultLimit = 100
const test = process.env.NODE_ENV !== 'production'
const websiteQuestionId = 29
const twitterQuestionId = 44
const githubQuestionId = 43
const expertiseQuestionId = 40

const organizationQuestionId = 23 // not used
const roleQuestionId = 24 // not used

export async function GetSessions(): Promise<Array<SessionType>> {
    if (test) return await generateSessions()

    const talks = await exhaustResource(`/events/${eventName}/talks`)
    const rooms = await GetRooms()

    return talks.map((i: any) => {
        const expertise = i.answers.find((i: any) => i.question.id === expertiseQuestionId)?.answer
        return {
            id: i.code,
            speakers: i.speakers.map((x: any) => {
                return {
                    id: x.code,
                    name: x.name,
                    description: x.biography,
                    avatar: x.avatar
                }
            }),
            title: i.title,
            track: i.track?.en ?? '',
            duration: i.duration,
            start: new Date(i.slot.start).getTime(),
            end: new Date(i.slot.end).getTime(),
            room: rooms.find(x => x.name === i.slot?.room?.en) || null,
            type: i.submission_type,
            description: i.description,
            abstract: i.abstract,
            expertise: expertise ?? null,
            // image?: string
            // resources?: string[]
            tags: [],
        }
    })
}

export async function GetSessionsByTrack(id: string): Promise<Array<SessionType>> {
    // no endpoint exists, so fetches and filters all sessions recursively
    return (await GetSessions()).filter(i => i.track === id)
}

export async function GetSessionsByDay(date: Date): Promise<Array<SessionType>> {
    // no endpoint exists, so fetches and filters all sessions recursively
    return (await GetSessions()).filter(i => moment(i.start).isSame(moment(date), 'day'))
}

export async function GetSessionsBySpeaker(id: string): Promise<Array<SessionType>> {
    // no endpoint exists, so fetches and filters all sessions recursively
    return (await GetSessions()).filter(i => i.speakers.some(x => x.id === id))
}

export async function GetSessionsByRoom(id: string): Promise<Array<SessionType>> {
    // no endpoint exists, so fetches and filters all sessions recursively
    return (await GetSessions()).filter(i => i.room?.id === id)
}

export async function GetTracks(): Promise<Array<string>> {
    if (test) return generateTracks()

    // no endpoint exists, so fetches and filters all sessions recursively
    const tracks = (await GetSessions()).map(i => i.track)
    return [...new Set(tracks)].sort()
}

export async function GetEventDays(): Promise<Array<number>> {
    if (test) return generateEventDays()

    // no endpoint exists, so fetches and filters all sessions recursively
    const days = (await GetSessions()).map(i => moment.utc(i.start).startOf('day').valueOf())
    return [...new Set(days)].sort()
}

export async function GetRooms(): Promise<Array<Room>> {
    if (test) return generateRooms()

    const rooms = await exhaustResource(`/events/${eventName}/rooms`);
    return rooms.map((i: any) => {
        return {
            id: i.name?.en ? defaultSlugify(i.name?.en) : String(i.id),
            name: i.name?.en ?? '',
            description: i.description?.en ?? '',
            info: i.speaker_info?.en ?? null,
            capacity: i.capacity
        }
    })
}

export async function GetFloors(): Promise<Array<string>> {
    const rooms = await GetRooms()
    return [...new Set(rooms.map(i => i.info).filter(i => !!i))]
}

export async function GetSpeaker(id: string): Promise<Speaker | undefined> {
    if (test) {
        const speakers = await GetSpeakers()
        return speakers.find(i => i.id === id)
    }

    const speaker = await get(`/events/${eventName}/speakers/${id}`)
    if (!speaker || speaker.detail === 'Not found.') return undefined

    return speaker
}

export async function GetSpeakers(): Promise<Array<Speaker>> {
    if (test) return await generateSpeakers()

    const sessions = await GetSessions()
    const speakersData = await exhaustResource(`/events/${eventName}/speakers`)
    const speakers = speakersData.map((i: any) => {
        const speakerSessions = sessions.filter((s: SessionType) => i.submissions.find((x: string) => x === s.id))
        const organization = i.answers.find((i: any) => i.question.id === organizationQuestionId)?.answer
        const role = i.answers.find((i: any) => i.question.id === roleQuestionId)?.answer
        const website = i.answers.find((i: any) => i.question.id === websiteQuestionId)?.answer
        const twitter = i.answers.find((i: any) => i.question.id === twitterQuestionId)?.answer
        const github = i.answers.find((i: any) => i.question.id === githubQuestionId)?.answer

        let speaker: any = {
            id: i.code,
            name: i.name,
            avatar: i.avatar,
            description: i.biography ?? '',
            tracks: [...new Set(speakerSessions.map(i => i.track))],
            eventDays: [...new Set(speakerSessions.map(i => moment.utc(i.start).startOf('day').valueOf()))]
        }

        if (role) speaker.role = role
        if (organization) speaker.company = organization
        if (website) speaker.website = website
        if (twitter) speaker.twitter = twitter
        if (github) speaker.github = github

        return speaker
    })

    // fs.writeFile("./src/content/speakers-data.json", JSON.stringify(speakers, null, 2), function (err) {
    //     if (err) {
    //         console.log(err)
    //     }
    // })

    return speakers
}

async function exhaustResource(slug: string, limit = defaultLimit, offset = 0, results = [] as any): Promise<any> {
    return get(`${slug}?limit=${limit}&offset=${offset}`).then((data: any) => {
        results.push(data.results);
        if (data.next) {
            return exhaustResource(slug, defaultLimit, offset + defaultLimit, results);
        } else {
            return results.flat();
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

// TEST DATA 
export async function generateSessions(): Promise<Array<SessionType>> {
    const key = 'TEST:sessions'
    if (cache.has(key)) return cache.get(key)

    const tracks = await GetTracks()
    const rooms = await GetRooms()
    const types = await GetTracks()
    const speakers = await GetSpeakers()

    const sessions: Array<SessionType> = []
    for (let d = 11; d < 15; d++) {
        for (let h = 9; h < 18; h++) {
            for (let t = 0; t < tracks.length; t++) {
                const type = types[Math.floor(Math.random() * types.length)]
                const sessionId = `${d}${h}${defaultSlugify(tracks[t])}`
                const nrOfSpeakers = Math.floor(Math.random() * 3) + 1
                const sessionSpeakers = new Array<Speaker>()
                for (let s = 0; s < nrOfSpeakers; s++) {
                    sessionSpeakers.push(speakers[Math.floor(Math.random() * speakers.length)])
                }

                sessions.push({
                    id: sessionId,
                    speakers: sessionSpeakers,
                    title: `${tracks[t]}, Oct ${d} ${h}:00`,
                    track: tracks[t],
                    duration: 60,
                    start: new Date(`2022-10-${d}T${h}:00:00`).getTime(),
                    end: new Date(`2022-10-${d}T${h + 1}:00:00`).getTime(),
                    room: rooms[Math.floor(Math.random() * rooms.length)],
                    type: type,
                    description: 'Lorem ipsum dolor sit amet..',
                    abstract: `Abstract for ${sessionId} (${type})`
                })
            }
        }
    }

    cache.set(key, sessions)
    return sessions
}

export async function generateSpeakers(): Promise<Array<Speaker>> {
    return speakerData as Speaker[]
}

export async function generateTracks(): Promise<Array<string>> {
    return [
        'Developer Infrastructure',
        'Privacy',
        'Consensus & Coordination',
        'Scaling & Interoperability',
        'Consensus Layer',
        'Execution Layer',
        'UX & Design',
        'Security',
        'Opportunity & Impact'
    ].sort()
}

export async function generateEventDays(): Promise<Array<number>> {
    return [
        new Date(2022, 10, 11).valueOf(),
        new Date(2022, 10, 12).valueOf(),
        new Date(2022, 10, 13).valueOf(),
        new Date(2022, 10, 14).valueOf()
    ]
}

export async function generateRooms(): Promise<Array<Room>> {
    return [{
        id: 'main',
        name: 'Main',
        description: 'Main stage',
        info: 'F0',
        capacity: 1000
    }, {
        id: '2',
        name: 'Stage #2',
        description: 'Stage Two description',
        info: 'F1',
        capacity: 200
    }, {
        id: '3',
        name: 'Stage #3',
        description: 'Stage Three description',
        info: 'F1',
        capacity: 300
    }, {
        id: 'hacker-basement',
        name: 'Hacker Basement',
        description: '',
        info: '-1',
        capacity: 500
    }]
}