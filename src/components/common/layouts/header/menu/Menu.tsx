import React from 'react'
import css from './menu.module.scss'
import { Link } from 'components/common/link'
import { Navigation } from './navigation'
import { usePageContext } from 'context/page-context'
import { Link as LinkType } from 'types/Link'
import { Foldout } from './foldout'
import { useRouter } from 'next/router'
import IconMenu from 'assets/icons/menu.svg'
import AccountIcon from 'assets/icons/account.svg'
import IconCross from 'assets/icons/cross.svg'
import SearchIcon from 'assets/icons/search.svg'
// import BellIcon from 'assets/icons/bell.svg'
import BellIcon from 'assets/icons/bell-simple.svg'
import { LanguageToggle } from 'components/common/layouts/header/strip/language-toggle'
import navigationData from '../navigationData'

type ButtonProps = {
  buttons: {
    key: string
    icon: React.ReactNode
    url?: string
    className?: string
    onClick?: any
  }[]
}

export const Left = (props: any) => {
  return (
    <div className={css['left']}>
      {navigationData.top.map((i: LinkType) => {
        return (
          <Link
            indicateExternal
            key={`top-${i.url}`}
            external
            to={i.url}
            className={`hover-underline ${css['highlighted-link']}`}
          >
            {i.title}
          </Link>
        )
      })}
    </div>
  )
}

const Buttons = (props: ButtonProps) => {
  return (
    <div className={css['buttons']}>
      {props.buttons.map(button => {
        let className = css['button']

        if (button.url) {
          return (
            <Link key={button.key} to={button.url} className={className}>
              {button.icon}
            </Link>
          )
        }

        return (
          <button
            key={button.key}
            aria-label={button.key}
            className={`${className} plain ${button.className}`}
            onClick={button.onClick}
          >
            {button.icon}
          </button>
        )
      })}
    </div>
  )
}

export const Menu = (props: any) => {
  const router = useRouter()
  const context = usePageContext()

  let buttons: ButtonProps['buttons'] = [
    // {
    //   key: 'account',
    //   icon: <AccountIcon />,
    //   url: '/app',
    // },
    {
      key: 'mobile-menu-toggle',
      icon: props.foldoutOpen ? <IconCross style={{ width: '0.8em' }} /> : <IconMenu />,
      onClick: () => props.setFoldoutOpen(!props.foldoutOpen),
      className: css['mobile-only'],
    },
  ]

  // if (router.pathname.startsWith('/archive')) {
  //   buttons = [
  //     {
  //       key: 'search',
  //       icon: <SearchIcon style={props.searchOpen ? { opacity: 0.5 } : undefined} />,
  //       onClick: () => props.setSearchOpen(!props.searchOpen),
  //     },
  //     ...buttons,
  //   ]
  // }

  if (router.pathname.startsWith('/app')) {
    buttons = [
      ...buttons.slice(0, 1),
      {
        key: 'notifications',
        icon: (
          <div className={css['app-notifications']}>
            <BellIcon style={props.searchOpen ? { opacity: 0.5 } : undefined} />
            <div className={css['counter']}>3</div>
          </div>
        ),
        url: '/app/notifications',
        // onClick: () => alert('Not done'),
      },
      ...buttons.slice(1),
    ]
  }

  return (
    <div className={css['menu']}>
      <Left navigationData={context?.navigation} />

      <div className={css['right']}>
        <Navigation navigationData={context?.navigation} />
      </div>

      <Buttons buttons={buttons} />

      {/* <Account /> */}
      {/* <Search open={props.setSearchOpen} /> */}
      {/* </Buttons> */}

      {/* Mobile */}
      <Foldout foldoutOpen={props.foldoutOpen} setFoldoutOpen={props.setFoldoutOpen}>
        <div className={css['foldout-top']}>
          <Left navigationData={context?.navigation} />
          <LanguageToggle />
        </div>
        <Navigation setFoldoutOpen={props.setFoldoutOpen} navigationData={context?.navigation} mobile={true} />
      </Foldout>
    </div>
  )
}
