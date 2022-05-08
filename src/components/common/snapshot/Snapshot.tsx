import React from 'react'
import moment from 'moment-timezone'
import css from './snapshot.module.scss'
import { useTranslations } from 'next-intl'
import IconClock from 'assets/icons/icon_clock.svg'
import IconCurrency from 'assets/icons/icon_currency.svg'
import IconGlobe from 'assets/icons/icon_globe.svg'
import IconSun from 'assets/icons/icon_sun.svg'
import IconWater from 'assets/icons/icon_water.svg'
import { Link } from 'components/common/link'

export function Snapshot() {
  const intl = useTranslations()

  return (
    <div className={css['container']}>
      <ul className={css['list']}>
        <li className={css['list-item']}>
          <IconClock />
          <span className={css['label']}>{intl('snapshot_timezone')}:</span>
          <span>GMT -5</span>
          <span className="bold">{moment().tz('America/Bogota').format('hh:mm A')}</span>
        </li>
        <li className={css['list-item']}>
          <IconCurrency />
          <span className={css['label']}>{intl('snapshot_currency')}:</span>
          <span>{intl('snapshot_colombian_peso')}</span>
          <Link indicateExternal to="https://www.xe.com/currency/cop-colombian-peso">
            {intl('snapshot_exchange_rate')}
          </Link>
        </li>
        <li className={css['list-item']}>
          <IconGlobe />
          <span className={css['label']}>{intl('snapshot_language')}:</span>
          <span>{intl('snapshot_spanish')}</span>
          <Link
            indicateExternal
            to="https://www.worldtravelguide.net/guides/south-america/colombia/history-language-culture/"
          >
            {intl('snapshot_language_guide')}
          </Link>
        </li>
        <li className={css['list-item']}>
          <IconSun />
          <span className={css['label']}>{intl('snapshot_temperature')}:</span>
          <span>8 TO 20 °C / 46.4 to 68.0 °F</span>
          <Link indicateExternal to="https://www.worldtravelguide.net/guides/south-america/colombia/travel-by/">
            {intl('snapshot_packing_tips')}
          </Link>
        </li>
        <li className={css['list-item']}>
          <IconWater />
          <span className={css['label']}>{intl('snapshot_water')}:</span>
          <span>{intl('snapshot_tap_water')}</span>
          <Link indicateExternal to="#FAQ">
            {intl('snapshot_FAQs')}
          </Link>
        </li>
      </ul>

      {/* <Link
        indicateExternal
        className={`font-md bold text-primary text-uppercase ${css['primary']}`}
        to={'https://goo.gl/maps/Ee3dz2XbQfbNKeR36'}
      >
        See venue on google maps
      </Link> */}
    </div>
  )
}
