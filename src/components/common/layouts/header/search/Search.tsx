import React, { useState } from 'react'
import { navigate } from "gatsby"
import { InputForm } from 'src/components/common/input-form'
import IconSearch from 'src/assets/icons/search.svg'
import css from './search.module.scss'
import { useQueryStringer } from 'src/hooks/useQueryStringer'
import { useArchiveSearch } from 'src/hooks/useArchiveSearch'
import { Link } from 'src/components/common/link'

export const Search = (props: any) => {
  let className = css['search-foldout']
  if (props.open) {
    className += ` ${css['open']}`
  }
  
  const [searchQuery, setSearchQuery] = useState('')
  const defaultPageSize = 6
  const qs = useQueryStringer({}, false)
  const { data, isLoading, isError } = useArchiveSearch(qs, { q: searchQuery, from: 0, size: defaultPageSize }, false)
  
  function onSearch() { 
    navigate(`/archive/watch?q=${searchQuery}`)
  }
  
  return (
    <div className={className}>
      <div className={`${css['content']}`}>
        <InputForm
          placeholder="Search for videos.."
          icon={IconSearch}
          className={css['search-input']}
          timeout={300}
          onChange={(e) => setSearchQuery(e)}
          onSubmit={onSearch}
          transparentMode
        />

        <div className={css['results']}>
          <p className="text-uppercase font-xs bold">Suggested</p>

          {isLoading && <p className={css['result']}>Loading results..</p>}
          {isError && <p className={css['result']}>Unable to fetch videos..</p>}
          {data?.items?.length === 0 && <p className={css['result']}>No videos found..</p>}

          {data && data.items && (
            <>
            {data.items.map((i) => {
              return ( 
                <Link to={i.slug} className={css['result']}>
                  <IconSearch />
                  <p>{i.title}</p>
                </Link>
              )
            })}
            </>
          )}
          {data && data.total > data.items.length && searchQuery && (
            <Link to={`/archive/watch?q=${searchQuery}`} className={`${css['result']} bold text-underline"`}>View all</Link>
          )}
        </div>
      </div>
    </div>
  )
}
