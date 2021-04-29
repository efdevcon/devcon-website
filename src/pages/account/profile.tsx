import React from 'react'

export default function Profile() {
  const isBrowser = typeof window !== "undefined"

  return (
    <div>
      <h2>User Profile</h2>

      {isBrowser && (
          <React.Suspense fallback={<div />}>
            <p>Logged-in user profile.</p>
            <p>Address, Email, Username, Ticket, etc.</p>
          </React.Suspense>
      )}
    </div>
  )
}
