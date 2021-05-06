import { Link, navigate } from '@reach/router'
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
  const [account, setAccount] = useState({...accountContext.account} as UserAccount)
  const [error, setError] = useState('')

  function onChange(value: string, type: string) {
    if (!account) return

    if (type === 'username') {
      account.username = value
    }

    if (type === 'email') {
      account.email = value
    }

    setAccount(account)
  }

  async function updateProfile() {
    if (accountContext && account) {
      if (account.email && !isEmail(account.email)) {
        setError('No valid email address provided.')
        return
      }

      const updated = await accountContext.updateAccount(account._id, account)
      if (updated) {
        setError('Profile successfully updated.')
      } else {
        setError('Error updating profile.')
      }
    }
  }

  const connectWallet = async () => {
    if (accountContext && account) {
      const nonce = await accountContext.getNonce()
      const message = `Sign this message to prove you have access to this wallet. This won't cost you anything.\n\nNonce: ${nonce} *\n * You don't need to remember this.`
      const signedMessage = await accountContext.signMessage(message)

      if (!signedMessage) {
        setError('Unable to connect to web3')
        return
      }
      
      account.addresses.push(signedMessage.address)
      const updated = await accountContext.updateAccount(account._id, account)
      if (updated) {
        setError('Profile successfully updated.')
        setAccount(account)
      } else {
        setError('Error adding wallet address.')
      }
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
              onChange={e => onChange(e.target.value, 'username')}
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
              onChange={e => onChange(e.target.value, 'email')}
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
          {account.addresses?.length === 0 && <p>No wallet(s) connected.</p>}
          {account.addresses && account.addresses?.length > 0 && (
            <div>
              <label>Address(es):</label>
              <ul>
                {account.addresses.map(i => {
                  return <li key={i}>{i}</li>
                })}
              </ul>
            </div>
          )}

          <button type="button" onClick={connectWallet}>
            Select wallet
          </button>
          <br />

          <h3>Tickets</h3>
          <small><i>No ticket(s) verified.</i></small>
          <br/>

          <p>*To attest your ticket, please refer to the confirmation email after purchase.</p>
          <p>If you've lost the email. Click <Link to="/app/attest"><b>here</b></Link> to re-send an activation email.</p>
          
          <POAPs address='' />

          <div>
            <button type="button" onClick={() => accountContext.logout(account._id)}>
              Logout
            </button>
          </div>
          <br />
        </>
      )}
    </div>
  )
}
