import React, { useState } from 'react'
import css from './speakers.module.scss'
import IconStar from 'assets/icons/star.svg'
import IconStarFill from 'assets/icons/star-fill.svg'
import { Link } from 'components/common/link'
import { CollapsedSection, CollapsedSectionHeader, CollapsedSectionContent } from 'components/common/collapsed-section'
import { Speaker, Speaker as SpeakerType } from 'types/Speaker'
import { useSort, SortVariation, Sort } from 'components/common/sort'
import { NoResults, useFilter } from 'components/common/filter'
import { AppSearch } from 'components/domain/app/app-search'
import { Search, Tags, Basic, FilterFoldout } from 'components/common/filter/Filter'
import { useAccountContext } from 'context/account-context'
import Image from 'next/image'
import Star from 'assets/icons/star.svg'
import StarFill from 'assets/icons/star-fill.svg'
import makeBlockie from 'ethereum-blockies-base64'
import moment from 'moment'
import { AppNav } from 'components/domain/app/navigation'
import FuzzySearch from 'fuzzy-search'
import filterCss from 'components/domain/app/app-filter.module.scss'
import SwipeToScroll from 'components/common/swipe-to-scroll'

type CardProps = {
  speaker: SpeakerType
}

export const SpeakerCard = ({ speaker }: CardProps) => {
  const { account, setSpeakerFavorite } = useAccountContext()
  const isSpeakerFavorited = account?.appState?.speakers?.some(i => i === speaker.id)

  const iconProps = {
    className: `${css['favorite']} icon ${isSpeakerFavorited ? css['favorited'] : ''}`,
    onClick: (e: React.SyntheticEvent) => {
      e.preventDefault()
      if (account) {
        setSpeakerFavorite(account, speaker.id, !!isSpeakerFavorited)
      }
    },
  }

  let className = css['speaker-card']

  if (isSpeakerFavorited) className += ` ${css['favorited']}`

  return (
    <Link to={`/app/speakers/${speaker.id}`} className={className}>
      <>
        <div className={css['thumbnail']}>
          <div className={css['wrapper']}>
            <Image
              src={speaker.avatar || makeBlockie(speaker.name)}
              alt={speaker.name}
              objectFit="contain"
              layout="fill"
            />
          </div>
        </div>

        <div className={css['details']}>
          <p className={css['name']}>{speaker.name}</p>
          <p className={css['role']}>{speaker.role}</p>
          <p className={css['company']}>{speaker.company}</p>
        </div>

        {account && (
          <div className={css['icon']}>
            {isSpeakerFavorited ? <IconStarFill {...iconProps} /> : <IconStar {...iconProps} />}
          </div>
        )}
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
      {props.tracks &&
        props.tracks.map(track => {
          return (
            <CollapsedSection
              key={track}
              open={track === activeTrack}
              setOpen={() => (track === activeTrack ? setActiveTrack('') : setActiveTrack(track))}
            >
              <CollapsedSectionHeader title={track} />
              <CollapsedSectionContent dontAnimate>
                {props.speakers
                  .filter(i => i.tracks?.some(t => t === track))
                  .map(speaker => {
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
      {props.days &&
        props.days.map((day, index) => {
          const hasPassed = moment.utc().isAfter(moment(day))
          return (
            <CollapsedSection
              key={day}
              open={day === activeDay}
              setOpen={() => (day === activeDay ? setActiveDay(0) : setActiveDay(day))}
            >
              <CollapsedSectionHeader title={`${moment(day).format('MMMM DD, YYYY')} - Day ${index + 1}`} />

              {hasPassed ? <p className={css['past']}>Previously Scheduled</p> : <></>}

              <CollapsedSectionContent dontAnimate>
                {props.speakers
                  .filter(i => i.eventDays?.some(d => d === day))
                  .map(speaker => {
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
  const [selectedLetter, setSelectedLetter] = React.useState('A')
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const alphabet = alpha.map(x => String.fromCharCode(x))

  return (
    <div className={`${css['list-container']} ${css['alphabet-sort']}`}>
      <div className={css['speakers-letters']}>
        <div className={css['speakers']}>
          {alphabet.map(letter => {
            if (letter !== selectedLetter) return null

            const speakersByLetter = props.speakers.filter(i => i.name.charAt(0) === letter)
            if (speakersByLetter.length === 0) return null

            return (
              <div key={letter} id={`speakers-${letter}`}>
                <p className="bold">{letter}</p>
                {speakersByLetter.map(speaker => {
                  return <SpeakerCard key={speaker.id} speaker={speaker} />
                })}
              </div>
            )
          })}
        </div>

        <div className={css['letters']}>
          {alphabet.map(letter => {
            const letterHasSpeakers = props.speakers.some(i => i.name.charAt(0) === letter)
            const selected = letter === selectedLetter
            let className = `plain`

            if (selected) className += ` ${css['selected']}`
            // if (!letterHasSpeakers) className += ` ${css['disabled']}`
            if (!letterHasSpeakers) return null

            // if (letterHasSpeakers) {
            //   return (
            //     <a key={letter} className={`plain ${css['selected']}`} /*href={`#speakers-${letter}`}*/>
            //       {letter}
            //     </a>
            //   )
            // }

            return (
              <span
                key={letter}
                className={className}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (letterHasSpeakers) {
                    setSelectedLetter(letter)
                  }
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Speakers = (props: any) => {
  const { account } = useAccountContext()
  const [search, setSearch] = React.useState('')
  const [favoritesOnly, setFavoritesOnly] = React.useState(false)
  const [selectedTracks, setSelectedTracks] = React.useState({} as any)
  const searcher = React.useMemo(
    () => new FuzzySearch(props.speakers, ['name', 'tracks.name', 'description', 'company']),
    [props.speakers]
  )
  const favoritedSpeakers = account?.appState?.speakers
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

  const speakersMatchingSearch = search.length > 0 ? searcher.search(search) : props.speakers

  const speakers = speakersMatchingSearch.filter((speaker: Speaker) => {
    // Filter by interested
    if (favoritesOnly) {
      const favoritedSpeaker = favoritedSpeakers?.find(favoritedSpeaker => favoritedSpeaker === speaker.id)

      if (!favoritedSpeaker) return false
    }

    const tracks = Object.keys(selectedTracks)
    const thereAreTracksToFilterBy = tracks.length > 0

    if (thereAreTracksToFilterBy) {
      const match = speaker.tracks?.some((track: any) => selectedTracks[track])

      if (!match) return false
    }

    return true
  })

  const sortedSpeakers =
    sortState.sortDirection === 'asc'
      ? speakers.sort((a: Speaker, b: Speaker) => a.name.localeCompare(b.name))
      : speakers.sort((a: Speaker, b: Speaker) => b.name.localeCompare(a.name))

  const sortedBy = sortState.fields[sortState.sortBy]
  const noResults = speakers.length === 0

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Speakers',
            to: '/app/speakers',
          },
        ]}
        renderRight={() => {
          const starProps = {
            onClick: () => setFavoritesOnly(!favoritesOnly),
            style: {
              cursor: 'pointer',
            },
          }

          if (favoritesOnly) {
            return <StarFill {...starProps} className="icon fill-red" />
          } else {
            return <Star {...starProps} />
          }
        }}
      />

      <div className={filterCss['filter']}>
        <div className="section">
          <Search placeholder="Find a speaker" value={search} onChange={setSearch} />

          <div className={`${filterCss['foldout']} ${css['foldout-overrides']}`}>
            <FilterFoldout active={Object.keys(selectedTracks).length > 0}>
              {(open, setOpen) => {
                return (
                  <div className={filterCss['foldout-content']}>
                    <div className={filterCss['tracks']}>
                      <Tags
                        value={selectedTracks}
                        onChange={nextValue => {
                          const isAlreadySelected = selectedTracks[nextValue]

                          const nextState = {
                            ...selectedTracks,
                          }

                          if (isAlreadySelected) {
                            delete nextState[nextValue]
                          } else {
                            nextState[nextValue] = true
                          }

                          setSelectedTracks(nextState)
                        }}
                        options={props.tracks.map((i: string) => {
                          return {
                            text: i,
                            value: i,
                          }
                        })}
                      />
                    </div>

                    <div className={filterCss['actions']}>
                      <button className={`app hover sm thin-borders`} onClick={() => setSelectedTracks({})}>
                        Reset
                      </button>

                      <button className={`app hover sm thin-borders`} onClick={() => setOpen(false)}>
                        Confirm
                      </button>
                    </div>
                  </div>
                )
              }}
            </FilterFoldout>

            <div data-type="right" className={`${filterCss['right']} ${css['tracks']}`}>
              <div>
                <p className="font-xs-fixed">Current Filter:</p>
                <p className={filterCss['filter-indicator']}>
                  {(() => {
                    const trackFilters = Object.keys(selectedTracks)

                    if (trackFilters.length === 0) return 'All tracks'

                    return trackFilters.join(', ')
                  })()}
                </p>
              </div>
            </div>
          </div>
          <div className="border-top">
            <Sort {...sortState} />
          </div>
        </div>
      </div>

      <div className="section">
        {noResults ? (
          <NoResults />
        ) : (
          <>
            {sortedBy.key === 'name' && <ListAlphabeticalSort speakers={sortedSpeakers as [SpeakerType]} />}
            {sortedBy.key === 'tracks' && (
              <ListTrackSort speakers={sortedSpeakers as [SpeakerType]} tracks={props.tracks} />
            )}
            {sortedBy.key === 'days' && (
              <ListDaySort speakers={sortedSpeakers as [SpeakerType]} days={props.eventDays} />
            )}
          </>
        )}
      </div>
    </>
  )
}
