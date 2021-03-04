// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#reminder-use-link-only-for-internal-links
import React, { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import NorthEast from 'src/assets/icons/north_east.svg'

type LinkProps = {
  children: ReactNode
  markExternal?: boolean // Whether or not to add an external link indicator (if the url is a FQDN)
  to: string
  [key: string]: any
}

export const Link = ({ children, indicateExternal, external, to, ...rest }: LinkProps) => {
  const isMailTo = to.startsWith('mailto:')

  if (isMailTo) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }

  // Detects fully qualified domain name
  // One caveat to this approach is that you could link to a devcon.org page via a FQDN, and it would be detected as external.
  // Possible solutions: 1) Make sure to always use relative links for internal navigation 2) Add an escape hatch if "devcon.org" is in the url
  const isExternal = to.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

  // GatsbyLink is only used for internal links, as per the gatsby documentation
  if (isExternal) {
    return (
      <a href={to} {...rest} target="_blank" rel="noopener noreferrer">
        {children} {indicateExternal && <NorthEast style={{ fontSize: '0.5rem' }} />}
      </a>
    )
  }

  return (
    <GatsbyLink to={to} {...rest}>
      {children}
    </GatsbyLink>
  )
}
