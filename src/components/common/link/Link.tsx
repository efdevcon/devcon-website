import React, { ReactNode } from 'react'
import { default as NextLink } from 'next/link'
import NorthEast from 'assets/icons/north_east.svg'
import LinkIndicator from 'assets/icons/link-indicator.svg'
import css from './link.module.scss'
// @ts-ignore
import AnchorLink from 'react-anchor-link-smooth-scroll'

type LinkProps = {
  children: ReactNode
  indicateExternal?: boolean // Whether or not to add an external link indicator (if the url is a FQDN)
  allowDrag?: boolean
  to: string
  ignoreLocale?: boolean
  [key: string]: any
}

const Link = React.forwardRef(
  ({ children, indicateExternal, external, allowDrag, ignoreLocale, to, locale, ...rest }: LinkProps, ref: any) => {
    const isMailTo = to.startsWith('mailto:')
    const dragging = React.useRef(false)

    const linkAttributes = {
      ...rest,
    }

    // Links can exist within a draggable context; we don't want drag events to be mistaken for clicks, so we preventDefault if the mouse is moving
    if (allowDrag) {
      linkAttributes.onMouseDown = () => {
        dragging.current = false
      }

      linkAttributes.onMouseMove = () => {
        dragging.current = true
      }

      linkAttributes.onClick = (e: React.SyntheticEvent) => {
        if (dragging.current) {
          e.preventDefault()
        }
      }

      linkAttributes.draggable = false
    }

    if (isMailTo) {
      return (
        <a href={to} ref={ref} {...linkAttributes}>
          {children}
        </a>
      )
    }

    // Detects fully qualified domain name
    // One caveat to this approach is that you could link to a devcon.org page via a FQDN, and it would be detected as external.
    // Possible solutions: 1) Make sure to always use relative links for internal navigation 2) Add an escape hatch if "devcon.org" is in the url
    const isExternal = to.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

    if (isExternal) {
      return (
        <a href={to} ref={ref} {...linkAttributes} target="_blank" rel="noopener noreferrer">
          {children}
          {indicateExternal && (
            <span className={css['external-indicator']} data-type="external-indicator">
              &nbsp;
              <LinkIndicator className={`${css['icon']} icon`} />
            </span>
          )}
        </a>
      )
    }

    if (to.startsWith('#')) {
      return (
        <AnchorLink href={to} {...linkAttributes} offset={125}>
          {children}
        </AnchorLink>
      )
    }

    return (
      <NextLink href={to}>
        <a {...linkAttributes}>{children}</a>
      </NextLink>
    )

    if (isExternal) {
      return (
        <a href={to} ref={ref} {...linkAttributes} target="_blank" rel="noopener noreferrer">
          {children} {indicateExternal && <NorthEast style={{ fontSize: '0.5rem' }} />}
        </a>
      )
    }

    return (
      <NextLink href={to} locale={locale} /*locale={ignoreLocale ? false : locale}*/>
        <a {...linkAttributes}>{children}</a>
      </NextLink>
    )
  }
)

Link.displayName = 'LinkComponent'

export { Link }

/*
import React, { ReactNode } from 'react'
import Link from 'next/link'
import LinkIndicator from 'assets/icons/link-indicator.svg'
import css from './link.module.scss'

type LinkProps = {
  children: ReactNode
  indicateExternal?: boolean // Whether or not to add an external link indicator (if the url is a FQDN)
  allowDrag?: boolean
  to: string
  [key: string]: any
}

export const useDraggableLink = () => {
  const dragging = React.useRef(false)

  return {
    onMouseDown: () => {
      dragging.current = false
    },
    onMouseMove: () => {
      dragging.current = true
    },
    onClick: (e: React.SyntheticEvent) => {
      e.stopPropagation()

      if (dragging.current) {
        e.preventDefault()
      }
    },
    draggable: false,
  }
}

const WrappedLink = React.forwardRef(
  ({ children, indicateExternal, external, allowDrag, href, ...rest }: LinkProps, ref: any) => {
    const isMailTo = href.startsWith('mailto:')
    const linkAttributes = {
      ...rest,
      className: rest.className ? `${rest.className} ${css['link']} generic` : `${css['link']} generic`,
      ...useDraggableLink(),
    }

    if (isMailTo) {
      return (
        <a href={href} ref={ref} {...linkAttributes}>
          {children}
        </a>
      )
    }

    // Detects fully qualified domain name
    // One caveat to this approach is that you could link to a devcon.org page via a FQDN, and it would be detected as external:
    // Make sure to always use relative links for internal navigation
    const isExternal = href.match(/^([a-z0-9]*:|.{0})\/\/.*$/)

    // External links have no use of next Link component
    if (isExternal) {
      return (
        <a href={href} ref={ref} {...linkAttributes} target="_blank" rel="noopener noreferrer">
          <span className={css['link']} data-type="link-text">
            {children}
          </span>
          {indicateExternal && (
            <span className={css['external-indicator']} data-type="external-indicator">
              &nbsp;
              <LinkIndicator className={`${css['icon']} icon`} />
            </span>
          )}
        </a>
      )
    }

    return (
      <Link href={href}>
        <a {...linkAttributes}>
          <span className={css['link']} data-type="link-text">
            {children}
          </span>
        </a>
      </Link>
    )
  }
)

WrappedLink.displayName = 'LinkComponent'

export default WrappedLink

*/
