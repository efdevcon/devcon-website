import React from 'react'
import { RouteComponentProps } from '@reach/router'
import IconSwirl from 'src/assets/icons/swirl.svg'
import css from './login.module.scss'

export default function LoginPage(props: RouteComponentProps) {
  return (
    <div>
      <div className={css['hero']}>
        <p>Devcon</p>
        <p>Connect —</p>
        <p>Your personalized passport to the Devcon experience.</p>
      </div>

      <div className={css['info']}>
        <IconSwirl className={`${css['swirl-icon']} icon`} />
        <p>
          If this is the first time you're logging in, <b>Connect</b> will automatically create a new account on your
          behalf.
        </p>
      </div>

      <div className={css['trust-model']}>
        <p>Choose your Trust model.</p>
      </div>
    </div>
  )
}
