import { navigate } from '@reach/router'
import React, { ReactNode } from 'react'
import { UserAccount } from 'src/types/UserAccount'
import { AccountContext, AccountContextType } from './account-context'

interface AccountContextProviderProps {
  children: ReactNode
}

export const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
  const [context, setContext] = React.useState<AccountContextType>({
    account: undefined,
    login,
    updateProfile,
    logout,
  })

  React.useEffect(() => {
    async function asyncEffect() {
      const response = await fetch('/api/users/profile')

      if (response.status === 200 && response.body) {
        const body = await response.json()
        updateContext(body.data)
      }
    }

    asyncEffect()
  }, [])

  async function login(account: UserAccount) {
    console.log('login', account)

    updateContext(account)

    navigate('/app/profile')
  }

  async function updateProfile(account: UserAccount): Promise<boolean> {
    console.log('updateProfile', account)

    const response = await fetch('/api/users/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account }),
    })

    if (response.status === 200) {
      updateContext(account)
      return true
    } else {
      return false
    }
  }

  async function logout() {
    console.log('logout')

    await fetch('/api/users/logout', { method: 'POST' })
    updateContext(undefined)
    navigate('/app/login')
  }

  function updateContext(account: UserAccount | undefined) {
    setContext({
      account,
      login,
      updateProfile,
      logout,
    })
  }

  return <AccountContext.Provider value={context}>{children}</AccountContext.Provider>
}
