import React, { useState } from 'react'
import css from './settings.module.scss'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'
import AccountFooter from '../AccountFooter'

export default function WalletSettings() {
  const accountContext = useAccountContext()
  const currentAccount = accountContext.account
  const [error, setError] = useState('')

  return (
    <div className={css['container']}>
      <div>
        <div className="section">
          <div className="content">

            <div className={css['alert']}>
              {error && <Alert type="info" message={error} />}
            </div>

            <h3>Addresses</h3>
            {currentAccount && currentAccount.addresses.map(i => {
              return <p key={i}>{i}</p>
            })}
          </div>
        </div>
      </div>

      <AccountFooter />
    </div>
  )
}
