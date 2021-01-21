import React from 'react'
import css from './page-hero.module.scss'
import Pencil from 'src/assets/icons/pencil.svg'
import BulletList from 'src/assets/icons/bullet_list.svg'

// Props not fleshed out yet, just creating an overview of potential props
type PageHeroProps = {
  title: string
  logo?: any
  links?: any
  background?: any
}

export const PageHero = (props: PageHeroProps) => {
  return (
    <div className={css['hero']}>
      <div className={css['backdrop']} style={{ background: props.background }}>
        <img alt="" src={props.logo} />
      </div>
      <div className="section">
        <div className={css['info']}>
          <p className="font-xs">
            GET INVOLVED / <b>DIPS</b>
          </p>
          {/* */}
          <div className={css['title-block']}>
            <h1>{props.title}</h1>

            <div className={css['buttons']}>
              <button className="lg">
                <BulletList />
                <span>Review DIPs</span>
              </button>
              <button className="lg">
                <Pencil />
                <span>Create Proposal</span>
              </button>
            </div>
          </div>
          <div className={css['anchors']}>
            <p className="font-xs bold font-secondary">FORUM</p>
            <p className="font-xs bold font-secondary">GITHUB</p>
            <p className="font-xs bold font-secondary">
              <a href="#contribute">CONTRIBUTE</a>
            </p>
            <p className="font-xs bold font-secondary">DIPS</p>
          </div>
        </div>
      </div>
    </div>
  )
}
