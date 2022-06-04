import React from 'react'
import css from './track-list.module.scss'
import Accordion from 'components/common/accordion'
import Image from 'next/image'
import Layer1 from 'assets/images/tracks/icons/layer-1.svg'
import Cryptoeconomics from 'assets/images/tracks/icons/cryptoeconomics.svg'
import DeveloperInfra from 'assets/images/tracks/icons/developer-infra.svg'
import Governance from 'assets/images/tracks/icons/governance-coordination.svg'
import Layer2 from 'assets/images/tracks/icons/layer-2.svg'
import GlobalImpact from 'assets/images/tracks/icons/opportunity-global-impact.svg'
import Security from 'assets/images/tracks/icons/security.svg'
import Staking from 'assets/images/tracks/icons/staking-validator-exp.svg'
import UXDesign from 'assets/images/tracks/icons/ux-design.svg'
import ZKPs from 'assets/images/tracks/icons/zkps.svg'
import TriangleBackground from 'assets/images/background-triangles.png'
import { Track } from 'types/Track'

interface Props {
  tracks: Track[]
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
  return (
    <div className={`section ${css['container']}`} id="tracks">
      <div className={`${css['background']} expand`}>
        <Image src={TriangleBackground} alt="Triangles" />
      </div>
      <h2 className="border-top clear-top spaced">Tracks</h2>
      <Accordion dense items={props.tracks.map((i: Track) => {
        return {
          id: i.id,
          title: (
            <div className={css['track-title']}>
              <span className={css['icon-container']}>
                {getTrackImage(i.id)}
              </span>
              {i.title}
            </div>
          ),
          body: (
            <div className={css['track-body']}>
              {i.body}
            </div>
          ),
        }
      })} />
    </div>
  )
}

export default Tracks
