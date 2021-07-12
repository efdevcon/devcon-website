import React from 'react'
import IconFilter from 'src/assets/icons/filter.svg'
import IconClose from 'src/assets/icons/cross.svg'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import { Filter, useFilter } from 'src/components/common/filter'
import css from './video-filter.module.scss'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

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
  const initialFilters = React.useMemo((): any => {
    return queryStringToFilterState(location.search)
  }, [])

  const [_, editionFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    initialFilter: initialFilters.edition,
    filters: [
      {
        text: '0',
        value: '0',
      },
      {
        text: '1',
        value: '1',
      },
      {
        text: '2',
        value: '2',
      },
      {
        text: '3',
        value: '3',
      },
      {
        text: '4',
        value: '4',
      },
      {
        text: '5',
        value: '5',
      },
    ],
    filterFunction: () => [],
  })

  const [__, expertiseFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    initialFilter: initialFilters.expertise,
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
    initialFilter: initialFilters.tags,
    filters: [
      {
        text: 'Society and Systems',
        value: 'Society and Systems',
      },
      {
        text: 'Scalability',
        value: 'Scalability',
      },
      {
        text: 'UX & Design',
        value: 'UX & Design',
      },
      {
        text: 'Security',
        value: 'Security',
      },
      {
        text: 'Cryptography',
        value: 'Cryptography',
      },
      {
        text: 'Community',
        value: 'Community',
      },
      {
        text: 'Economics',
        value: 'Economics',
      },
      {
        text: 'Standards',
        value: 'Standards',
      },
      {
        text: 'Privacy',
        value: 'Privacy',
      },
      {
        text: 'Consensus Layer',
        value: 'Consensus Layer',
      },
      {
        text: 'Application Layer',
        value: 'Application Layer',
      },
    ],
    filterFunction: () => [],
  })

  const editionFilter = editionFilterState && Object.keys(editionFilterState.activeFilter)
  const expertiseFilter = expertiseFilterState && Object.keys(expertiseFilterState.activeFilter)
  const tagsFilter = tagsFilterState && Object.keys(tagsFilterState.activeFilter)


  const clearFilters = () => {
    editionFilterState?.clearFilter()
    expertiseFilterState?.clearFilter()
    tagsFilterState?.clearFilter()
  }

  const combinedFilter = (() => {
    // Finish this one later - the combined filter will change depending on the filtering solution (e.g. inline JS vs query a search service)
    // For now just doing a boolean to test the clear all functionality
    return [editionFilter, expertiseFilter, tagsFilter].some(filter => filter && filter.length > 0)
  })()

  return { clearFilters, combinedFilter, editionFilterState, expertiseFilterState, tagsFilterState }
}

const Filters = (props: any) => {
  const { clearFilters, combinedFilter, editionFilterState, expertiseFilterState, tagsFilterState } = props

  return (
    <>
      <div className={css['devcon']}>
        <p className="bold font-xs text-uppercase">Devcon:</p>
        <Filter {...editionFilterState} />
      </div>

      <div className={css['expertise']}>
        <p className="bold font-xs text-uppercase">Expertise:</p>
        <Filter {...expertiseFilterState} />
      </div>

      <div className={css['tags']}>
        <p className="bold font-xs text-uppercase">Tags:</p>
        <Filter {...tagsFilterState} />

        <div className={css['clear-container']}>
          {props.mobile && (
            <button className="red bold" onClick={() => props.setOpen(false)}>
              <span>Continue</span> <IconArrowRight />
            </button>
          )}

          <p
            className={`${combinedFilter ? css['open'] : ''} ${css['clear']} bold text-underline`}
            onClick={clearFilters}
          >
            Clear All
          </p>
        </div>
      </div>
    </>
  )
}

export const VideoFilter = (props: any) => {
  return (
    <div className={css['filter']}>
      <div className={css['header']}>
        <h4 className="title">Filter</h4>
        <button>
          <IconFilter />
        </button>
      </div>

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
      <div className="content">
        <div className={css['header']}>
          <h4 className="title">Filter</h4>
          <button onClick={() => setOpen(!open)}>
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
