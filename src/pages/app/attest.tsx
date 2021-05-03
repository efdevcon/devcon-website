import React from 'react'

export default function Attest() {
  const isBrowser = typeof window !== "undefined"

  return (
      <div>
        <h2>Attest Ticket</h2>

        {isBrowser && (
          <p>Attest your ticket, using your web3 account.</p>
        )}
      </div>
  )
}
