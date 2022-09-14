import { createContext, useContext } from 'react'
import { providers } from 'ethers'
import { UserAccount } from 'types/UserAccount'
import { SignedMessage } from 'types/SignedMessage'
import { Session } from 'types/Session'
import { VerificationToken } from 'types/VerificationToken'

export interface AccountContextType {
  loading: boolean
  provider: providers.Web3Provider | undefined
  account: UserAccount | undefined
  connectWeb3: () => Promise<providers.Web3Provider | undefined>
  signMessage: (message: string, provider?: providers.Web3Provider) => Promise<SignedMessage | undefined>
  getToken: (identifier: string) => Promise<VerificationToken | undefined>
  loginWeb3: (address: string, nonce: number, message: string, signature: string) => Promise<UserAccount | undefined>
  loginEmail: (email: string, nonce: number) => Promise<UserAccount | undefined>
  logout: (id: string) => Promise<boolean>
  getAccount: () => Promise<UserAccount | undefined>
  updateAccount: (id: string, account: UserAccount) => Promise<boolean>
  deleteAccount: (id: string) => Promise<boolean>,
  setSpeakerFavorite: (account: UserAccount, speakerId: string, remove: boolean) => void,
  setSessionBookmark: (account: UserAccount, session: Session, level: 'attending' | 'interested', remove?: boolean) => void,
  toggleScheduleSharing: (account: UserAccount) => void,
}

export const useAccountContext = () => useContext<AccountContextType>(AccountContext)
export const AccountContext = createContext<AccountContextType>({
  loading: false,
  provider: undefined,
  account: undefined,
  connectWeb3: async () => undefined,
  signMessage: async () => undefined,
  getToken: async () => undefined,
  loginWeb3: async () => undefined,
  loginEmail: async () => undefined,
  logout: async () => false,
  getAccount: async () => undefined,
  updateAccount: async () => false,
  deleteAccount: async () => false,
  setSpeakerFavorite: () => {},
  setSessionBookmark: () => {},
  toggleScheduleSharing: () => {}
})
