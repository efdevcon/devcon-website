import React from 'react'
import { AccountContextProvider } from 'context/account-context-provider'
import { BottomNav, InlineNav } from 'components/domain/app/navigation'
import css from './app.module.scss'
import { Header } from 'components/common/layouts/header'
import { useAccountContext } from 'context/account-context'

export const AppLayout = (props: any) => {
  const accountContext = useAccountContext()
  const loggedIn = !!accountContext.account

  return (
    <AccountContextProvider>
      <Header className={css['header']} withStrip={false} withHero={false} />
      <InlineNav />
      
      <div className={css['app']}>
        {props.children}
      </div>

      {loggedIn && <BottomNav location={location} />}
    </AccountContextProvider>
  )
}
