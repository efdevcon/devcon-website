import React, { useState } from 'react'
import Web3Modal from 'web3modal'
import { utils, providers } from 'ethers'
import { Helmet } from 'react-helmet'
import { Link } from '@reach/router'
import Torus from '@toruslabs/torus-embed'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from './common/alert'
import { isEmail } from 'src/utils/validators'

declare var window: any

export default function Connect() {
  const accountContext = useAccountContext()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  async function initWeb3Modal() {
    if (typeof window !== 'undefined' && typeof window.WalletConnectProvider !== 'undefined') {
      const providerOptions = {
        walletconnect: {
          package: window.WalletConnectProvider.default,
          options: {
            infuraId: process.env.INFURA_ID,
          },
        },
        torus: {
          package: Torus,
        },
      }

      return new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions,
      })
    } else {
      setError("Can't init Web3modal - window or WalletConnectProvider undefined")
    }
  }

  const connectWeb3 = async () => {
    const web3Modal = await initWeb3Modal()
    if (web3Modal) web3Modal.clearCachedProvider()

    let web3,
      provider,
      network,
      signer,
      address,
      rawMessage,
      signedMessage = {}
    try {
      web3 = await web3Modal.connect()
      provider = new providers.Web3Provider(web3)

      network = await provider.getNetwork()
      signer = provider.getSigner()
      address = await signer.getAddress()
    } catch (e) {
      const msg = 'Could not connect to web3 wallet.'
      console.log(msg, e)
      setError(msg)
      return
    }

    try {
      const response = await fetch('/api/users/nonce')
      const body = await response.json()
      rawMessage = body.data

      if (web3.wc) {
        signedMessage = await provider.send('personal_sign', [
          utils.hexlify(utils.toUtf8Bytes(rawMessage)),
          address.toLowerCase(),
        ])
      } else {
        signedMessage = await signer.signMessage(rawMessage)
      }
    } catch (e) {
      const msg = 'Did not received signed message.'
      console.log(msg, e)
      setError(msg)
      return
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address.toLowerCase(),
          msg: rawMessage,
          signed: signedMessage,
        }),
      })

      if (response.status === 200) {
        const body = await response.json()
        accountContext.login(body.data)
      } else {
        const data = await response.json()
        setError(data.message)
      }
    } catch (e) {
      const msg = 'Could not login with web3 account'
      console.log(msg, e)
    }
  }

  const connectEmail = async () => {
    if (!isEmail(email)) {
      setError('No valid email address provided.')
      return
    }

    const response = await fetch('/api/users/login/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.status === 200) {
      const body = await response.json()
      accountContext.login(body.data)
    } else {
      const data = await response.json()
      setError(data.message)
    }
  }

  const disconnect = async () => {
    accountContext.logout()
  }

  return (
    <div>
      {/* Can use either react-helmet or include the script from gatsby-browser */}
      <Helmet>
        <script
          type="text/javascript"
          src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js"
        />
      </Helmet>

      {error && <Alert type="info" message={error} />}

      {!accountContext.account && (
        <div>
          <p>If this is the first time you're logging in, it will automatically create a new account.</p>
          <p>
            <strong>Choose Web3 Login method.</strong>
          </p>
          <br />

          <div>
            <h3>For beginning web3 users</h3>
            <input
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <button onClick={connectEmail}>Sign in with email</button>
          </div>

          <br />
          <p>—or—</p>
          <br />

          <div>
            <h3>For experienced users</h3>
            <button onClick={connectWeb3}>Sign in with wallet</button>
          </div>
          <br />

          <p>
            Devcon facilitates complete ownership over your data, while allowing you to access web3 interactivity
            through our application if you choose to participate.
          </p>
          <p>
            <small>
              Your general experience and cross device compatibality may be affected if you choose an existing wallet
              with web3 modal support.
            </small>
          </p>
          <p>
            <a href="#">Learn more</a>
          </p>
        </div>
      )}

      {accountContext.account && (
        <div>
          <p>
            You're already logged in. View your <Link to="/app/profile">profile</Link>.
          </p>
          <br />
          <p>
            <button onClick={disconnect}>Logout</button>
          </p>
        </div>
      )}
    </div>
  )
}
