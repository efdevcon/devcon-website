import React from 'react'
import css from './page-hero.module.scss'
import dipLogo from 'src/assets/images/dip-logo.svg'

// Props not fleshed out yet, just creating an overview of potential props
type PageHeroProps = {
  logo?: any
  links?: any
  background?: any
}

export const PageHero = () => {
  return (
    <div className={css['hero']}>
      <div className={css['backdrop']}>
        <img alt="" src={dipLogo} />
      </div>
      <div className="section">
        <div className={css['info']}>
          <p className="font-xs">BOGOTA / CITY GUIDE</p>

          <h1>City Guide</h1>

          <div className={css['anchors']}>
            <p className="font-sm bold">LOCATION</p>
            <p className="font-sm bold">ABOUT BOGOTA</p>
            <p className="font-sm bold">WHY BOGOTA?</p>
            <p className="font-sm bold">THINGS TO KNOW</p>
            <p className="font-sm bold">THINGS TO DO</p>
            <p className="font-sm bold">GETTING AROUND</p>
            <p className="font-sm bold">FREQUENTLY ASKED QUESTIONS</p>
          </div>
        </div>
      </div>
    </div>
  )
}
