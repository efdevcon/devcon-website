import { Client } from '@elastic/elasticsearch'
import { existsSync } from 'fs';

export interface SearchIndexClientInterface {
    createIndex(name: string): void
    searchIndex(index: string, query: string): Promise<any[]>
    addToIndex<T>(index: string, doc: T, refresh: boolean): void
    deleteIndex(name: string): void
}

const endpoint = 'https://elastic:6phGD1Y7uH6JE4N4lrP4MeYG@memory-optimized-deployment-985249.es.us-east-1.aws.found.io:9243'
const defaultIndex = 'my-test-index'

export class SearchIndexClient implements SearchIndexClientInterface {
    private elasticClient: any;

    constructor() {
        this.elasticClient = new Client({ node: endpoint })
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

        const result = await this.elasticClient.search({
            index: index,
            body: {
              query: {
                match: {
                    name: query
                }
              }
            }
        })
        if (result.statusCode !== 200) { 
            console.log(`Search query '${query}' on ${index} index failed..`)
            return []
        }

        return result.body.hits.hits
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