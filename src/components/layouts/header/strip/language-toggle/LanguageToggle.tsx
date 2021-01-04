import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import IconGlobe from 'src/assets/icons/globe.svg'
import css from './language-toggle.module.scss'

export function LanguageToggle() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(String)
  paths.shift()
  const path = paths.join('/')
  const redirectPath = path ? path + '/' : ''

  return (
    <div className={css['language-toggle']}>
      <IconGlobe style={{ fontSize: '16px' }} />
      <Link to={`/en/${redirectPath}`}>EN</Link>
      <span className={css['split']}>/</span>
      <Link to={`/es/${redirectPath}`}>ES</Link>
    </div>
  )
}
