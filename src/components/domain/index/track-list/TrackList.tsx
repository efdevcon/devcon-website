import React from 'react'
import css from './track-list.module.scss'
import Accordion from 'components/common/accordion'
import Image from 'next/image'
import Layer1 from 'assets/images/tracks/big-icons/Layer 1 Protocol.svg'
import Cryptoeconomics from 'assets/images/tracks/big-icons/Cryptoeconomics.svg'
import DeveloperInfra from 'assets/images/tracks/big-icons/Developer Infrastructure.svg'
import Governance from 'assets/images/tracks/big-icons/Governance & Coordination.svg'
import Layer2 from 'assets/images/tracks/big-icons/Layer 2s.svg'
import GlobalImpact from 'assets/images/tracks/big-icons/Opportunity & Global Impact.svg'
import Security from 'assets/images/tracks/big-icons/Security.svg'
import Staking from 'assets/images/tracks/big-icons/Staking & Validator Experience.svg'
import UXDesign from 'assets/images/tracks/big-icons/UX & Design.svg'
import ZKPs from 'assets/images/tracks/big-icons/ZKPs and Privacy.svg'
import TriangleBackground from 'assets/images/background-triangles.png'
import { Track } from 'types/Track'
import { Card } from 'components/common/card'
import { Slider, useSlider } from 'components/common/slider'
import { FlipCard } from 'components/common/flip-card'

interface Props {
  tracks: Track[]
}

const settings = {
  infinite: false,
  touchThreshold: 100,
  speed: 500,
  variableWidth: true,
  arrows: false,
  swipeToSlide: true,
  mobileFirst: true,
}

function getTrackImage(id: string) {
  if (id === 'layer-1') return <Layer1 />
  if (id === 'layer-2s') return <Layer2 />
  if (id === 'developer-infrastructure') return <DeveloperInfra />
  if (id === 'governance-coordination') return <Governance />
  if (id === 'ux-design') return <UXDesign />
  if (id === 'staking-validator-experience') return <Staking />
  if (id === 'security') return <Security />
  if (id === 'zkps') return <ZKPs />
  if (id === 'opportunity-global-impact') return <GlobalImpact />
  if (id === 'cryptoeconomics') return <Cryptoeconomics />

  return null
}

const Tracks = (props: Props) => {
  const sliderProps = useSlider(settings)

  return (
    <div className={`section ${css['container']}`} id="tracks">
      <div className={`${css['background']} expand`}>
        <Image src={TriangleBackground} alt="Triangles" />
      </div>
      {/* <h2 className="border-top clear-top">Tracks</h2> */}

      <div className={css['tracks']}>
        <Slider sliderProps={sliderProps} title="Tracks">
          {props.tracks.map((track: Track, i: number) => {
            let className = css['card']

            className += ` ${css[track.id]}`

            return (
              <FlipCard key={track.slug} className={className}>
                <div className={css['image']}>{getTrackImage(track.id)}</div>
                <div className={css['details']}>
                  <p className={css['title']}>{track.title}</p>
                  <p className={css['text']}>{track.body}</p>
                </div>
              </FlipCard>
            )
          })}
        </Slider>
      </div>
      {/* <Accordion
        dense
        items={props.tracks.map((i: Track) => {
          return {
            id: i.id,
            title: (
              <div className={css['track-title']}>
                <span className={css['icon-container']}>{getTrackImage(i.id)}</span>
                {i.title}
              </div>
            ),
            body: <div className={css['track-body']}>{i.body}</div>,
          }
        })}
      /> */}
    </div>
  )
}

export default Tracks
