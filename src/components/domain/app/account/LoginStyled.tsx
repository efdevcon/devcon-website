import React from 'react'
import { RouteComponentProps } from '@reach/router'
import IconSwirl from 'src/assets/icons/swirl.svg'
import css from './login.module.scss'
import pwaIcon from './pwa-icon.png'
import footerRoad from './footer-road.png'
import { Link } from 'src/components/common/link'
import { InputForm } from 'src/components/common/input-form'
import { Button } from 'src/components/common/button'
import IconHelp from 'src/assets/icons/icon-help.svg'
import { Tooltip } from 'src/components/common/tooltip'

export default function LoginPage(props: RouteComponentProps) {
  const [tooltipVisible, setTooltipVisible] = React.useState(false)

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
              <InputForm className={css['input']} placeholder="Email" />
              <Button className={`black`}>Connect with Email</Button>
            </div>
            <div className={css['wallet']}>
              <p className="bold">Wallet — For Experienced Web 3 Users</p>
              <Button className={`red ${css['button']}`}>Connect with Ethereum</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={css['footer']}>
        <div className="section">
          <div className="content">
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
        </div>
        <img className={css['img']} src={footerRoad} alt="Man and dog on road" />
      </div>
    </div>
  )
}
