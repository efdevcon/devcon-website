import React from 'react'
import IconFilter from 'src/assets/icons/filter.svg'
import IconClose from 'src/assets/icons/cross.svg'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import { Filter, useFilter } from 'src/components/common/filter'
import css from './video-filter.module.scss'
import { useLocation } from '@reach/router'
import queryString from 'query-string'
import { usePageContext } from 'src/context/page-context'
import IconSearch from 'src/assets/icons/search.svg'
import { InputForm } from 'src/components/common/input-form'
import { Button } from 'src/components/common/button'

const queryStringToFilterState = (qs: string) => {
  // Extract params from query string
  const filters = queryString.parse(qs)

  // Format to fit filter state shape
  return Object.entries(filters).reduce((acc, [key, filter]: [any, any]) => {
    if (typeof filter === 'string') {
      acc[key] = {
        [filter]: true,
      }
    } else {
      acc[key] = filter?.reduce((acc: any, tag: any) => {
        acc[tag] = true

        return acc
      }, {})
    }

    return acc
  }, {})
}

export const useVideoFilter = () => {
  const location = useLocation()
  const pageContext = usePageContext()

  const nrOfEditions = 5
  const editionFilters = Array.from(Array(nrOfEditions + 1).keys()).sort((a, b) => b - a)
  const [_, editionFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: editionFilters.map(i => {
      return {
        text: i.toString(),
        value: i.toString(),
      }
    }),
    filterFunction: () => [],
  })

  const [__, expertiseFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: [
      {
        text: 'Beginner',
        value: 'beginner',
      },
      {
        text: 'Intermediate',
        value: 'intermediate',
      },
      {
        text: 'Expert',
        value: 'expert',
      },
    ],
    filterFunction: () => [],
  })

  const [___, tagsFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: pageContext.data.distinctVideoTags.map(tag => {
      return {
        text: tag,
        value: tag,
      }
    }),
    filterFunction: () => [],
  })

  const [____, searchFilterState] = useFilter({
    tags: false,
    multiSelect: false,
    filters: [],
    filterFunction: () => [],
  })

  // Sync filters with query string on mount
  React.useEffect(() => {
    const initialFilters = queryStringToFilterState(location.search)

    if (initialFilters.edition) editionFilterState?.setActiveFilter(initialFilters.edition, true)
    if (initialFilters.q) searchFilterState?.setActiveFilter(initialFilters.q, true)
    if (initialFilters.tags) tagsFilterState?.setActiveFilter(initialFilters.tags, true)
    if (initialFilters.expertise) expertiseFilterState?.setActiveFilter(initialFilters.expertise, true)
  }, [])

  const editionFilter = editionFilterState && Object.keys(editionFilterState.activeFilter)
  const expertiseFilter = expertiseFilterState && Object.keys(expertiseFilterState.activeFilter)
  const tagsFilter = tagsFilterState && Object.keys(tagsFilterState.activeFilter)

  const clearFilters = () => {
    editionFilterState?.clearFilter()
    expertiseFilterState?.clearFilter()
    tagsFilterState?.clearFilter()
    searchFilterState?.clearFilter()
  }

  const combinedFilter = (() => {
    // Finish this one later - the combined filter will change depending on the filtering solution (e.g. inline JS vs query a search service)
    // For now just doing a boolean to test the clear all functionality
    const filtersActive = [editionFilter, expertiseFilter, tagsFilter].some(filter => filter && filter.length > 0)
    const searchActive = !!searchFilterState?.activeFilter

    return filtersActive || searchActive
  })()

  return { clearFilters, combinedFilter, editionFilterState, expertiseFilterState, tagsFilterState, searchFilterState }
}

const Filters = (props: any) => {
  const { clearFilters, combinedFilter, editionFilterState, expertiseFilterState, tagsFilterState, searchFilterState } =
    props
  const initialSearchFilter = (): string => {
    if (typeof searchFilterState.activeFilter === 'string') {
      return searchFilterState.activeFilter
    }

    if (typeof searchFilterState.activeFilter === 'object') {
      const keys = Object.keys(searchFilterState.activeFilter)
      return keys[0]
    }

    return ''
  }

  return (
    <>
      <div className={css['search']}>
        <InputForm
          className={css['input-form']}
          placeholder="Search"
          icon={IconSearch}
          defaultValue={initialSearchFilter()}
          onChange={value => searchFilterState.setActiveFilter(value)}
          timeout={300}
        />
      </div>

      <div className={css['devcon']}>
        <p className="bold font-xs text-uppercase">Devcon:</p>
        <Filter {...editionFilterState} />
      </div>

      <div className={css['expertise']}>
        <p className="bold font-xs text-uppercase">Expertise:</p>
        <Filter {...expertiseFilterState} />
      </div>

      <div className={css['tags']}>
        <p className="bold font-xs text-uppercase">Categories:</p>
        <Filter {...tagsFilterState} />

        <div className={css['clear-container']}>
          {props.mobile && (
            <Button
              disabled={!combinedFilter}
              className={`${css['continue-button']} red bold`}
              onClick={() => document.getElementById('filter-sort')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className={css['text']}>Continue</span> <IconArrowRight className={`icon ${css['text-icon']}`} />
            </Button>
          )}

          {combinedFilter && (
            <p className={`${css['open']} ${css['clear']} bold text-underline`} onClick={clearFilters}>
              Clear All
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export const VideoFilter = (props: any) => {
  return (
    <div className={css['filter']}>
      <Filters {...props} />
    </div>
  )
}

export const VideoFilterMobile = (props: any) => {
  const [open, setOpen] = React.useState(props.combinedFilter)

  let className = `${css['mobile-filter']} section`

  if (open) className += ` ${css['open']}`

  return (
    <div className={className}>
      <div>
        <div className={css['header']}>
          <h4 className="title">Filter</h4>
          <button className="white" onClick={() => setOpen(!open)}>
            <IconFilter className={`icon ${css['icon-open']}`} />
            <IconClose className={`icon ${css['icon-close']}`} />
          </button>
        </div>

        <div className={css['filter-container']}>
          <Filters mobile setOpen={setOpen} {...props} />
        </div>
      </div>
    </div>
  )
}
