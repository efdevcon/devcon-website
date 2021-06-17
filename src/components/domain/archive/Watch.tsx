import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import IconSearch from 'src/assets/icons/search.svg'
import css from './watch.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { Video } from './playlists'
import { InputForm } from 'src/components/common/input-form'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import IconGrid from 'src/assets/icons/grid.svg'
import IconListView from 'src/assets/icons/list-view.svg'
import { VideoFilter, useVideoFilter, VideoFilterMobile } from './watch/VideoFilter'
import { useArchiveVideos } from 'src/hooks/useArchiveVideos'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

type WatchProps = {}

export const Watch = (props: WatchProps) => {
  const videos = useArchiveVideos()
  const [listViewEnabled, setListViewEnabled] = React.useState(false)
  const filterState = useVideoFilter()
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
      <Header />

      <PageHero title="Watch" titleSubtext="Devcon" />

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
                    onClick={() => setListViewEnabled(false)}
                    className={`${listViewEnabled ? css['active'] : ''} icon`}
                  />
                  <IconListView
                    onClick={() => setListViewEnabled(true)}
                    className={`${listViewEnabled ? '' : css['active']} icon`}
                  />
                </div>
              </div>

              <div className={`${listViewEnabled ? css['list-view'] : ''} ${css['video-list']}`}>
                {videos.map((i: ArchiveVideo, index: number) => {
                  return <Video key={index} horizontal={listViewEnabled} video={i} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
