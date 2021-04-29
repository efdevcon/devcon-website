import React from 'react'
import { useAccountContext } from 'src/context/account-context'

export default function Profile() {
  const accountContext = useAccountContext();

  return (
    <div>
      {!accountContext.account && <span>Not logged in.</span>}
      {accountContext.account && <span>Account: {accountContext.account?.uid}</span>}
    </div>
  )
}
