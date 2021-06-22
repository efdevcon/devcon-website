import { ArchiveVideo } from '../../src/types/ArchiveVideo';
const GSheetReader: any = require('g-sheets-api');
const slugify = require('slugify')
const fs = require('fs');
require('dotenv').config()

const generatePlaylist = true
const archiveDir = '../src/content/archive/videos'
const sheet = process.env.SHEET_ID
const edition = 0
console.log('Importing edition', edition, 'from', sheet, 'to', archiveDir)

GSheetReader(
  {
    sheetId: sheet,
    sheetNumber: edition,
  },
  (results: any) => {
    const videos: Array<ArchiveVideo> = results.map((result: any) => {
      return { 
        edition: edition,
        title: result['Talk Name'],
        description: result['Talk Description'],
        youtubeUrl: result['Video URL'],
        ipfsHash: result['IPFS Hash'],
        expertise: result['Skill level'],
        type: result['Type (Talk, Panel, Workshop, Other)'],
        track: result['Track'],
        keywords: result['Keywords'] ? result['Keywords'].split(',') : undefined,
        tags: result['Tags'] ? result['Tags'].split(',') : undefined,
        speakers: result['Talk Speaker(s)'] ? result['Talk Speaker(s)'].split(',') : undefined
      } as ArchiveVideo
    });

    console.log('Videos found', videos.length)
    videos.forEach((video) => {
      writeToFile(video)
    });

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
);

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
        if (typeof value === 'undefined' && key === 'keywords') return acc += `\n${key}: []`;
        if (typeof value === 'undefined' && key === 'tags') return acc += `\n${key}: []`;
        if (typeof value === 'undefined') return acc += `\n${key}: ''`;
        if (typeof value === 'number') return acc += `\n${key}: ${value}`;
        if (typeof value === 'string') return acc += `\n${key}: "${value.trim()}"`;
        if (typeof value === 'object' && Array.isArray(value)) {
          return acc += `\n${key}: [${value.map(item => `'${item}'`)}]`
        } 

        return acc += `\n${key}: '${value}'`;
    }, '')}\n---\n`;

    fs.writeFileSync(videoDir + '/index.md', markdown);
}
