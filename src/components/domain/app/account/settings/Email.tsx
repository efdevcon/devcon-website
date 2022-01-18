import React, { useState } from 'react'
import css from './settings.module.scss'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'
import AccountFooter from '../AccountFooter'
import { Button } from 'src/components/common/button'
import { InputForm } from 'src/components/common/input-form'
import { isEmail } from 'src/utils/validators'
import { navigate } from '@reach/router'

export default function EmailSettings() {
  const accountContext = useAccountContext()
  const currentAccount = accountContext.account
  const [email, setEmail] = useState(currentAccount?.email ?? '')
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [nonce, setNonce] = useState('')

  if (!accountContext.account) {
    return <></>
  }

  const buttonText = accountContext.account.email ? 'Update Email' : 'Add Email'

  const connectEmail = async () => {
    if (!isEmail(email)) {
      setError('Please provide a valid email address.')
      return
    }
    else { 
      setError('')
    }

    const token = await accountContext.getToken(email)
    if (token) {
      setEmailSent(true)
    }
    else { 
      setEmailSent(false)
      setError('Unable to create verification token')
    }
  }

  const verifyEmail = async () => {
    const nonceNr = Number(nonce)
    if (isNaN(nonceNr)) {
      setError('Please provide a valid verification code.')
      return
    }

    const userAccount = await accountContext.loginEmail(email, nonceNr)
    console.log('EMAIL VERIFIED', userAccount)
    if (userAccount) {
      navigate('/app')
    }
    if (!userAccount) {
      setError('Unable to verify your email address.')
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
              <p className={'title'}>Manage Email</p>

              {emailSent && <>
                <p>
                  We've sent a verification code to your email address. Please enter this code on below.
                </p>
                <InputForm 
                  className={css['input']} 
                  placeholder="Verification code"
                  defaultValue={nonce} 
                  onChange={(value) => setNonce(value)} 
                  onSubmit={verifyEmail} />
                <Button className={`red`} onClick={verifyEmail}>Verify your email</Button>
                </>
              }

              {!emailSent && <>
                <InputForm 
                  className={css['input']} 
                  placeholder="Email"
                  defaultValue={email} 
                  onChange={(value) => setEmail(value)} 
                  onSubmit={connectEmail} />
                  
                <Button className={`red`} onClick={connectEmail}>{buttonText}</Button>
                </>
              }
            </div>
            
          </div>
        </div>
      </div>

      <AccountFooter />
    </div>
  )
}
