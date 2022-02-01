import React from 'react'
import { Link } from 'components/common/link'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import IconLanguage from 'assets/icons/language.svg'
import css from './language-toggle.module.scss'

export const useLanguageToggle = () => {
  const router = useRouter()
  const paths = router.pathname.split('/').filter(String)
  paths.shift()
  const path = paths.join('/')

  return {
    pathname: router.pathname,
    redirectPath: path ? path + '/' : '',
    currentLanguage: router.pathname.split('/')[1],
  }
}

export function LanguageToggle() {
  const { redirectPath, pathname } = useLanguageToggle()

  if (pathname.startsWith('/archive')) return null

  return (
    <div id="language-toggle" className={css['language-toggle']}>
      <IconLanguage style={{ fontSize: '14px' }} />
      <Link to={`/en/${redirectPath}`} className="bold">
        EN
      </Link>
      <span className={`${css['split']} bold`}>|</span>
      <Link to={`/es/${redirectPath}`} className="bold">
        ES
      </Link>
    </div>
  )
}
