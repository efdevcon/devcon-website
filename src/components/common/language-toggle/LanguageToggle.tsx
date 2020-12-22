import React from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

export function LanguageToggle() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(String)
  paths.shift()
  const path = paths.join('/');
  const redirectPath = path ? path + '/' : '';

  return (
    <div>
      <Link to={`/en/${redirectPath}`}>EN</Link> | <Link to={`/es/${redirectPath}`}>ES</Link>
    </div>
  )
}
