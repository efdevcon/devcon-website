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
    body: (
      <div className={css['track-body']}>
        Ethereum Roadmap, core protocol upgrades and improvements, design decisions and tradeoffs, impact of MEV, core
        protocol values and their importance.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Pushing Ethereum&apos;s boundaries: more throughput, a farther reach, and more functionality. What are ways to
        enable Ethereum to scale, handle transactions faster, and for building bridges with other technologies? Anything
        rollup-related, wallets and other L2-enabling technologies, applications that take advantage of them, etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Tooling and other efforts to make it easier, more fun, and more appealing to build on Ethereum. Languages,
        libraries, frameworks, dev tooling, best practices, etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        How can we empower people to coordinate, manage common resources and make positive-sum decisions together? DAOs,
        decentralized governance, etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Let&apos;s create a more intuitive, safe and delightful experience for users of Ethereum and its applications!
        Design, UI, product-market fit, marketing, etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Home staking, distributed validator technology, pooling, decentralization improvements, protocol design, and
        everything in between.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Making Ethereum easy, safe, and more secure for end-users. DApp security, data privacy, identity, key
        management, etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        The potential of zero-knowledge cryptography and the importance of privacy, along with its applications and
        impact.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        How can Ethereum change the world for the better? Public goods, sustainability, politics, P2P finance,
        micro-lending, financial systems, identity, emerging markets, environment, communication and censorship, access,
        etc.
      </div>
    ),
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
    body: (
      <div className={css['track-body']}>
        Research in game theory, mechanism design, and tokenomics for protocols and applications.
      </div>
    ),
  },
]

const Tracks = () => {
  return (
    <div className={`section ${css['container']}`} id="tracks">
      <div className={`${css['background']} expand`}>
        <Image src={TriangleBackground} alt="Triangles" />
      </div>
      <h2 className="border-top clear-top spaced">Tracks</h2>
      <Accordion dense items={tracks} />
    </div>
  )
}

export default Tracks
