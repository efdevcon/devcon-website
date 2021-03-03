import React from 'react'
import heart from 'src/assets/images/heart.gif'
import hug from 'src/assets/images/hug.gif'
import badger from 'src/assets/images/badger.gif'
import celebrate from 'src/assets/images/celebrate.gif'
import colombia from 'src/assets/images/colombia.gif'
import dance from 'src/assets/images/dance.gif'
import dance2 from 'src/assets/images/dance2.gif'
import nyan from 'src/assets/images/nyan.gif'
import salsa from 'src/assets/images/salsa.gif'
import salsa2 from 'src/assets/images/salsa2.gif'
import unicorn from 'src/assets/images/unicorn.gif'
import css from './scroller.module.scss'

export const GifScroller = (props: any) => {
  const start = (
    <div className={css['first']}>
      <img alt="" src={heart} />
      <img alt="" src={hug} />
      <img alt="" src={badger} />
      <img alt="" src={celebrate} />
      <img alt="" src={colombia} />
      <img alt="" src={dance} />
    </div>
  )

  const rest = (
    <div className={css['rest']}>
      <img alt="" src={dance2} />
      <img alt="" src={nyan} />
      <img alt="" src={salsa} />
      <img alt="" src={salsa2} />
      <img alt="" src={unicorn} />
    </div>
  )

  return (
    <div className={css['scroller']}>
      {start}
      {rest}
      {start}
    </div>
  )
}
