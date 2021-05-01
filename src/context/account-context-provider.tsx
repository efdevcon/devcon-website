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
    logout
  })

  React.useEffect(() => {
    async function asyncEffect() { 
      const response = await fetch('/api/users/profile')

      if(response.status === 200 && response.body) {
        const body = await response.json()
        setContext({ 
          account: body.data,
          login,
          logout
        })
      }
    }

    asyncEffect()
  }, [])

  async function login(account: UserAccount) { 
    console.log('Login', account)
    setContext({ ...context, account: account })
  }

  async function logout() { 
    console.log('Logout')
    await fetch('/api/users/logout', { method: 'POST' })
    setContext({ ...context, account: undefined })
  }

  return <AccountContext.Provider value={context}>{children}</AccountContext.Provider>
}
