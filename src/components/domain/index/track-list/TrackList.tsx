import React from 'react'
import css from './track-list.module.scss'
import Accordion from 'components/common/accordion'
import Image from 'next/image'
import Layer1 from 'assets/images/tracks/icons/layer-1.png'
import Cryptoeconomics from 'assets/images/tracks/icons/cryptoeconomics.png'
import DeveloperInfra from 'assets/images/tracks/icons/developer-infra.png'
import Governance from 'assets/images/tracks/icons/governance-coordination.png'
import Layer2 from 'assets/images/tracks/icons/layer-2.png'
import GlobalImpact from 'assets/images/tracks/icons/opportunity-global-impact.png'
import Security from 'assets/images/tracks/icons/security.png'
import Staking from 'assets/images/tracks/icons/staking-validator-exp.png'
import UXDesign from 'assets/images/tracks/icons/ux-design.png'
import ZKPs from 'assets/images/tracks/icons/zkps.png'
import TriangleBackground from 'assets/images/background-triangles.png'

const tracks = [
  {
    id: '1',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Layer1} alt="Layer 1 track icon" />
        </span>
        Layer 1 Protocol
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '2',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Layer2} alt="Layer 2s track icon" />
        </span>
        Layer 2s
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '3',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={DeveloperInfra} alt="Developer infrastructure track icon" />
        </span>
        Developer Infrastructure
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '4',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Governance} alt="Governance & Coordination track icon" />
        </span>
        Governance & Coordination
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '5',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={UXDesign} alt="UX & Design track icon" />
        </span>
        UX & Design
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '6',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Staking} alt="Staking & Validator Experience track icon" />
        </span>
        Staking & Validator Experience
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '7',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Security} alt="Security track icon" />
        </span>
        Security
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '8',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={ZKPs} alt="ZKPS and Privacy track icon" />
        </span>
        ZKPs and Privacy
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '9',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={GlobalImpact} alt="Opportunity & Global impact track icon" />
        </span>
        Opportunity & Global Impact
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
  {
    id: '10',
    title: (
      <div className={css['track-title']}>
        <span className={css['icon-container']}>
          <Image src={Cryptoeconomics} alt="Cryptoeconomics track icon" />
        </span>
        Cryptoeconomics
      </div>
    ),
    body: <div className={css['track-body']}>Nothing</div>,
  },
]

const Tracks = () => {
  return (
    <div className={`section ${css['container']}`}>
      <div className={`${css['background']} expand`}>
        <Image src={TriangleBackground} alt="Triangles" />
      </div>
      <h2 className="border-top clear-top spaced">Tracks</h2>
      <Accordion dense items={tracks} />
    </div>
  )
}

export default Tracks
