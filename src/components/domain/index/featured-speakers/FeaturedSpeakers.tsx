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
import VitalikButerin from './speaker-images/vitalik-buterin.png'
import KurtOpsahl from './speaker-images/kurt-opsahl.png'
import IXShells from './speaker-images/ix-shells.png'
import Background from './speaker-images/background.png'
import { useTranslations } from 'next-intl'
import { useDraggableLink } from 'components/domain/devcon-week/schedule'
// import { useDr}
// import Background from 'assets/images/pages/program.svg'

type SpeakerProps = {
  name: string
  image: any
  appLink?: string
}

const Speaker = (props: SpeakerProps) => {
  const dragAttributes = useDraggableLink()

  const body = (
    <>
      <div className={css['text']}>
        {props.name.split(' ').map(partOfName => {
          return <p key={partOfName}>{partOfName}</p>
        })}
      </div>
      <Image src={props.image} layout="raw" alt={props.name} priority quality="100" />
    </>
  )

  return (
    <div className={css['speaker']}>
      {props.appLink ? (
        <Link {...dragAttributes} to={props.appLink} className={css['alignment']}>
          {body}
        </Link>
      ) : (
        <div className={css['alignment']}>{body}</div>
      )}
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
            <Speaker appLink="https://app.devcon.org/schedule/HFPLPD" name="Brewster Kahle" image={BrewsterKahle} />
            <Speaker appLink="https://app.devcon.org/speakers/J7DTZN" name="Danny Ryan" image={DannyRyan} />
            <Speaker appLink="https://app.devcon.org/speakers/ADH9HF" name="Aya Miyaguchi" image={AyaMiyaguchi} />
            <Speaker appLink="https://app.devcon.org/speakers/FLKFV8" name="Vitalik Buterin" image={VitalikButerin} />
            <Speaker appLink="https://app.devcon.org/speakers/ZUMDMJ" name="Pia Mancini" image={PiaMancini} />
            <Speaker appLink="https://app.devcon.org/speakers/PRM7AM" name="Bruno Macaes" image={BrunoMacaes} />
            <Speaker name="IXShells" image={IXShells} />
            <Speaker appLink="https://app.devcon.org/speakers/JS9FQP" name="Kurt Opsahl" image={KurtOpsahl} />
            <Speaker appLink="https://app.devcon.org/speakers/Z93KWP" name="Venkatesh Rao" image={VekateshRao} />
            <Speaker appLink="https://app.devcon.org/speakers/7BSSFC" name="Tim Beiko" image={TimBeiko} />
            <Speaker appLink="https://app.devcon.org/speakers/3NSWV9" name="Eric Wall" image={EricWall} />
            <Speaker appLink="https://app.devcon.org/speakers/A9WCWN" name="Max Semenchuk" image={MaxSemenchuk} />
          </div>
        </SwipeToScroll>
      </div>

      <div className="border-bottom clear-bottom margin-bottom">
        <p className={`${css['description']} clear-bottom-less clear-top`}>{intl('keynote_subtext')}</p>

        <Button className="red lg bold" to="https://app.devcon.org/schedule">
          {intl('keynote_view_schedule')} →
        </Button>
      </div>
    </div>
  )
}

export default FeaturedSpeakers
