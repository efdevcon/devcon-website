import { Request, Response } from 'express'
import { SearchIndexClientInterface } from 'src/server/services/search-client'

export class ArchiveController {
  private _client: SearchIndexClientInterface

  constructor(client: SearchIndexClientInterface) {
    this._client = client
  }

  public async Search(req: Request, res: Response) {
    try {
      const query = new Array<string>();
      const input = req.query

      Object.keys(input).forEach(i => {
        if (Array.isArray(input[i])) {
          const asArray = input[i] as string[]
          const arrayFilter = asArray.map(value => i + ':' + value)
          
          query.push('(' + arrayFilter.join(' OR ') + ')')
        }

        if (typeof input[i] === 'string') {
          query.push('(' + i + ':' + input[i] + ')')
        }
      })

      const queryString = query.length ? query.join(' AND ') : "*"
      const results = await this._client.searchIndex('archive', queryString)
      
      res.status(200).send({ code: 200, data: results })
    } catch (e) {
      console.error(e)
      res.status(500).send({ code: 500, message: 'Unable to fetch Archive search results' })
    }
  }
}
