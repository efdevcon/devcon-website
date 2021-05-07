import React, { useState } from 'react'
import { useAccountContext } from 'src/context/account-context'
import { UserAccount } from 'src/types/UserAccount'
import { isEmail } from 'src/utils/validators'

export default function Confirm() {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()
  const [account, setAccount] = useState({...accountContext.account} as UserAccount)
  const [error, setError] = useState('')

  function onChange(value: string) {
    if (!account) return

    account.email = value
    setAccount(account)
  }

  async function sendConfirmationEmail() {
    if (accountContext && account) {
      if (account.email && !isEmail(account.email)) {
        setError('No valid email address provided.')
        return
      }

      if (account.email != accountContext.account?.email) { 
        await accountContext.updateAccount(account._id, account)
      }

      // TODO: Send email 
      setError('Ticket attestation email has been sent.')
    }
  }

  if (!account) {
    return <></>
  }

  return (
    <div>
      <h2>Re-send confirmation email</h2>

      {isBrowser && 
      <div>
        <p>If you've purchased a ticket, you should have received a confirmation email to attest your ticket.</p>
        <p>If you've lost the email, use the form below to re-send an activation email and start the attestation process.</p>
        <br/>

        <div>
          <label htmlFor="account-email">Email: </label>
          <input
            type="email"
            id="account-email"
            placeholder="Enter email"
            name="email"
            value={account.email}
            onChange={e => onChange(e.target.value)}
          />
        </div>
        <br />

        <div>
          <button type="button" onClick={sendConfirmationEmail}>
            Submit
          </button>
        </div>
      </div>
      }
    </div>
  )
}
