import React from 'react'

export default function Profile() {
  const [profile, setProfile] = React.useState();

  React.useEffect(() => {
    async function asyncEffect() { 
      const response = await fetch('/api/users/profile')
      if(response.status === 200 && response.body) {
        const body = await response.json()
        setProfile(body.data)
      }
    }

    asyncEffect()
  }, [])
  return (
    <div>
      <h2>User Profile</h2>
      {!profile && <span>Not logged in.</span>}
      {profile && <span>Account: {profile}</span>}
    </div>
  )
}
