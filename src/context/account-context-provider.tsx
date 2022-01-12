import React, { ReactNode, useState } from 'react'
import { utils, providers } from 'ethers'
import { UserAccount } from 'src/types/UserAccount'
import { AccountContext, AccountContextType } from './account-context'
import { getWeb3Modal } from 'src/utils/web3'
import { SignedMessage } from 'src/types/SignedMessage'
import { navigate } from '@reach/router'
import { Session } from 'src/types/Session'
import { Web3Provider } from '@ethersproject/providers'

interface AccountContextProviderProps {
  children: ReactNode
}

export const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
  const [context, setContext] = useState<AccountContextType>({
    loading: true,
    provider: undefined,
    account: undefined,
    connectWeb3,
    signMessage,
    getNonce,
    loginWeb3,
    loginEmail,
    verifyEmail,
    logout,
    getAccount,
    updateAccount,
    deleteAccount,
    setSpeakerFavorite: (speakerId: string, remove: boolean): void => {
      if (!context.account) return

      let nextSpeakerFavorites = {
        ...context.account?.appState?.favoritedSpeakers,
      }

      if (remove) {
        delete nextSpeakerFavorites[speakerId]
      } else {
        nextSpeakerFavorites = {
          ...nextSpeakerFavorites,
          [speakerId]: true,
        }
      }

      const nextAccountState = {
        ...context.account,
        appState: {
          ...context.account.appState,
          updatedAt: new Date(),
          favoritedSpeakers: nextSpeakerFavorites,
        },
      }

      setContext({
        ...context,
        account: nextAccountState,
      })
    },
    setSessionBookmark: (session: Session, interestLevel: 'interested' | 'attending', remove?: boolean): void => {
      if (!context.account) return

      let nextBookmarkedSessions = {
        ...context.account?.appState?.bookmarkedSessions,
      }

      if (remove) {
        delete nextBookmarkedSessions[session.id]
      } else {
        nextBookmarkedSessions = {
          ...nextBookmarkedSessions,
          [session.id]: {
            interestLevel,
            // Start and end time need to be saved at time of bookmarking - allows us to create "session changed" notifications client side by diffing the schedule with the bookmarked snapshots
            start: session.start,
            end: session.end,
          },
        }
      }

      const nextAccountState = {
        ...context.account,
        appState: {
          ...context.account?.appState,
          updatedAt: new Date(),
          bookmarkedSessions: nextBookmarkedSessions,
        },
      }

      setContext({
        ...context,
        account: nextAccountState,
      })
    },
  })

  React.useEffect(() => {
    async function asyncEffect() {
      await getAccount()
    }

    asyncEffect()
  }, [])

  async function connectWeb3(): Promise<providers.Web3Provider | undefined> {
    try {
      const web3Modal = getWeb3Modal()
      if (!web3Modal) {
        console.error('Unable to initialize web3Modal')
        return
      }

      web3Modal.clearCachedProvider()
      const web3 = await web3Modal.connect()
      const provider = new providers.Web3Provider(web3)
      setContext({ ...context, provider: provider })
      return provider
    } catch (e) {
      console.log('Unable to connect to web3')
      console.error(e)
    }
  }

  async function signMessage(message: string, provider?: Web3Provider): Promise<SignedMessage | undefined> {
    let web3Provider = provider ?? context.provider
    if (!web3Provider) {
      web3Provider = await connectWeb3()
    }
    if (!web3Provider) {
      console.error('Unable to initialize Web3Provider')
      return
    }

    try {
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      let signature = ''

      if (web3Provider.provider?.wc) {
        signature = await web3Provider.send('personal_sign', [
          utils.hexlify(utils.toUtf8Bytes(message)),
          address.toLowerCase(),
        ])
      } else {
        signature = await signer.signMessage(message)
      }

      return {
        address,
        message,
        signature,
      } as SignedMessage
    } catch (e) {
      console.log('Unable to sign message')
      console.error(e)
    }
  }

  async function getNonce(): Promise<number | undefined> {
    const response = await fetch('/api/account/nonce', {
      method: 'GET',
    })

    if (response.status === 200) {
      const body = await response.json()
      return body.data
    }
  }

  async function loginWeb3(address: string, message: string, signature: string): Promise<UserAccount | undefined> {
    const response = await fetch('/api/account/login/web3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: address.toLowerCase(),
        msg: message,
        signed: signature,
      }),
    })

    const body = await response.json()
    if (response.status === 200) {
      setContext({ ...context, account: body.data })
      return body.data
    }

    // else: set error/message
  }

  async function loginEmail(email: string): Promise<boolean> {
    const response = await fetch('/api/account/login/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.toLowerCase(),
      }),
    })

    return response.status === 200
  }

  async function verifyEmail(email: string, code: string): Promise<UserAccount | undefined> {
    const response = await fetch('/api/account/login/email/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.toLowerCase(),
        code: Number(code),
      }),
    })

    if (response.status === 200) {
      const body = await response.json()
      setContext({ ...context, account: body.data })
      return body.data
    }

    // else: set error/message
  }

  async function logout(): Promise<boolean> {
    // if (!context.web3Modal) return false // isSSR

    // context.web3Modal.clearCachedProvider()
    const response = await fetch('/api/account/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.status === 200) {
      setContext({ ...context, provider: undefined, account: undefined, loading: true })
      navigate('/app/login')
      return true
    }

    // else: set error/message
    return false
  }

  async function getAccount(): Promise<UserAccount | undefined> {
    const response = await fetch('/api/account', {
      method: 'GET',
    })

    if (response.status === 200) {
      const body = await response.json()
      setContext({ ...context, account: body.data, loading: false })
      return body.data
    }

    setContext({ ...context, loading: false })
    // else: set error/message
  }

  async function updateAccount(id: string, account: UserAccount): Promise<boolean> {
    const response = await fetch('/api/account/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ account }),
    })

    if (response.status === 204) {
      setContext({ ...context, account: account })
      return true
    }

    // else: set error/message
    return false
  }

  async function deleteAccount(id: string): Promise<boolean> {
    const response = await fetch('/api/account/delete/' + id, {
      method: 'DELETE',
    })

    if (response.status === 200) {
      // TODO: delete & logout
      return true
    }

    // else: set error/message
    return false
  }

  return <AccountContext.Provider value={context}>{children}</AccountContext.Provider>
}
