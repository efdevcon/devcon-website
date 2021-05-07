import { useLocation } from '@reach/router';
import React from 'react'
import { useAccountContext } from 'src/context/account-context'

export default function Attest() {
  const isBrowser = typeof window !== 'undefined'
  const accountContext = useAccountContext()

  const search = new URLSearchParams(useLocation().search);
  const ticketId = search.get('ticketId')

  if (!accountContext.account) {
    return <></>
  }

  return (
    <div>
      <h2>Attest Ticket</h2>

      {isBrowser && 
      <div>
        <p>
          <small><i>*AlphaWallet integration</i></small>
        </p>
        <br/>

        <p>Use your web3 account to attest your ticket.</p>
        {ticketId && <p>Ticket ID: <b>{ticketId}</b></p>}
        <br/>
      </div>
      }
    </div>
  )
}
