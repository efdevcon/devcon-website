import { SearchIndexClient } from './search-client';

test('Init search index client', () => {
    const client = new SearchIndexClient()
    
    expect(client).not.toBeNull()
});

test('Create "test" index', async () => {
    const client = new SearchIndexClient()

    await client.createIndex('test-index')
});

test('Try and create the same "test" index twice', async () => {
    const client = new SearchIndexClient()

    await client.createIndex('test-index')
    await client.createIndex('test-index')
});

test('Try delete not-existing index', async () => {
    const client = new SearchIndexClient()

    await client.deleteIndex('not-existing-index')
});

test('Delete created "test" indexes', async () => {
    const client = new SearchIndexClient()

    await client.deleteIndex('test')
    await client.deleteIndex('test-index')
    await client.deleteIndex('not-existing-index')
});

test('Index doc to not-existing index', async () => {
    const client = new SearchIndexClient()

    await client.addToIndex('not-existing-index', { test: 'document'})
});

test('Create "create-and-index" and add test document', async () => {
    const client = new SearchIndexClient()
    const indexName = 'create-and-index'

    await client.createIndex(indexName)
    await client.addToIndex(indexName, { test: 'document'})
});

test('Delete "create-and-index" with test document', async () => {
    const client = new SearchIndexClient()
    const indexName = 'create-and-index'

    await client.deleteIndex(indexName)
});

test('Create "game-of-thrones", index and query', async () => {
    const client = new SearchIndexClient()
    const indexName = 'game-of-thrones'

    await client.createIndex(indexName)
    await client.addToIndex(indexName, { name: 'Ned Stark' }, false)
    await client.addToIndex(indexName, { name: 'Jon Snow' }, false)
    await client.addToIndex(indexName, { name: 'Daenerys Targaryen' }, false)
    await client.addToIndex(indexName, { name: 'Tyrion Lannister' }, true)
    
    const results = await client.searchIndex(indexName, 'name:snow')
    expect(results).toHaveLength(1)
});

test('Delete "game-of-thrones" index', async () => {
    const client = new SearchIndexClient()
    const indexName = 'game-of-thrones'

    await client.deleteIndex(indexName)
});