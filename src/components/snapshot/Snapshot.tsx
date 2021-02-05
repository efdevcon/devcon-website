import React from 'react'
import css from './snapshot.module.scss'

import IconClock from 'src/assets/icons/icon_clock.svg'
import IconCurrency from 'src/assets/icons/icon_currency.svg'
import IconGlobe from 'src/assets/icons/icon_globe.svg'
import IconSun from 'src/assets/icons/icon_sun.svg'
import IconWater from 'src/assets/icons/icon_water.svg'

export function Snapshot() {
  return (
    <div className={css['container']}>
      <ul className={css['list']}>
        <li className={css['list-item']}>
         <IconClock />
         <span className={css['label']}>Timezone:</span>
         <span>GMT -5</span>
         <span>3:00 PM</span>
        </li>
        <li className={css['list-item']}>
         <IconCurrency />
         <span className={css['label']}>Currency:</span>
         <span>Colombian Peso (CPO)</span>
         <a href="https://www.google.com/">exchange rate</a>
        </li>
        <li className={css['list-item']}>
         <IconGlobe />
         <span className={css['label']}>Official Language:</span>
         <span>Spanish</span>
         <a href="https://www.google.com/">language Guide</a>
        </li>
        <li className={css['list-item']}>
         <IconSun />
         <span className={css['label']}>Avg. temp:</span>
         <span>8 TO 20 °C /  46.4 to 68.0 °F</span>
         <a href="https://www.google.com/">Packing tips</a>
        </li>
        <li className={css['list-item']}>
         <IconWater />
         <span className={css['label']}>Water:</span>
         <span>Tap water is safe to drink in Bogota.</span>
         <a href="https://www.google.com/">FAQs</a>
        </li>
      </ul>
    </div>
  )
}
