import { Request, Response } from 'express'
import { SearchIndexClientInterface, SearchParams } from 'src/server/services/search-client'

export class ArchiveController {
  private _client: SearchIndexClientInterface

  constructor(client: SearchIndexClientInterface) {
    this._client = client
  }

  public async Search(req: Request, res: Response) {
    try {
      const query = new Array<string>();
      const input = req.query

      let params: SearchParams = {}
      if (req.query['sort']) params.sort = req.query['sort'] as string
      if (req.query['order']) params.order = req.query['order'] as 'asc' | 'desc'
      if (req.query['from']) params.from = Number(req.query['from'])
      if (req.query['size']) params.size = Number(req.query['size'])

      const skipParams = ['q', 'sort', 'order', 'from', 'size']
      Object.keys(input).forEach(i => {
        if (skipParams.includes(i)) return

        if (Array.isArray(input[i])) {
          const asArray = input[i] as string[]
          const arrayFilter = asArray.map(value => i + ':' + value)
          
          query.push('(' + arrayFilter.join(' OR ') + ')')
        }

        if (typeof input[i] === 'string') {
          query.push('(' + i + ':' + input[i] + ')')
        }
      })

      if (req.query['q']) {
        const searchQuery = req.query['q'] as string
        query.push(`(title:*${searchQuery}* OR description:*${searchQuery}*)`)

      }
      const queryString = query.length ? query.join(' AND ') : "*"
      const results = await this._client.searchIndex('archive', queryString, params)
      
      res.status(200).send({ code: 200, data: results })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to fetch Archive search results' })
    }
  }
}
