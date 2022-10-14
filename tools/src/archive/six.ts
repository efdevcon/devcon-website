import slugify from 'slugify'
import fs from 'fs'
import fetch from 'cross-fetch'
import { google } from 'googleapis'
import { ArchiveVideo } from '../../../src/types/ArchiveVideo'
import { getVideoDuration, writeToFile } from './import'
import { writeProfileToFile } from './profiles'
require('dotenv').config()

const apiKey = process.env.GOOGLE_API_KEY
const sheetId = '1S4F3t1JFBRMecND9xoD3JbuHZqEy3BJ8ooTdbnMv-bE'
const sheetIndex = 1

ImportSpeakers()

const tracks = ['Cryptoeconomics', 'Developer Infrastructure', 'Governance & Coordination',
    'Layer 1 Protocol', 'Layer 2s', 'Opportunity & Global Impact', 'Security', 'Staking & Validator Experience',
    'UX & Design', 'ZKPs: Privacy, Identity, Infrastructure, & More']

const streamRooms = ['talk-1', 'talk-2', 'talk-3', 'talk-4', 'talk-5', 'talk-5-opening-ceremonies',
    'workshop-1', 'workshop-2', 'workshop-3', 'workshop-4']

async function InitialRun() {
    // 1. Initial run to Create session pages 
    console.log('Pretalx Archive import..')

    const response = await fetch(`https://app.devcon.org/api/schedule`)
    const body = await response.json()
    console.log(body.data.length, 'sessions')

    for (let i = 0; i < body.data.length; i++) {
        const session = body.data[i]
        if (!streamRooms.some(i => session.room?.id === i)) {
            return
        }

        writeToFile(mapArchiveVideo(session))
    }

    // -> Generate speaker profiles
    // TODO

    // -> Generate Devcon 6 playlist
    GeneratePlaylist(body.data, '6')

    // -> Generate Track playlists
    tracks.forEach(i => {
        GeneratePlaylist(body.data.filter((x: any) => x.track === i), slugify(i.toLowerCase(), { strict: true }))
    })

    console.log('Done')
}

function GeneratePlaylist(sessions: any[], type: string) {
    // Writing playlist file to edition directory. Still need to process (copy/paste) to any playlists
    const videoPaths = sessions.map(i => `6/${slugify(i.title.toLowerCase(), { strict: true })}/index`)
    const dirName = `../src/content/archive/generation`
    fs.mkdir(dirName, { recursive: true }, () => '')
    fs.writeFileSync(`${dirName}/${type}.md`, '- ' + videoPaths.join('\n- '))
}

async function ImportSpeakers() { 
    console.log('Fetch schedule info')
    const res = await fetch(`https://app.devcon.org/api/schedule`)
    const body = await res.json()
    const sessions = body.data
    console.log(sessions.length, 'sessions')

    const speakers = Array.from(new Set(sessions.map((i: any) => i.speakers).flat()))
    console.log(speakers.length)
    speakers.forEach(i => {
      writeProfileToFile(i)
    })
}

async function ImportRos() {
    console.log('Fetch schedule info')
    const res = await fetch(`https://app.devcon.org/api/schedule`)
    const body = await res.json()
    const sessions = body.data
    console.log(sessions.length, 'sessions')

    const sheets = google.sheets({
        version: 'v4',
        auth: apiKey
    })
    const sheetsResponse = await sheets.spreadsheets.get({
        spreadsheetId: sheetId,
    })
    const sheetNames = sheetsResponse.data?.sheets?.map((i: any) => i.properties.title)
    const sheet = sheetNames ? sheetNames[sheetIndex] : ''
    if (!sheet) return console.log('No sheet')

    console.log('Processing Sheet', sheet)
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheet}!A1:1000`,
    })

    const data = response.data?.values
    if (!data) {
        console.log('No Data')
        return
    }

    for (let i = 0; i < data.length; i++) {
        const info = data[i]
        if (!info[0] || !info[7]) {
            console.log('No sessionId/YouTube', info)
            continue // skip
        }

        const sessionId = info[0]
        console.log('Processing session', sessionId)
        const session = sessions.find((i: any) => sessionId === i.id)
        if (!session) {
            console.log('Session not found', sessionId)
            continue // skip
        }

        const youtubeUrl = info[7]
        const youtubeId = getVideoId(youtubeUrl)
        const duration = await getVideoDuration(youtubeId)
        let video = mapArchiveVideo(session)
        video.duration = duration ?? 0
        video.youtubeUrl = youtubeUrl

        writeToFile(video)

        // if success -> push to YouTube 
        // thumbnail / description 
    }
}

function getVideoId(youtubeUrl: string): string {
    let videoId = youtubeUrl
    videoId = videoId.replace('https://youtu.be/', '')
    videoId = videoId.replace('https://www.youtube.com/embed/', '')
    videoId = videoId.replace('https://www.youtube.com/watch?v=', '')
    videoId = videoId.replace('https://studio.youtube.com/video/', '')
    videoId = videoId.replace('&feature=youtu.be', '')
    videoId = videoId.replace('/edit', '')

    return videoId
}

function mapArchiveVideo(session: any): ArchiveVideo {
    return {
        edition: 6,
        sourceId: session.id,
        title: session.title,
        description: session.description,
        youtubeUrl: '',
        ipfsHash: '',
        ethernaIndex: '',
        ethernaPermalink: '',
        duration: 0,
        expertise: session.expertise,
        type: session.type?.includes('Workshop') ? 'Workshop' : session.type,
        track: session.track,
        tags: [session.track],
        keywords: session.tags,
        speakers: session.speakers.map((i: any) => i.name)
    } as ArchiveVideo
}