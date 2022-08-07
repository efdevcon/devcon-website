import React from 'react'
import { AccountContextProvider } from 'context/account-context-provider'
import { BottomNav, InlineNav } from 'components/domain/app/navigation'
import css from './app.module.scss'
import { Header } from 'components/common/layouts/header'
import { SEO } from 'components/domain/seo'
import { useAccountContext } from 'context/account-context'
import useGetElementHeight from 'hooks/useGetElementHeight'

export const AppLayout = (props: any) => {
  const accountContext = useAccountContext()
  const loggedIn = !!accountContext.account

  const headerHeight = useGetElementHeight('header')
  const upperNavHeight = useGetElementHeight('inline-nav')
  const lowerNavHeight = useGetElementHeight('bottom-nav')

  return (
    <>
      <SEO />
      <AccountContextProvider>
        <div
          style={
            {
              '--header-height': `${headerHeight}px`,
              '--app-nav-upper-height': `${upperNavHeight}px`,
              '--app-nav-lower-height': `${lowerNavHeight}px`,
            } as any
          }
        >
          <Header isApp className={css['header']} withStrip={false} withHero={false} />
          <InlineNav />

          <div className={css['app']}>{props.children}</div>

          <BottomNav />
        </div>

        {/* {loggedIn && <BottomNav location={location} />} */}
      </AccountContextProvider>
    </>
  )
}
