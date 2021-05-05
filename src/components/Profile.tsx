import { navigate } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { useAccountContext } from 'src/context/account-context'
import { UserAccount } from 'src/types/UserAccount'
import Torus from '@toruslabs/torus-embed'
import Web3Modal from 'web3modal'
import { utils, providers } from 'ethers'
import { Alert } from './common/alert'
import { POAPs } from './domain/poaps'
import { isEmail } from 'src/utils/validators'

declare var window: any

export default function Profile() {
  const accountContext = useAccountContext()
  const [account, setAccount] = useState<UserAccount>()
  const [error, setError] = useState('')

  console.log('INIT Profile', process.env.GATSBY_INFURA_ID, process.env.INFURA_ID)
  const infuraId = process.env.GATSBY_INFURA_ID ?? process.env.INFURA_ID

  useEffect(() => {
    if (accountContext.account) {
      setAccount(accountContext.account)
    }
  }, [accountContext.account])

  function onChange(e: any, type: string) {
    if (!account) return

    let newAccount = { ...account }
    if (type === 'username') {
      newAccount.username = e.target.value
    }

    if (type === 'email') {
      newAccount.email = e.target.value
    }

    setAccount(newAccount)
  }

  async function updateProfile() {
    if (accountContext && account) {
      if (account.email && !isEmail(account.email)) {
        setError('No valid email address provided.')
        return
      }

      const updated = await accountContext.updateProfile(account)
      if (updated) {
        setError('Profile successfully updated.')
      } else {
        setError('Error updating profile.')
      }
    }
  }

  async function initWeb3Modal() {
    if (typeof window !== 'undefined' && typeof window.WalletConnectProvider !== 'undefined') {
      const providerOptions = {
        walletconnect: {
          package: window.WalletConnectProvider.default,
          options: {
            infuraId: process.env.infuraId,
          },
        },
        torus: {
          package: Torus,
        },
      }

      return new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions,
      })
    } else {
      console.log("Can't init Web3modal - window or WalletConnectProvider undefined")
    }
  }

  const connectWeb3 = async () => {
    const web3Modal = await initWeb3Modal()
    if (web3Modal) web3Modal.clearCachedProvider()

    let web3,
      provider,
      network,
      signer,
      address,
      rawMessage,
      signedMessage = {}
    try {
      web3 = await web3Modal.connect()
      provider = new providers.Web3Provider(web3)

      network = await provider.getNetwork()
      signer = provider.getSigner()
      address = await signer.getAddress()
    } catch (e) {
      const msg = 'Could not connect to web3 wallet.'
      console.log(msg, e)
      return
    }

    try {
      const response = await fetch('/api/users/nonce')
      const body = await response.json()
      rawMessage = body.data

      if (web3.wc) {
        signedMessage = await provider.send('personal_sign', [
          utils.hexlify(utils.toUtf8Bytes(rawMessage)),
          address.toLowerCase(),
        ])
      } else {
        signedMessage = await signer.signMessage(rawMessage)
      }
    } catch (e) {
      const msg = 'Did not received signed message.'
      console.log(msg, e)
      return
    }
  }

  if (!account) {
    return <></>
  }

  return (
    <div>
      {account && (
        <>
          {error && <Alert type='info' message={error} />}
          <br />

          <h3>Edit Info</h3>
          <div>
            <label htmlFor="account-username">Username:</label>
            <input
              type="text"
              id="account-username"
              placeholder="Enter username"
              name="username"
              value={account.username}
              onChange={e => onChange(e, 'username')}
            />
          </div>
          <div>
            <label htmlFor="account-email">Email:</label>
            <input
              type="email"
              id="account-email"
              placeholder="Enter email"
              name="email"
              value={account.email}
              onChange={e => onChange(e, 'email')}
            />
          </div>
          <br />

          <div>
            <button type="button" onClick={() => updateProfile()}>
              Update profile
            </button>
          </div>
          <br />

          <h3>Add wallet</h3>
          {account.addresses.length === 0 && <p>No wallet(s) connected.</p>}
          {account.addresses.length > 0 && (
            <div>
              <label>Address(es):</label>
              <ul>
                {account.addresses.map(i => {
                  return <li key={i}>{i}</li>
                })}
              </ul>
            </div>
          )}

          <button type="button" onClick={connectWeb3}>
            Select wallet
          </button>
          <br />

          <h3>Tickets</h3>
          <p>No ticket(s).</p>
          <button type="button" onClick={() => navigate('/app/attest')}>
            Attest Ticket
          </button>
          <br />
          <br />

          <POAPs address='' />

          <div>
            <button type="button" onClick={() => accountContext.logout()}>
              Logout
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  )
}
