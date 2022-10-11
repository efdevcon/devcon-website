import slugify from 'slugify'
import fs from 'fs'
import fetch from 'cross-fetch'
import { ArchiveVideo } from '../../../src/types/ArchiveVideo'
import { writeToFile } from './import'

require('dotenv').config()

InitialRun()

const tracks = ['Cryptoeconomics', 'Developer Infrastructure', 'Governance & Coordination',
    'Layer 1 Protocol', 'Layer 2s', 'Opportunity & Global Impact', 'Security', 'Staking & Validator Experience',
    'UX & Design', 'ZKPs: Privacy, Identity, Infrastructure, & More']

async function InitialRun() {
    // 1. Initial run to Create session pages 
    console.log('Pretalx Archive import..')

    const response = await fetch(`https://app.devcon.org/api/schedule`)
    const body = await response.json()
    console.log(body.data.length, 'sessions')

    for (let i = 0; i < body.data.length; i++) {
        const session = body.data[i]
        const video = {
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

        writeToFile(video)
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

async function ImportRos() {
    // 2. Import YouTube info from Google Sheet
    // Get YouTube link, duration and add to Elastic index

    // -> Add to Devcon 6 playlist
    // -> Add to Track playlist 
    // -> Add to Elastic 
}