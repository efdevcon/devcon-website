import React from 'react'
import Profile from 'src/components/Profile'

export default function ProfilePage() {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h2>Profile</h2>

      {isBrowser && <Profile />}
    </div>
  )
}