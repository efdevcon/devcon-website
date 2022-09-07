import React from 'react'
import { CSS3D } from './css-3d'
import { AppSearch } from 'components/domain/app/app-search'
import { useSort, SortVariation, Sort } from 'components/common/sort'
import { LinkList, Link } from 'components/common/link'
import css from './venue.module.scss'
import ListIcon from 'assets/icons/list.svg'
import LayersIcon from 'assets/icons/layers.svg'
import { NoResults } from 'components/common/filter'
import { Room } from 'types/Room'
import { AppNav } from 'components/domain/app/navigation'
import { Search, Tags, Basic, FilterFoldout } from 'components/common/filter/Filter'
import filterCss from 'components/domain/app/app-filter.module.scss'
import Image from 'next/image'
import Floor from 'assets/images/venue-map/venue-map.png'
import Panzoom from 'panzoom'

interface Props {
  rooms: Array<Room>
  floors: Array<string>
}

export const usePanzoom = () => {
  React.useEffect(() => {
    const scene = document.getElementById('image-container')
    if (scene) {
      const panzoomInstance = Panzoom(scene, {
        bounds: true,
        boundsPadding: 0.8,
        beforeWheel: function (e) {
          // allow wheel-zoom only if altKey is down. Otherwise - ignore
          var shouldIgnore = !e.ctrlKey
          return shouldIgnore
        },
      })

      return () => {
        panzoomInstance.dispose()
      }
    }
  }, [])
}

export const Venue = (props: Props) => {
  // const [listView, setListView] = React.useState()
  const [search, setSearch] = React.useState('')
  usePanzoom()

  // const filteredFloors = props.floors.filter(floor => {
  //   if (search.toLowerCase().includes(floor.toLowerCase())) return true;

  //   return false;
  // })

  return (
    <>
      <AppNav
        nested
        links={[
          {
            title: 'Venue',
            to: '/app/venue',
          },
        ]}
      />

      {/* <CSS3D /> */}

      <div className={css['panzoom']}>
        <div className={css['image']} id="image-container">
          <Image src={Floor} alt="Floor" objectFit="contain" layout="fill" />
        </div>
      </div>

      <div className={`${filterCss['filter']} border-top`}>
        <div className="section clear-bottom-less">
          <Search placeholder="Search venue" onChange={setSearch} value={search} />
        </div>
      </div>

      <div className="section clear-top-less">
        <h2 className="primary clear-bottom-less">Floors</h2>
        {props.floors.map(floor => {
          const roomsByFloor = props.rooms.filter(i => i.info === floor)

          return (
            <React.Fragment key={floor}>
              <div className={`padded bold font-md-fixed ${css['floor-header']}`}>{floor}</div>
              <LinkList>
                {roomsByFloor.map((room: Room) => {
                  return (
                    <Link className="font-md font-bold" key={room.id} to={`/app/venue/${room.id}`}>
                      {room.name}
                    </Link>
                  )
                })}
              </LinkList>
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
