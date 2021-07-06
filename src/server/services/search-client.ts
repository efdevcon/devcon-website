import { Client } from '@elastic/elasticsearch'
import { SERVER_CONFIG } from '../config/server';
require('dotenv').config()

export interface SearchIndexClientInterface {
    createIndex(name: string): void
    searchIndex(index: string, query: string): Promise<any[]>
    addToIndex<T>(index: string, doc: T, refresh: boolean): void
    deleteIndex(name: string): void
}

export class SearchIndexClient implements SearchIndexClientInterface {
    private elasticClient: any;

    constructor() {
        this.elasticClient = new Client({ node: SERVER_CONFIG.ELASTIC_ENDPOINT })
    }

    async createIndex(name: string) {
        const exists = await this.elasticClient.indices.exists({ index: name })
        if (exists.body) { 
            console.log(`Index ${name} already exists..`)
            return
        }

        await this.elasticClient.indices.create({ index: name })
    }

    async searchIndex(index: string, query: string): Promise<any[]> {
        const exists = await this.elasticClient.indices.exists({ index: index })
        if (!exists.body) { 
            console.log(`Index ${index} doesn't exists..`)
            return []
        }

        console.log('Searching Elastic index with query', query)
        const result = await this.elasticClient.search({
            index: index,
            size: 100,
            body: {
              query: {
                query_string: {
                  query: query,
                }
              }
            }
        })
        
        if (result.statusCode !== 200) { 
            console.log(`Search query '${query}' on ${index} index failed..`)
            return []
        }

        return result.body.hits.hits.map((i: any) => i._source)
    }

    async addToIndex<T>(index: string, body: T, refresh: boolean = false) {
        const exists = await this.elasticClient.indices.exists({ index: index })
        if (!exists.body) { 
            console.log(`Index ${index} doesn't exists..`)
            return
        }

        await this.elasticClient.index({
            index: index,
            refresh: refresh,
            body: body
        })
    }

    async deleteIndex(name: string) {
        const exists = await this.elasticClient.indices.exists({ index: name })
        if (!exists.body) { 
            console.log(`Index ${name} doesn't exists..`)
            return
        }

        await this.elasticClient.indices.delete({ index: name })
    }
}