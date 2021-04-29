import { createContext, useContext } from 'react'
import { UserAccount } from 'src/types/UserAccount'

export interface AccountContextType {
  account: UserAccount | undefined
  login: (account: UserAccount) => void;
  logout: () => void;
}

export const useAccountContext = () => useContext<AccountContextType>(AccountContext)
export const AccountContext = createContext<AccountContextType>({
  account: undefined,
  login: () => {},
  logout: () => {}
})
