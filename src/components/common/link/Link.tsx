// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#reminder-use-link-only-for-internal-links
import React, { ReactNode } from 'react'
import { Link as GatsbyLink } from 'gatsby'

type LinkProps = {
  children: ReactNode
  external?: boolean
  to: string
  [key: string]: any
}

export const Link = ({ children, external, to, ...rest }: LinkProps) => {
  // GatsbyLink is only used for internal links, as per the gatsby documentation
  // May be a non-explicit way to test if something is external (e.g. if the "to" link is a fully qualified domain) - revisit when time
  if (external) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={to} {...rest}>
      {children}
    </GatsbyLink>
  )
}
