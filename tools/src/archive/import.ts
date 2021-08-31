import { ArchiveVideo } from '../../../src/types/ArchiveVideo';
import { getVideoId } from '../../../src/utils/video'
import fetch from 'node-fetch';
import moment from 'moment'
import { GetUserProfiles, writeProfileToFile } from './profiles';
import { UserProfile } from '../../../src/types/UserProfile';
const GSheetReader: any = require('g-sheets-api');
const slugify = require('slugify')
const fs = require('fs');
require('dotenv').config()

// for profile generation - need to update the async/duration call
const fetchProfiles = false
const writeToDisk = true
const generatePlaylist = false
const archiveDir = '../src/content/archive/videos'
const sheet = process.env.SHEET_ID
const edition = 1 // 
const sheetName = 'Devcon ' + edition // 
console.log('Importing archive edition', edition, 'from', sheetName, 'to', archiveDir)

ImportArchiveVideos() 

async function ImportArchiveVideos() {
  const videos: Array<ArchiveVideo> = []
  let profiles: Array<UserProfile> = []

  if (fetchProfiles) {
    profiles = await GetUserProfiles()
    console.log('PROFILES', profiles.length)
  }

  await GSheetReader(
    {
      apiKey: process.env.YOUTUBE_API_KEY,
      sheetId: sheet,
      sheetName: sheetName,
    },
    (results: any) => {
      console.log('Archive video records found', results.length)

      // remove async/duration call for profile generation
      results.forEach(async (result: any, index: number) => {
        if (!result['Video URL']) return
        
        let duration = 0
        if (result['Video URL']) {
          try { 
            const id = getVideoId(result['Video URL'])
            duration = await getVideoDuration(id)
          }
          catch (ex) {
            console.log('Unable to fetch video duration', result['Video URL'])
            return
          }
        }

        const tags = result['Tags'] ? result['Tags'].split(',').map((i: string) => i.trim()) : []
        tags.push(result['Track'])

        let ipfsHash = result['IPFS Hash'] ?? '' as string
        ipfsHash = ipfsHash.replace('https://ipfs.ethdevops.io/ipfs/', '')
        ipfsHash = ipfsHash.includes('?') ? ipfsHash.split('?')[0] : ipfsHash

        const video = { 
          edition: edition,
          title: result['Talk Name'],
          description: result['Talk Description'],
          youtubeUrl: result['Video URL'],
          ipfsHash: ipfsHash,
          duration: duration,
          expertise: result['Skill Level'],
          type: result['Type (Talk, Panel, Workshop, Other)'],
          track: result['Track'],
          keywords: result['Keywords'] ? result['Keywords'].split(',').map((i: string) => i.trim()) : undefined,
          tags: tags,
          speakers: result['Talk Speaker(s)'] ? result['Talk Speaker(s)'].split(',').map((i: string) => i.trim()) : undefined
        } as ArchiveVideo

        videos.push(video)

        if (writeToDisk) {
          writeToFile(video)
        }
      })

      if (generatePlaylist) {
        // Writing playlist file to edition directory. Still need to process (copy/paste) to any playlists
        const editionDir = archiveDir + '/' + edition
        const videoPaths = videos.map(i => i.edition + '/' + slugify(i.title.toLowerCase(), { strict: true }) + '/index')
        fs.writeFileSync(editionDir + '/playlist.md', '- ' + videoPaths.join('\n- '));
      }
    },
    (error: any) => {
      console.log('Unable to fetch sheet results..')
      console.error(error)
    }
  )

  if (fetchProfiles) {
    // unique profiles from videos 
    console.log('# of videos', videos.length)
    const speakers = videos.map(i => i.speakers).reduce((acc, val) => acc.concat(val), [])
    console.log('# of speakers', speakers.length)
    const uniques = Array.from(new Set(speakers))
    console.log('Unique speakers', uniques.length)
    const speakerProfiles = profiles.filter(i => uniques.includes(i.name))
    console.log('Unique speaker profiles for this event', edition, speakerProfiles.length)
    
    speakerProfiles.forEach(i => {
      writeProfileToFile(i)
    })
  }
}

async function getVideoDuration(id: string): Promise<number> { 
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${process.env.YOUTUBE_API_KEY}`);
  const body = await response.json();
  const duration = body?.items?.length > 0 ? body.items[0].contentDetails.duration : 0
  return moment.duration(duration).asSeconds();
}

function writeToFile(video: ArchiveVideo) { 
    const editionDir = archiveDir + '/' + video.edition
    if (!fs.existsSync(editionDir)) {
        console.log('Create dir', editionDir)
        fs.mkdirSync(editionDir);
    }

    const folderName = slugify(video.title.toLowerCase(), { strict: true }) 
    const videoDir = editionDir + '/' + folderName 
    if (!fs.existsSync(videoDir)) {
        console.log('Create dir', videoDir)
        fs.mkdirSync(videoDir);
    }

    const attributes = Object.entries(video)
    const markdown = `---${attributes.reduce((acc, [key, value], index) => {
        if (typeof value === 'undefined' && key === 'keywords') return acc += `\n${key}: []`
        if (typeof value === 'undefined' && key === 'tags') return acc += `\n${key}: []`
        if (typeof value === 'undefined') return acc += `\n${key}: ''`
        if (typeof value === 'number') return acc += `\n${key}: ${value}`
        if (typeof value === 'string') {
          let stringValue = value.trim().replace(/[\""]/g, '\\"');
          return acc += `\n${key}: "${stringValue}"`
        }
        if (typeof value === 'object' && Array.isArray(value)) {
          return acc += `\n${key}: [${value.map(item => `'${item}'`)}]`
        } 

        return acc += `\n${key}: '${value}'`;
    }, '')}\n---\n`;

    fs.writeFileSync(videoDir + '/index.md', markdown);
}
