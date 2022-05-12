import React from 'react'
import { Link } from 'components/common/link'
import { useRouter } from 'next/router'
import IconLanguage from 'assets/icons/language.svg'
import css from './language-toggle.module.scss'

export function LanguageToggle() {
  const router = useRouter()
  if (router.asPath.startsWith('/archive')) return null

  return (
    <div id="language-toggle" className={css['language-toggle']}>
      <IconLanguage style={{ fontSize: '14px' }} />
      <Link to={`/en${router.asPath}`} locale="en">
        EN
      </Link>
      <span className={`${css['split']} bold`}>|</span>
      <Link to={`/es${router.asPath}`} locale="es">
        ES
      </Link>
    </div>
  )
}
