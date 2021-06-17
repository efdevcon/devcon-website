import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import IconFilter from 'src/assets/icons/filter.svg'
import IconSearch from 'src/assets/icons/search.svg'
import { Filter, useFilter } from 'src/components/common/filter'
import css from './watch.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { Video } from './playlists'
import { InputForm } from 'src/components/common/input-form'
import { useSort, SortVariation, SortButton, Sort } from 'src/components/common/sort'
import IconGrid from 'src/assets/icons/grid.svg'
import IconListView from 'src/assets/icons/list-view.svg'
import { useArchiveVideos } from 'src/hooks/useArchiveVideos'
import { ArchiveVideo } from 'src/types/ArchiveVideo'

type WatchProps = {}

const VideoFilter = (props: any) => {
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
      return props.items
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
      return props.items
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
      return props.items
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
      </div>

      {combinedFilter && <button onClick={clearFilters}>Clear X</button>}
    </>
  )
}

export const Watch = (props: WatchProps) => {
  const videos = useArchiveVideos()
  const [listViewEnabled, setListViewEnabled] = React.useState(false)
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

      <div className="section">
        <div className="content">
          <div className={`${css['content']}`}>
            <div className={css['filter']}>
              <div className={css['header']}>
                <h4 className="title">Filter</h4>
                <button>
                  <IconFilter />
                </button>
              </div>

              <VideoFilter />
            </div>

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
