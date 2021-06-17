import React from 'react'
import IconFilter from 'src/assets/icons/filter.svg'
import IconClose from 'src/assets/icons/cross.svg'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import { Filter, useFilter } from 'src/components/common/filter'
import css from './video-filter.module.scss'

export const useVideoFilter = () => {
  const [filteredDevcon, devconFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: [
      {
        text: '0',
        value: 'zero',
      },
      {
        text: '1',
        value: 'all',
      },
      {
        text: '2',
        value: 'draft',
      },
      {
        text: '3',
        value: 'accepted',
      },
      {
        text: '4',
        value: 'withdrawn',
      },
      {
        text: '5',
        value: 'not implemented',
      },
    ],
    filterFunction: activeFilters => {
      return []
    },
  })

  const [filteredExpertise, expertiseFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: [
      {
        text: 'Beginner',
        value: 'all',
      },
      {
        text: 'Intermediate',
        value: 'draft',
      },
      {
        text: 'Expert',
        value: 'accepted',
      },
    ],
    filterFunction: activeFilters => {
      return []
    },
  })

  const [filteredTags, tagsFilterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: [
      {
        text: 'All',
        value: 'all',
      },
      {
        text: 'Draft',
        value: 'draft',
      },
      {
        text: 'Accepted',
        value: 'accepted',
      },
      {
        text: 'Withdrawn',
        value: 'withdrawn',
      },
      {
        text: 'Not Implemented',
        value: 'not implemented',
      },
    ],
    filterFunction: activeFilters => {
      return []
    },
  })

  const devconFilter = devconFilterState && Object.keys(devconFilterState.activeFilter)
  const expertiseFilter = expertiseFilterState && Object.keys(expertiseFilterState.activeFilter)
  const tagsFilter = tagsFilterState && Object.keys(tagsFilterState.activeFilter)

  const combinedFilter = (() => {
    // Finish this one later - the combined filter will change depending on the filtering solution (e.g. inline JS vs query a search service)
    // For now just doing a boolean to test the clear all functionality
    return [devconFilter, expertiseFilter, tagsFilter].some(filter => filter && filter.length > 0)
  })()

  const clearFilters = () => {
    devconFilterState?.clearFilter()
    expertiseFilterState?.clearFilter()
    tagsFilterState?.clearFilter()
  }

  return { clearFilters, combinedFilter, devconFilterState, expertiseFilterState, tagsFilterState }
}

const Filters = (props: any) => {
  const { clearFilters, combinedFilter, devconFilterState, expertiseFilterState, tagsFilterState } = props

  return (
    <>
      <div className={css['devcon']}>
        <p className="bold font-xs text-uppercase">Devcon:</p>
        <Filter {...devconFilterState} />
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
            <button className="red lg bold" onClick={() => props.setOpen(false)}>
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
  const [open, setOpen] = React.useState(false)

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
