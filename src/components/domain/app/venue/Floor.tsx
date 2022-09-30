import React from 'react'
import Image from 'next/image'
import css from './floor.module.scss'
import venueCss from './venue.module.scss'
import filterCss from 'components/domain/app/app-filter.module.scss'

import FloorBasement from 'assets/images/venue-map/Floor Basement.png'
import Floor1 from 'assets/images/venue-map/Floor 1.png'
import Floor2 from 'assets/images/venue-map/Floor 2.png'
import Floor3 from 'assets/images/venue-map/Floor 3.png'
import Floor4 from 'assets/images/venue-map/Floor 4.png'
import Floor5 from 'assets/images/venue-map/Floor 5.png'
import { AppNav } from '../navigation'
import { PanzoomControls, usePanzoom } from './Venue'
import { Search } from 'components/common/filter/Filter'
import { RoomList } from './roomlist'
import { Room } from 'types/Room'

interface Props {
  floor: string
  rooms: Room[]
  className?: string
}

declare const VALID_LAYOUT_VALUES: readonly ["fill", "fixed", "intrinsic", "responsive", "raw", undefined]
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number]

export const getFloorImage = (floor: string, layout: LayoutValue = 'raw', className = '') => {
  if (floor === 'Floor 1') return <Image src={Floor1} className={className} alt={floor} layout={layout} id="venue-image" priority />
  if (floor === 'Floor 2') return <Image src={Floor2} className={className} alt={floor} layout={layout} id="venue-image" priority />
  if (floor === 'Floor 3') return <Image src={Floor3} className={className} alt={floor} layout={layout} id="venue-image" priority />
  if (floor === 'Floor 4') return <Image src={Floor4} className={className} alt={floor} layout={layout} id="venue-image" priority />
  if (floor === 'Floor 5') return <Image src={Floor5} className={className} alt={floor} layout={layout} id="venue-image" priority />
  if (floor === 'S1') return <Image src={FloorBasement} className={className} alt={floor} layout={layout} id="venue-image" priority />
}

export const Floor = (props: Props) => {
  const [search, setSearch] = React.useState('')
  const pz = usePanzoom()
  let className = css['container']
  if (props.className) className += ` ${props.className}`

  const filteredRooms = search
    ? props.rooms.filter(room => room.name.toLowerCase().includes(search) ||
      room.description.toLowerCase().includes(search))
    : props.rooms

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: props.floor,
          },
        ]}
      />

      <div className={venueCss['panzoom']}>
        <div className={venueCss['image']} id="image-container">
          {getFloorImage(props.floor)}
        </div>
        <PanzoomControls pz={pz} />
      </div>

      <div className={`${filterCss['filter']} border-top`}>
        <div className="section clear-bottom-less">
          <Search placeholder="Search rooms" onChange={setSearch} value={search} />
        </div>
      </div>

      <div className="section padding-top-less">
        <div className={css['background']}></div>

        <div className={css['room-info']}>
          <p className="h2 clear-bottom-less">{props.floor}</p>
        </div>

        <RoomList rooms={filteredRooms} />
      </div>
    </>
  )
}
