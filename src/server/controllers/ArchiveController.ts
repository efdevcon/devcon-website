import { Request, Response } from 'express'
import { fetch } from 'cross-fetch'
import queryString from 'query-string'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

export class ArchiveController {
  public async Search(req: Request, res: Response) {
    try {
      const qs = queryString.stringify(req.query)
      const uri = `https://api.devcon.org/sessions?${qs}`

      const response = await fetch(uri)
      const data = await response.json()

      res.status(200).send({ code: 200, data: {
        ...data.data,
        items: data.data.items.map((item: any) => {
          const edition = Number(item.eventId.replace('devcon-', ''))
          return {
            id: item.id,
            sourceId: item.sourceId,
            slug: `${edition}/${item.id}`,
            edition: Number(item.eventId.replace('devcon-', '')),
            title: item.title,
            relatedVideos: [] as ArchiveVideo[],
            description: item.description,
            slidesUrl: item.resources_slides,
            youtubeUrl: `https://youtu.be/${item.sources_youtubeId}`,
            ipfsHash: item.sources_ipfsHash,
            ethernaPermalink: `https://etherna.io/embed/${item.sources_swarmHash}`,
            duration: item.duration,
            expertise: item.expertise,
            type: item.type,
            track: item.track,
            keywords: item.tags.split(','),
            tags: item.tags.split(','),
            speakers: [],
            profiles: []
          }
        })
      }})
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to fetch Archive search results' })
    }
  }
}
