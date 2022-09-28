import React from 'react'
import css from './featured-speakers.module.scss'
import Image from 'next/image'
import { Button } from 'components/common/button'
import { Link } from 'components/common/link'
// import Layer1 from 'assets/images/tracks/big-icons/Layer 1 Protocol.svg'
import SwipeToScroll from 'components/common/swipe-to-scroll'
import BrewsterKahle from './speaker-images/brewster-kahle.png'
import AyaMiyaguchi from './speaker-images/aya-miyaguchi.png'
import DannyRyan from './speaker-images/danny-ryan.png'
import EricWall from './speaker-images/eric-wall.png'
import BrunoMacaes from './speaker-images/bruno-macaes.png'
import PiaMancini from './speaker-images/pia-mancini.png'
import VekateshRao from './speaker-images/vekatesh-rao.png'
import TimBeiko from './speaker-images/tim-beiko.png'
import MaxSemenchuk from './speaker-images/max-semenchuk.png'
import Background from './speaker-images/background.png'
import { useTranslations } from 'next-intl'
// import Background from 'assets/images/pages/program.svg'

type SpeakerProps = {
  name: string
  image: any
}

const Speaker = (props: SpeakerProps) => {
  return (
    <div className={css['speaker']}>
      <div className={css['alignment']}>
        <div className={css['text']}>
          {props.name.split(' ').map(partOfName => {
            return <p key={partOfName}>{partOfName}</p>
          })}
        </div>
        <Image src={props.image} layout="raw" alt={props.name} priority />
      </div>
    </div>
  )
}

const FeaturedSpeakers = () => {
  const intl = useTranslations()

  return (
    <div className={`section`}>
      <h2 className="title spaced">{intl('keynote_speakers')}</h2>
      {/* <div className="section expand">
        <div className={css['background-title']}>Featured Speakers</div>
      </div> */}
      <div className={`${css['container']}`}>
        {/* <div className={css['background-logo']}>
          <Image src={Background} layout="raw" alt="Keynote speakers logo" />
        </div> */}
        <div className={css['background-title']}>{intl('featured_speakers')}</div>
        <SwipeToScroll noBounds scrollIndicatorDirections={{ left: true, right: true }}>
          <div className={css['speakers']}>
            <Speaker name="Brewster Kahle" image={BrewsterKahle} />
            <Speaker name="Danny Ryan" image={DannyRyan} />
            <Speaker name="Aya Miyaguchi" image={AyaMiyaguchi} />
            <Speaker name="Pia Mancini" image={PiaMancini} />
            <Speaker name="Bruno Macaes" image={BrunoMacaes} />
            <Speaker name="Vekatesh Rao" image={VekateshRao} />
            <Speaker name="Tim Beiko" image={TimBeiko} />
            <Speaker name="Eric Wall" image={EricWall} />
            <Speaker name="Max Semenchuk" image={MaxSemenchuk} />
          </div>
        </SwipeToScroll>
      </div>

      <div className="border-bottom clear-bottom margin-bottom">
        <p className={`${css['description']} clear-bottom-less clear-top`}>{intl('keynote_subtext')}</p>
      </div>
    </div>
  )
}

export default FeaturedSpeakers
