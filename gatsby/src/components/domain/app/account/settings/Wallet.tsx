import React, { useState } from 'react'
import css from './settings.module.scss'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'
import AccountFooter from '../AccountFooter'
import NotFound from './NotFound'
import IconCross from 'src/assets/icons/cross.svg'
import { Button } from 'src/components/common/button'
import { getSiweMessage } from 'src/utils/web3'
import { navigate } from '@reach/router'
import { Link } from 'src/components/common/link'
import { useActiveAddress } from 'src/hooks/useActiveAddress'
import { Tooltip } from 'src/components/common/tooltip'

export default function WalletSettings() {
  const accountContext = useAccountContext()
  const activeAddress = useActiveAddress()
  const [error, setError] = useState('')
  const [promptRemove, setPromptRemove] = useState('')
  const [tooltipVisible, setTooltipVisible] = useState(false)

  if (!accountContext.account) {
    return null
  }

  const canDelete = (accountContext.account.addresses && accountContext.account.addresses.length > 0) || !!accountContext.account.email

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
      // navigate('/app')
    }
    if (!userAccount) {
      setError('Unable to login with web3')
    }
  }

  const removeWallet = async () => {
    if (!accountContext.account) return 

    await accountContext.updateAccount(accountContext.account._id, 
      {...accountContext.account, addresses: accountContext.account.addresses.filter(i => i !== promptRemove)})
    
    setPromptRemove('')
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
                    const isActive = activeAddress === i.toLowerCase()

                    return <li key={i}>
                      <Link to={`https://etherscan.io/address/${i}`}>
                        <span className={isActive ? 'semi-bold' : ''}>{i}</span>
                        {isActive && <> (active)</>}
                      </Link>

                      {canDelete && 
                        <span role='button' className={css['delete']} onClick={() => setPromptRemove(i)}><IconCross /></span>
                      }

                      {!canDelete && 
                        <Tooltip arrow={false} visible={tooltipVisible} content={<p>Can't delete this address. You need at least 1 wallet or your email address connected.</p>}>
                          <span role='button' className={css['disabled']} onClick={() => setTooltipVisible(!tooltipVisible)}>
                            <IconCross />
                          </span>
                        </Tooltip>
                      }
                    </li>
                  })}
                </ul>
              }
              
              {promptRemove && <>
                <p>Are you sure you want to remove <strong>{promptRemove}</strong> from your account?</p>
                <Button className={`black ${css['button']}`} onClick={() => setPromptRemove('')}>No, keep address</Button>
                <Button className={`red ${css['button']}`} onClick={removeWallet}>Yes, delete address</Button>
              </>}

              {!promptRemove && <Button className={`red`} onClick={addWallet}>Add Ethereum Wallet</Button>}
            </div>
          </div>
        </div>
      </div>

      <AccountFooter />
    </div>
  )
}
