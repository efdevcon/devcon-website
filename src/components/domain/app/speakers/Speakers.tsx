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

type CardProps = {
  speaker: SpeakerType
}

export const SpeakerCard = ({ speaker }: CardProps) => {
  const { account, setSpeakerFavorite } = useAccountContext()
  const favoritedSpeakers = account?.appState?.favoritedSpeakers
  const isSpeakerFavorited = favoritedSpeakers?.[speaker.id]

  const iconProps = {
    className: css['favorite'],
    onClick: (e: React.SyntheticEvent) => {
      e.preventDefault()
      setSpeakerFavorite(speaker.id, !!isSpeakerFavorited)
    },
  }

  return (
    <Link to={`/app/speakers/${speaker.id}`} className={css['speaker-card']}>
      <>
        <div className={css['thumbnail']}>
          <div className={css['wrapper']}>
            <Image src={speaker.avatar ?? makeBlockie(speaker.name)} alt={speaker.name} objectFit='contain' layout='fill' />
          </div>
        </div>
        <div className={css['details']}>
          <p className={css['name']}>{speaker.name}</p>
          <p className={css['role']}>{speaker.role}</p>
          <p className={css['company']}>{speaker.company}</p>
        </div>

        {isSpeakerFavorited ? <IconStarFill {...iconProps} /> : <IconStar {...iconProps} />}
      </>
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
  const trackFilters = ['One', 'Two', 'Three']
  const [search, setSearch] = React.useState('')
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
      if (!activeFilter || Object.keys(activeFilter).length === 0) return props.speakers

      return props.speakers.filter(
        (i: any) => i.tracks && i.tracks.some((x: any) => activeFilter && activeFilter[x])
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
              { title: 'Track', filterState },
              { title: 'Track', filterState },
            ]}
          />

          {noResults ? (
            <NoResults />
          ) : (
            <>
              {sortedBy.key === 'name' && <ListAlphabeticalSort speakers={props.speakers} />}
              {sortedBy.key === 'tracks' && <ListTrackSort speakers={props.speakers} />}
              {sortedBy.key === 'days' && <ListDaySort speakers={props.speakers} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
