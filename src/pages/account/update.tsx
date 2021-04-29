import React from 'react'

export default function Update() {
  const isBrowser = typeof window !== "undefined"

  return (
    <div>
      <h2>Update Profile</h2>

      {isBrowser && (
          <React.Suspense fallback={<div />}>
            <p>Add email address, or connect your web3 account to your profile.</p>
          </React.Suspense>
      )}
    </div>
  )
}
