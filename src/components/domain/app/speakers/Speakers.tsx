import React from 'react'
import css from './speakers.module.scss'
import IconStar from 'src/assets/icons/star.svg'
import IconStarFill from 'src/assets/icons/star-fill.svg'
import IconSearch from 'src/assets/icons/search.svg'
import thumbnailPlaceholder from 'src/assets/images/thumbnail-placeholder.png'
import { Link } from 'src/components/common/link'
import {
  CollapsedSection,
  CollapsedSectionHeader,
  CollapsedSectionContent,
} from 'src/components/common/collapsed-section'
import { Speaker as SpeakerType } from 'src/types/Speaker'
import { useSort, SortVariation, Sort } from 'src/components/common/sort'
import { InputForm } from 'src/components/common/input-form'
import { Filter, FilterFoldout, NoResults, useFilter } from 'src/components/common/filter'
import { Button } from 'src/components/common/button'

const dummySpeakers = [
  {
    name: 'Laqeel Jacobsen',
    role: 'Researcher',
    company: 'Ethereum Foundation',
    tracks: ['Three'],
  },
  {
    name: 'Lesley Jacobsen',
    role: 'Researcher',
    company: 'Ethereum Foundation',
    tracks: ['Two'],
  },
  {
    name: 'Lasse Jacobsen',
    role: 'Researcher',
    company: 'Ethereum Foundation',
    tracks: ['One'],
  },
] as [SpeakerType, SpeakerType, SpeakerType]

type CardProps = {
  speaker: SpeakerType
}

const SpeakerCard = ({ speaker }: CardProps) => {
  // Comes from props later
  const [favorited, setFavorited] = React.useState(false)

  const iconProps = {
    className: css['favorite'],
    onClick: () => setFavorited(!favorited),
  }

  return (
    <Link to="/app/speakers/test" className={css['speaker-card']}>
      <div className={css['thumbnail']}>
        <img alt="profile" src={thumbnailPlaceholder} />
      </div>
      <div className={css['details']}>
        <p className={css['name']}>{speaker.name}</p>
        <p className={css['role']}>{speaker.role}</p>
        <p className={css['company']}>{speaker.company}</p>
      </div>

      {favorited ? <IconStarFill {...iconProps} /> : <IconStar {...iconProps} />}
    </Link>
  )
}

type ListProps = {
  speakers: [SpeakerType]
}

const ListTrackSort = (props: ListProps) => {
  const [sectionOpen, setSectionOpen] = React.useState({
    0: true,
    1: true,
    2: true,
  })

  return (
    <div className={`${css['list-container']} ${css['track-sort']}`}>
      <CollapsedSection
        open={sectionOpen[0]}
        setOpen={() => setSectionOpen(current => ({ ...current, 0: !sectionOpen[0] }))}
      >
        <CollapsedSectionHeader title="Security" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
      <CollapsedSection
        open={sectionOpen[1]}
        setOpen={() => setSectionOpen(current => ({ ...current, 1: !sectionOpen[1] }))}
      >
        <CollapsedSectionHeader title="Society & Systems" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
      <CollapsedSection
        open={sectionOpen[2]}
        setOpen={() => setSectionOpen(current => ({ ...current, 2: !sectionOpen[2] }))}
      >
        <CollapsedSectionHeader title="UX & Design" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
    </div>
  )
}

const ListDaySort = (props: ListProps) => {
  const [sectionOpen, setSectionOpen] = React.useState({
    0: true,
    1: true,
    2: true,
  })

  return (
    <div className={`${css['list-container']} ${css['day-sort']}`}>
      <CollapsedSection
        open={sectionOpen[0]}
        setOpen={() => setSectionOpen(current => ({ ...current, 0: !sectionOpen[0] }))}
      >
        <CollapsedSectionHeader title="October 22nd, 2022 - Day 01" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
      <CollapsedSection
        open={sectionOpen[1]}
        setOpen={() => setSectionOpen(current => ({ ...current, 1: !sectionOpen[1] }))}
      >
        <CollapsedSectionHeader title="October 23rd, 2022 - Day 02" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
      <CollapsedSection
        open={sectionOpen[2]}
        setOpen={() => setSectionOpen(current => ({ ...current, 2: !sectionOpen[2] }))}
      >
        <CollapsedSectionHeader title="October 24th, 2022 - Day 03" />
        <CollapsedSectionContent dontAnimate>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
        </CollapsedSectionContent>
      </CollapsedSection>
    </div>
  )
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65)
const alphabet = alpha.map(x => String.fromCharCode(x))
const ListAlphabeticalSort = (props: ListProps) => {
  const [selectedLetter, setSelectedLetter] = React.useState(alphabet[0])

  return (
    <div className={`${css['list-container']} ${css['alphabet-sort']}`}>
      <p className="bold">{selectedLetter}</p>

      <div className={css['speakers-letters']}>
        <div className={css['speakers']}>
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
          {props.speakers.map(speaker => {
            return <SpeakerCard key={speaker.name} speaker={speaker} />
          })}
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

export const Speakers = () => {
  const trackFilters = ['One', 'Two', 'Three']
  const [speakers, filterState] = useFilter({
    tags: true,
    multiSelect: true,
    filters: trackFilters.map(i => {
      return {
        text: i.toString(),
        value: i.toString(),
      }
    }),
    filterFunction: (activeFilter: any) => {
      if (!activeFilter || Object.keys(activeFilter).length === 0) return dummySpeakers

      return dummySpeakers.filter(
        speaker => speaker.tracks && speaker.tracks.some(track => activeFilter && activeFilter[track])
      )
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
  const clearFilters = () => {
    filterState?.clearFilter()
  }
  const filterIsSelected = (() => {
    return Object.keys(filterState.activeFilter).length > 0
  })()

  return (
    <div>
      <div className="section">
        <div className="content">
          <div className={css['filter']}>
            <InputForm className={css['search']} placeholder="Search speakers..." icon={IconSearch} />
            <div style={{ position: 'relative' }}>
              <Sort {...sortState} />

              <FilterFoldout>
                {(_, setOpen) => {
                  return (
                    <>
                      <CollapsedSection>
                        <CollapsedSectionHeader title="Tracks" />
                        <CollapsedSectionContent>
                          <div className={css['filter-container']}>
                            <Filter {...filterState} />
                          </div>
                        </CollapsedSectionContent>
                      </CollapsedSection>
                      <CollapsedSection>
                        <CollapsedSectionHeader title="Tracks" />
                        <CollapsedSectionContent>
                          <div className={css['filter-container']}>
                            <Filter {...filterState} />
                          </div>
                        </CollapsedSectionContent>
                      </CollapsedSection>
                      <CollapsedSection>
                        <CollapsedSectionHeader title="Tracks" />
                        <CollapsedSectionContent>
                          <div className={css['filter-container']}>
                            <Filter {...filterState} />
                          </div>
                        </CollapsedSectionContent>
                      </CollapsedSection>

                      {filterIsSelected && (
                        <div className={css['filter-actions']}>
                          <button className={`plain ${css['clear']}`} onClick={clearFilters}>
                            Clear all
                          </button>

                          <Button className="red" onClick={() => setOpen(false)}>
                            Confirm
                          </Button>
                        </div>
                      )}
                    </>
                  )
                }}
              </FilterFoldout>
            </div>
          </div>

          {noResults ? (
            <NoResults />
          ) : (
            <>
              {sortedBy.key === 'name' && <ListAlphabeticalSort speakers={speakers} />}
              {sortedBy.key === 'tracks' && <ListTrackSort speakers={speakers} />}
              {sortedBy.key === 'days' && <ListDaySort speakers={speakers} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}