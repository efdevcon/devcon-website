import React from 'react'
// @ts-ignore
import css from './footer.module.scss'

type Props = {}

export const Footer = (props: Props) => {
  return (
    <div className={`footer ${css['container']}`}>
      <div className={css['col-1']}>
        <div className={css['logo']} />
      </div>
      <div className={css['col-2']}>
        <div className={css['list']}>
          <p className="bold">About</p>
          <p className="bold">Program</p>
          <p className="bold">Speakers</p>
          <p className="bold">UX Awards</p>
          <p className="bold">Venue</p>
          <p className="bold">Bogota</p>
          <p className="bold">COVID-19</p>
        </div>
        <div className={css['list']}>
          <p className="bold">News</p>
          <p className="bold">Community</p>
          <p className="bold">Sponsors</p>
          <p className="bold">DIP Process</p>
          <p className="bold">Forum</p>
          <p className="bold">Blog</p>
        </div>
        <div className={css['list']}>
          <p className="bold">Get in touch</p>
          <p>devcon@ethereum.org</p>

          <p className="bold">Partner with us</p>
          <p>sponsorships@ethereum.org</p>
        </div>
      </div>
      <div className={css['col-3']}>
        <div className={css['logo']} />
        <p>© Ethereum Foundation, 2020</p>
      </div>
    </div>
  )
}
