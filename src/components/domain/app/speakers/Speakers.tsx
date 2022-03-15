import React from 'react'
import css from './speakers.module.scss'
import IconStar from 'assets/icons/star.svg'
import IconStarFill from 'assets/icons/star-fill.svg'
import IconSearch from 'assets/icons/search.svg'
import thumbnailPlaceholder from 'assets/images/thumbnail-placeholder.png'
import { Link } from 'components/common/link'
import {
  CollapsedSection,
  CollapsedSectionHeader,
  CollapsedSectionContent,
} from 'components/common/collapsed-section'
import { Speaker as SpeakerType } from 'types/Speaker'
import { useSort, SortVariation, Sort } from 'components/common/sort'
import { NoResults, useFilter } from 'components/common/filter'
import { AppSearch } from 'components/domain/app/app-search'
import { useAccountContext } from 'context/account-context'
import Image from 'next/image'
import makeBlockie from 'ethereum-blockies-base64'
import moment from 'moment'

type CardProps = {
  speaker: SpeakerType
}

export const SpeakerCard = ({ speaker }: CardProps) => {
  // const { account, setSpeakerFavorite } = useAccountContext()
  // const favoritedSpeakers = account?.appState?.favoritedSpeakers
  // const isSpeakerFavorited = favoritedSpeakers?.[speaker.id]

  const iconProps = {
    className: css['favorite'],
    onClick: (e: React.SyntheticEvent) => {
      e.preventDefault()
      // setSpeakerFavorite(speaker.id, !!isSpeakerFavorited)
    },
  }

  return (
    <Link to={`/app/speakers/${speaker.id}`} className={css['speaker-card']}>
      <>
        <div className={css['thumbnail']}>
          <div className={css['wrapper']}>
            <Image src={speaker.avatar || makeBlockie(speaker.name)} alt={speaker.name} objectFit='contain' layout='fill' />
          </div>
        </div>
        <div className={css['details']}>
          <p className={css['name']}>{speaker.name}</p>
          <p className={css['role']}>{speaker.role}</p>
          <p className={css['company']}>{speaker.company}</p>
        </div>

        {false ? <IconStarFill {...iconProps} /> : <IconStar {...iconProps} />}
      </>
    </Link>
  )
}

type ListProps = {
  speakers: [SpeakerType]
  tracks?: string[]
  days?: number[]
}

const ListTrackSort = (props: ListProps) => {
  const [activeTrack, setActiveTrack] = React.useState(props.tracks && props.tracks.length > 0 ? props.tracks[0] : '')

  return (
    <div className={`${css['list-container']} ${css['track-sort']}`}>
      {props.tracks && props.tracks.map((track) => {

        return (
          <CollapsedSection
            open={track === activeTrack}
            setOpen={() => track === activeTrack ? setActiveTrack('') : setActiveTrack(track)}>
            <CollapsedSectionHeader title={track} />
            <CollapsedSectionContent dontAnimate>
              {props.speakers.filter(i => i.tracks?.some(t => t === track)).map(speaker => {
                return <SpeakerCard key={speaker.name} speaker={speaker} />
              })}
            </CollapsedSectionContent>
          </CollapsedSection>
        )
      })}
    </div>
  )
}

const ListDaySort = (props: ListProps) => {
  const [activeDay, setActiveDay] = React.useState(props.days && props.days.length > 0 ? props.days[0] : 0)

  return (
    <div className={`${css['list-container']} ${css['day-sort']}`}>
      {props.days && props.days.map((day, index) => {
        return (
          <CollapsedSection
            open={day === activeDay}
            setOpen={() => day === activeDay ? setActiveDay(0) : setActiveDay(day)}>
            <CollapsedSectionHeader title={`${moment(day).format('MMMM DD, YYYY')} - Day ${index + 1}`} />
            <CollapsedSectionContent dontAnimate>
              {props.speakers.filter(i => i.eventDays?.some(d => d === day)).map(speaker => {
                return <SpeakerCard key={speaker.name} speaker={speaker} />
              })}
            </CollapsedSectionContent>
          </CollapsedSection>
        )
      })}
    </div>
  )
}

const ListAlphabeticalSort = (props: ListProps) => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const alphabet = alpha.map(x => String.fromCharCode(x))
  const [selectedLetter, setSelectedLetter] = React.useState(alphabet[0])

  return (
    <div className={`${css['list-container']} ${css['alphabet-sort']}`}>
      <p className="bold">{selectedLetter}</p>

      <div className={css['speakers-letters']}>
        <div className={css['speakers']}>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </div>

        <div className={css['letters']}>
          {alphabet.map(letter => {
            let className = 'plain'

            if (letter === selectedLetter) className += ` ${css['selected']}`

            return (
              <button key={letter} className={className} onClick={() => setSelectedLetter(letter)}>
                {letter}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Speakers = (props: any) => {
  const trackFilters = props.tracks
  const [search, setSearch] = React.useState('')
  const [speakers, filterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: trackFilters.map((i: string) => {
      return {
        text: i,
        value: i,
      }
    }),
    filterFunction: (activeFilter: any) => {
      if (!activeFilter || Object.keys(activeFilter).length === 0) return props.speakers

      const filters = Object.keys(activeFilter)
      return props.speakers.filter((i: any) => i.tracks?.some((x: any) => filters.some(y => x === y) && activeFilter[x]))
    },
  })

  const sortState = useSort(
    [],
    [
      {
        title: 'Alphabetical',
        key: 'name',
        sort: SortVariation.basic,
      },
      {
        title: 'Schedule',
        key: 'days',
        sort: SortVariation.basic,
      },
      {
        title: 'Tracks',
        key: 'tracks',
        sort: SortVariation.date,
      },
    ],
    false,
    'desc'
  )

  const sortedBy = sortState.fields[sortState.sortBy]
  const noResults = speakers.length === 0

  return (
    <div>
      <div className="section">
        <div className="content">
          <AppSearch
            search={{
              placeholder: 'Search speakers...',
              onChange: setSearch,
            }}
            sortState={sortState}
            filterStates={[
              { title: 'Track', filterState },
            ]}
          />

          {noResults ? (
            <NoResults />
          ) : (
            <>
              {sortedBy.key === 'name' && <ListAlphabeticalSort speakers={speakers as [SpeakerType]} />}
              {sortedBy.key === 'tracks' && <ListTrackSort speakers={speakers as [SpeakerType]} tracks={props.tracks} />}
              {sortedBy.key === 'days' && <ListDaySort speakers={speakers as [SpeakerType]} days={props.eventDays} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
