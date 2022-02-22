import { Speaker } from 'types/Speaker'
import { Room } from 'types/Room'
import { Session as SessionType } from 'types/Session'
require('dotenv').config()

const cache = new Map()
const baseUrl = 'https://speak.devcon.org/api'
const eventName = 'pwa-data'
const defaultLimit = 25

export async function GetSessions(): Promise<Array<SessionType>> {
    const talks = await exhaustResource(`/events/${eventName}/talks`)
    return talks.map((i: any) => {
        return {
            id: i.code,
            speakers: i.speakers.map((x: any) => {
                return {
                    id: x.code,
                    name: x.name,
                    description: x.biography
                }
            }),
            title: i.title,
            track: i.track?.en ?? '',
            duration: i.duration,
            start: new Date(i.slot.start).getTime(),
            end: new Date(i.slot.end).getTime(),
            room: i.slot.room?.en ?? '',
            type: i.submission_type,
            description: i.description,
            abstract: i.abstract,
            // image?: string
            // resources?: string[]
            tags: [],
        }
    })
}

export async function GetRooms(): Promise<Array<Room>> {
    const rooms = await exhaustResource(`/events/${eventName}/rooms`);
    return rooms.map((i: any) => {
        return {
            i: String(i.id),
            name: i.room?.en ?? '',
            description: i.description?.en ?? '',
        }
    })
}

export async function GetSpeakers(): Promise<Array<Speaker>> {
    const speakers = await exhaustResource(`/events/${eventName}/speakers`)
    return speakers.map((i: any) => {
        return {
            id: i.code,
            name: i.name,
            // role?: string,
            // company?: string
            // avatar?: string
            description: i.biography
            // tracks?: string[]
        }
    })
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
