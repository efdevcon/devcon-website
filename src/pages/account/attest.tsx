import React from 'react'

export default function Attest() {
  const isBrowser = typeof window !== "undefined"

  return (
    <div>
      <h2>Attest ticket</h2>

      {isBrowser && (
          <React.Suspense fallback={<div />}>
            <p>Attest your ticket, using your web3 account.</p>
          </React.Suspense>
      )}
    </div>
  )
}
