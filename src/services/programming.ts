import { Speaker } from 'types/Speaker'
import { Room } from 'types/Room'
import { Session as SessionType } from 'types/Session'
import { defaultSlugify } from 'utils/formatting'
import moment from 'moment'
require('dotenv').config()

const cache = new Map()
const baseUrl = 'https://speak.devcon.org/api'
const eventName = 'pwa-data'
const defaultLimit = 25

export async function GetSessions(): Promise<Array<SessionType>> {
    return await generateTestSessions()
    // const talks = await exhaustResource(`/events/${eventName}/talks`)
    // const rooms = await GetRooms()

    // return talks.map((i: any) => {
    //     return {
    //         id: i.code,
    //         speakers: i.speakers.map((x: any) => {
    //             return {
    //                 id: x.code,
    //                 name: x.name,
    //                 description: x.biography
    //             }
    //         }),
    //         title: i.title,
    //         track: i.track?.en ?? '',
    //         duration: i.duration,
    //         start: new Date(i.slot.start).getTime(),
    //         end: new Date(i.slot.end).getTime(),
    //         room: rooms.find(x => x.name === i.slot?.room?.en) || null,
    //         type: i.submission_type,
    //         description: i.description,
    //         abstract: i.abstract,
    //         // image?: string
    //         // resources?: string[]
    //         tags: [],
    //     }
    // })
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

export async function GetTracks(): Promise<Array<string>> {
    return ['Consensus Layer', 'Execution Layer', 'UX & Design', 'Security', 'Opportunity & Impact']
    // // no endpoint exists, so fetches and filters all sessions recursively
    // const tracks = (await GetSessions()).map(i => i.track)
    // return [...new Set(tracks)]
}

export async function GetRooms(): Promise<Array<Room>> {
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

export async function GetSpeakers(): Promise<Array<Speaker>> {
    return await generateTestSpeakers()

    // const speakers = await exhaustResource(`/events/${eventName}/speakers`)
    // return speakers.map((i: any) => {
    //     return {
    //         id: i.code,
    //         name: i.name,
    //         // role?: string,
    //         // company?: string
    //         avatar: i.avatar,
    //         description: i.biography
    //         // tracks?: string[]
    //     }
    // })
}

async function exhaustResource(slug: string, limit = defaultLimit, offset = 0, results = [] as any): Promise<any> {
    return get(`${slug}?limit=${limit}&offset=${offset}`).then((data: any) => {
        results.push(data.results);
        if (data.next) {
            return exhaustResource(slug, limit + defaultLimit, offset + defaultLimit, results);
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

export async function generateTestSessions(): Promise<Array<SessionType>> {
    const key = 'TEST:sessions'
    if (cache.has(key)) return cache.get(key)

    const tracks = await GetTracks()
    const rooms = await GetRooms()
    const types = ['Keynote', 'Workshop', 'Talk', 'Panel', 'Lightning Talk', 'Roundtable']
    const speakers = await generateTestSpeakers()

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

export async function generateTestSpeakers(): Promise<Array<Speaker>> {
    const key = 'TEST:speakers'
    if (cache.has(key)) return cache.get(key)

    const names = await fetch('https://www.randomlists.com/data/names-female.json')
    const data = (await names.json()).data
    const speakers = data.map((i: string) => {
        return {
            id: i,
            name: i,
            avatar: '',
            description: `Biography for ${i}`
        }
    })

    cache.set(key, speakers.slice(0, 250))
    return speakers
}