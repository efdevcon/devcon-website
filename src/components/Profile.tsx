import { navigate } from '@reach/router';
import React, { useEffect, useState } from 'react'
import { useAccountContext } from 'src/context/account-context'
import { UserAccount } from 'src/types/UserAccount';

export default function Profile() {
  const accountContext = useAccountContext();
  const [account, setAccount] = useState<UserAccount>()

  useEffect(() => {
    if (accountContext.account) {
      setAccount(accountContext.account)
    }

  }, [accountContext.account])

  function onChange(e: any, type: string) {
    if (!account) return

    let newAccount = {...account}
    if (type === 'username') {
      newAccount.username = e.target.value
    }

    if (type === 'email') {
      newAccount.email = e.target.value
    }

    setAccount(newAccount)
  }

  async function updateProfile() { 
    if (accountContext && account) { 
      await accountContext.updateProfile(account)
    }
  }

  if (!account) {
    return <></>
  }

  return (
    <div>
      {account &&
        <>
        <h3>Edit Info</h3>
        <div>
          <label htmlFor="account-username">Username:</label>
          <input type="text" id="account-username" placeholder="Enter username" name="username" value={account.username} onChange={(e) => onChange(e, 'username')} />
        </div>

        <div>
          <label htmlFor="account-email">Email:</label>
          <input type="email" id="account-email" placeholder="Enter email" name="email" value={account.email} onChange={(e) => onChange(e, 'email')} />
        </div>

        <br/>

        <div>
          <button type='button' onClick={() => updateProfile()}>Update profile</button> &nbsp;
        </div>

        <br/>

        <h3>Add wallet</h3>
        {account.addresses.length === 0 && <p>No wallet(s) connected.</p>}
        {account.addresses.length > 0 && 
          <div>
            <label>Address(es):</label>
            <ul>
              {account.addresses.map(i => {
                return <li key={i}>{i}</li>
              })}
            </ul>
          </div>
        }

        <br/>

        <h3>Tickets</h3>
        <p>No ticket(s).</p>
        <button type='button' onClick={() => navigate('/app/attest')}>Attest Ticket</button> &nbsp;

        <br/><br/>

        <div>
          <button type='button' onClick={() => accountContext.logout()}>Logout</button> &nbsp;
        </div>
        <br/>
        </>
      }
    </div>
  )
}
