import React, { useState } from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import IconSearch from 'src/assets/icons/search.svg'
import css from './watch.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { VideoCard } from './playlists'
import { InputForm } from 'src/components/common/input-form'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import IconGrid from 'src/assets/icons/grid.svg'
import IconListView from 'src/assets/icons/list-view.svg'
import { VideoFilter, useVideoFilter, VideoFilterMobile } from './watch/VideoFilter'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { useEffect } from 'react'
import { useArchiveSearch } from 'src/hooks/useArchiveSearch'
import { Pagination } from 'src/components/common/pagination'
import { useQueryStringer } from 'src/hooks/useQueryStringer'
import { useLocation } from '@reach/router'

type WatchProps = {}

/*
  Problem: Changing filter via page navigation (in the page header) updates the query string used by our filters, causing our filters to be out of sync - you could try to do a 2-way sync, 
  but it makes the component much more complex
  Solution: Whenever location.search changes, swap out the entire component by using React keys - this will remount/reset the filters whenever the location changes as a result of a page 
  navigation, but won't affect window.history.replaceState updates to the query string (which is what the filter uses to resync the url)
*/
const resetOnPageNavigationHOC = (WatchComponent: React.ComponentType<WatchProps>) => {
  return (props: WatchProps) => {
    const location = useLocation()

    return <WatchComponent key={location.search} {...props} />
  }
}

export const Watch = resetOnPageNavigationHOC((props: WatchProps) => {
  const [gridViewEnabled, setGridViewEnabled] = React.useState(true)
  const [from, setFrom] = useState(0)
  const defaultPageSize = 12
  const filterState = useVideoFilter()
  const sortState = useSort(
    [],
    [
      {
        title: 'Event',
        key: 'edition',
        sort: SortVariation.basic,
      },
      {
        title: 'Alphabetical',
        key: 'title',
        sort: SortVariation.basic,
      },
      {
        title: 'Duration',
        key: 'duration',
        sort: SortVariation.date,
      },
    ],
    false
  )

  const qs = useQueryStringer(
    {
      edition: filterState.editionFilterState?.activeFilter,
      tags: filterState.tagsFilterState?.activeFilter,
      expertise: filterState.expertiseFilterState?.activeFilter,
      sort: sortState.fields[sortState.sortBy].key,
      order: sortState.sortDirection,
    },
    true
  )

  const { data, isLoading, isError } = useArchiveSearch(qs, { from: from, size: defaultPageSize })

  // Reset pagination on filter change
  useEffect(() => {
    setFrom(0)
  }, [
    filterState.editionFilterState?.activeFilter,
    filterState.tagsFilterState?.activeFilter,
    filterState.expertiseFilterState?.activeFilter,
    sortState.fields[sortState.sortBy].key,
    sortState.sortDirection,
  ])

  function onSelectPagination(nr: number) {
    const from = (nr - 1) * defaultPageSize
    setFrom(from)
  }

  return (
    <div className={css['container']}>
      <SEO />
      <Header withStrip />

      <PageHero
        title="Watch"
        titleSubtext="Devcon"
        description="Devcon content curated and organized for your discovery and learning."
      />

      <div className="section">
        <div className="content">
          <div className={css['search-sort']}>
            <InputForm className={css['search']} placeholder="Search" icon={IconSearch} />
            <div className={css['sort']}>
              <Sort {...sortState} />
            </div>
          </div>
        </div>
      </div>

      <VideoFilterMobile {...filterState} />

      <div className="section">
        <div className="content">
          <div className={`${css['content']}`}>
            <VideoFilter {...filterState} />

            <div className={`${css['sort']} ${css['mobile']}`}>
              <Sort {...sortState} />
            </div>

            <div className={css['videos']}>
              <div className={css['header']}>
                <h4 className="title">Videos</h4>

                <div className={css['view-toggle']}>
                  <IconGrid
                    onClick={() => setGridViewEnabled(true)}
                    className={`${gridViewEnabled ? '' : css['faded']} icon`}
                  />
                  <IconListView
                    onClick={() => setGridViewEnabled(false)}
                    className={`${gridViewEnabled ? css['faded'] : ''} icon`}
                  />
                </div>
              </div>

              {isLoading && <div>Loading results..</div>}
              {isError && <div>Unable to fetch videos..</div>}

              {data && data.items && (
                <>
                  <div className={`${gridViewEnabled ? '' : css['list-view']} ${css['video-list']}`}>
                    {data.items.map((i: ArchiveVideo, index: number) => {
                      return <VideoCard key={index} horizontal={!gridViewEnabled} video={i} />
                    })}
                  </div>

                  <div className={`${css['video-list']} ${css['mobile']}`}>
                    {data.items.map((i: ArchiveVideo, index: number) => {
                      return <VideoCard key={index} horizontal vertical={index === 0} video={i} />
                    })}
                  </div>

                  {data.total > data.items.length && (
                    <div className={css['footer']}>
                      <Pagination
                        itemsPerPage={defaultPageSize}
                        totalItems={data.total}
                        selectedPage={data.currentPage}
                        onSelectPage={onSelectPagination}
                        truncate={true}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})
