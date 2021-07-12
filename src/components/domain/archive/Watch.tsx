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
import { VideoFilter, useVideoFilter, VideoFilterMobile, filterToQueryString } from './watch/VideoFilter'
import { useArchiveVideos } from 'src/hooks/useArchiveVideos'
import { useLocation } from '@reach/router'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { useEffect } from 'react'

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
  // const videos = useArchiveVideos()
  const [videos, setVideos] = useState([])
  const [gridViewEnabled, setGridViewEnabled] = React.useState(true)
  const filterState = useVideoFilter()

  useEffect(() => {
    const qs = filterToQueryString({
      edition: filterState.editionFilterState?.activeFilter,
      tags: filterState.tagsFilterState?.activeFilter,
      expertise: filterState.expertiseFilterState?.activeFilter,
    })

    searchVideos(qs)

    async function searchVideos(qs: string) {
      const response = await fetch('/api/archive/search' + qs, {
        method: 'GET',
      })

      if (response.status === 200) {
        const body = await response.json()
        setVideos(body.data)
      }
    }
  }, [
    filterState.editionFilterState?.activeFilter,
    filterState.tagsFilterState?.activeFilter,
    filterState.expertiseFilterState?.activeFilter,
  ])

  const sortState = useSort(videos, [
    {
      title: 'Event',
      key: 'event',
      sort: SortVariation.basic,
    },
    {
      title: 'Alphabetical',
      key: 'title',
      sort: SortVariation.basic,
    },
    {
      title: 'Plays',
      key: 'views',
      sort: SortVariation.number,
    },
    {
      title: 'Duration',
      key: 'duration',
      sort: SortVariation.date,
    },
  ])

  // const sortedBy = sortState.fields[sortState.sortBy].key
  // sortState.sortedData.forEach(item => console.log(item.title))
  // console.log(sortedBy, 'sorted by')

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

              <div className={`${gridViewEnabled ? '' : css['list-view']} ${css['video-list']}`}>
                {videos.map((i: ArchiveVideo, index: number) => {
                  return <VideoCard key={index} horizontal={!gridViewEnabled} video={i} />
                })}
              </div>

              <div className={`${css['video-list']} ${css['mobile']}`}>
                {videos.map((i: ArchiveVideo, index: number) => {
                  return <VideoCard key={index} horizontal vertical={index === 0} video={i} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
})
