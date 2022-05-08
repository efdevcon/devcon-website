import React, { useMemo } from 'react'
import Page from 'components/common/layouts/page'
import { pageHOC } from 'context/pageHOC'
import themes from './themes.module.scss'
// import { PageContentSection } from 'components/common/layouts/content/PageContentSection'
import { PageHero } from 'components/common/page-hero'
import { Link } from 'components/common/link'
import * as JsSearch from 'js-search'
import { InputForm } from 'components/common/input-form'
import { SearchItem } from 'types/SearchItem'
import { useRouter } from 'next/router'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'

export default pageHOC(function SearchTemplate({ pageContext }: any) {
  return <div>Search</div>
  const data = pageContext
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState((router.query['q'] as string) || '')
  const [results, setResults] = React.useState<Array<SearchItem>>([])

  const id = 'slug'
  const search = useMemo(() => {
    const search = new JsSearch.Search(id)
    search.tokenizer = new JsSearch.StopWordsTokenizer(new JsSearch.SimpleTokenizer())
    search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    search.sanitizer = new JsSearch.LowerCaseSanitizer()
    search.searchIndex = new JsSearch.TfIdfSearchIndex(id)
    return search
  }, [])

  search.addIndex('id')
  search.addIndex('title')
  search.addIndex('description')
  search.addIndex('body')
  search.addIndex('tags')
  search.addDocuments(data.allSearchData)

  React.useEffect(() => {
    const items = search.search(searchQuery) as Array<SearchItem>
    setResults(items)
  }, [search, searchQuery])

  function getUrl(i: any) {
    if (i.type === 'pages') {
      return i.slug
    }

    return `/${i.lang}/${i.type}/#${i.id}`
  }

  function onChange(value: string) {
    if (value) {
      setSearchQuery(value)
    }
  }

  return (
    <Page theme={themes['light-blue']}>
      <PageHero />

      <div className="section">
        <InputForm
          id="input-form_search_page"
          label={'Search'}
          onChange={onChange}
          placeholder="Search..."
          defaultValue={searchQuery}
        />

        <h2>Search Results</h2>
        {searchQuery}

        {results && results.length > 0 && (
          <ul>
            {results.map((i: any) => {
              return (
                <li key={i.slug}>
                  <Link to={getUrl(i)}>
                    {i.title} ({i.type})
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  // const page = await GetPage('/search', context.locale)

  return {
    props: {
      ...globalData,
      // page,
    },
  }
}
