import React, { useEffect } from 'react'
import Image from 'next/image'
import css from './pwa.module.scss'
import { Modal } from 'components/common/modal'
import IconPlus from 'assets/icons/plus.svg'
import imagePWA from 'assets/images/pwa_prompt.png'

const getIsPWAPossible = () => {
  return true
}

export const PWAPrompt = (props: any) => {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(getIsPWAPossible())
  }, [])

  return (
    <Modal open={open} close={() => setOpen(!open)} className={css['container']}>
      <Image alt="Devcon wizard" className={css['background']} src={imagePWA} />
      <div className={css['content']}>
        <div className={css['tag']}>
          <p className="font-xs bold">DEVCON WEB APP</p>
        </div>
        {/* Should tag be added to design system? */}
        <div className={css['info']}>
          <p className={`${css['cta']} font-xl`}>
            <span className="bold">Devcon.org</span> is now an App! Install on your smartphone.
          </p>

          <div className={css['description']}>
            <button className="squared light-blue sm">
              <IconPlus />
            </button>
            <p className="font-xs bold text-uppercase">
              open your browser menu and “Add to Home Screen” to use app that works offline.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
