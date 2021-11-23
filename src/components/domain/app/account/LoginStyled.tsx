import React, { useState } from 'react'
import { navigate, RouteComponentProps, useLocation } from '@reach/router'
import IconSwirl from 'src/assets/icons/swirl.svg'
import css from './login.module.scss'
import pwaIcon from './pwa-icon.png'
import footerRoad from './footer-road.png'
import { Link } from 'src/components/common/link'
import { InputForm } from 'src/components/common/input-form'
import { Button } from 'src/components/common/button'
import IconHelp from 'src/assets/icons/icon-help.svg'
import { Tooltip } from 'src/components/common/tooltip'
import { isEmail } from 'src/utils/validators'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'

export default function LoginPage(props: RouteComponentProps) {
  const [tooltipVisible, setTooltipVisible] = React.useState(false)
  const accountContext = useAccountContext()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const connectWeb3AndLogin = async () => {
    const nonce = await accountContext.getNonce()
    const message = `Sign this message to prove you have access to this wallet. This won't cost you anything.\n\nNonce: ${nonce} *\n * You don't need to remember this.`
    const signedMessage = await accountContext.signMessage(message)

    if (!signedMessage) {
      setError('Unable to connect to web3')
      return
    }

    const userAccount = await accountContext.loginWeb3(
      signedMessage.address,
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

  const connectEmail = async () => {
    if (!isEmail(email)) {
      setError('No valid email address provided.')
      return
    }
    else { 
      setError('')
    }

    const userAccount = await accountContext.loginEmail(email, 123456) // TODO: Email nonce
    if (userAccount) {
      navigate('/app')
    }
    if (!userAccount) {
      const msg = 'Unable to login with email.'
      setError(msg)
    }
  }

  return (
    <div className={css['container']}>
      <div>
        <div className={css['hero']}>
          <div className="section">
            <div className="content">
              {/* Need this layer to have something to position the image relatively to (within the bounds of the parent content div) */}
              <div className={css['hero-content']}>
                <p className={css['devcon']}>Devcon (use image)</p>
                <p className={css['connect']}>Connect —</p>
                <p className={css['description']}>Your personalized passport to the Devcon experience.</p>

                <img className={css['logo']} src={pwaIcon} alt="App logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className={css['info']}>
              <div className={css['left']}>
                <IconSwirl className={`${css['swirl-icon']} icon`} />
              </div>
              <p>
                If this is the first time you're logging in, <b>Connect</b> will automatically create a new account on
                your behalf.
              </p>
            </div>

            <div className={css['alert']}>
              {error && <Alert type="info" message={error} />}
            </div>

            <div className={css['trust-model']}>
              <p>Choose your Trust model.</p>
              <Tooltip arrow={false} visible={tooltipVisible} content={<p>\(x_x)/ 0=('_'Q)</p>}>
                <span onClick={() => setTooltipVisible(!tooltipVisible)}>
                  <IconHelp className={`icon ${css['icon-help']}`} />
                </span>
              </Tooltip>
            </div>

            <div className={css['email']}>
              <p className="bold">Email — Not interested in Web 3 usage</p>
              <InputForm 
                className={css['input']} 
                placeholder="Email"
                defaultValue={email} 
                onChange={(value) => setEmail(value)} 
                onSubmit={connectEmail} />
              <Button className={`black`} onClick={connectEmail}>Connect with Email</Button>
            </div>
            
            <div className={css['wallet']}>
              <p className="bold">Wallet — For Experienced Web 3 Users</p>
              <Button className={`red ${css['button']}`} onClick={connectWeb3AndLogin}>Connect with Ethereum</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={css['footer']}>
        <div className="section">
          <div className="content">
            <div className={css['text']}>
              <p className={css['description']}>
                Devcon facilitates complete ownership over your data, while allowing you to access web3 interactivity
                through our application if you choose to.
              </p>

              <Link className={css['link']} to="https://google.com">
                Learn more
              </Link>
              <Link className={css['link']} to="https://google.com">
                Terms & Conditions
              </Link>
            </div>
            <img className={css['img']} src={footerRoad} alt="Man and dog on road" />
          </div>
        </div>
      </div>
    </div>
  )
}
