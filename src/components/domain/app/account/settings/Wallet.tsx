import React, { useState } from 'react'
import css from './settings.module.scss'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'
import AccountFooter from '../AccountFooter'
import NotFound from './NotFound'
import { Button } from 'src/components/common/button'
import { getSiweMessage } from 'src/utils/web3'
import { navigate } from '@reach/router'
import { Link } from 'src/components/common/link'

export default function WalletSettings() {
  const accountContext = useAccountContext()
  const [error, setError] = useState('')

  if (!accountContext.account) {
    return null
  }

  const addWallet = async () => {
    const provider = await accountContext.connectWeb3()
    if (!provider) { 
      setError('Unable to connect to Web3 provider')
      return
    }

    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const token = await accountContext.getToken(address.toLowerCase())
    if (!token) { 
      setError('Unable to create verification token')
      return
    }

    const message = getSiweMessage(address, token)
    const signedMessage = await accountContext.signMessage(message, provider)
    if (!signedMessage) {
      setError('Unable to sign message')
      return
    }

    const userAccount = await accountContext.loginWeb3(
      signedMessage.address.toLowerCase(),
      token.nonce,
      signedMessage.message,
      signedMessage.signature
    )
    if (userAccount) {
      navigate('/app')
    }
    if (!userAccount) {
      setError('Unable to login with web3')
    }
  }

  return (
    <div className={css['container']}>
      <div>
        <div className="section">
          <div className="content">

            <div className={css['alert']}>
              {error && <Alert type="info" message={error} />}
            </div>

            <div className={css['form']}>
              <p className={`${css['title']} title`}>Manage Wallets</p>

              {accountContext.account.addresses?.length === 0 && 
                <div className={css['wallet-not-found']}>
                  <NotFound type='wallet' />
                </div>
              }

              {accountContext.account.addresses?.length > 0 && 
                <ul className={css['items']}>
                  {accountContext.account.addresses.map(i => {
                    return <li key={i}><Link to={`https://etherscan.io/address/${i}`}>{i}</Link></li>
                  })}
                </ul>
              }
                            
              <Button className={`red`} onClick={addWallet}>Add Ethereum Wallet</Button>
            </div>
          </div>
        </div>
      </div>

      <AccountFooter />
    </div>
  )
}
