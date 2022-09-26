import React, { useEffect } from 'react'
import Image from 'next/image'
import css from './pwa.module.scss'
import { Modal } from 'components/common/modal'
import IconPlus from 'assets/icons/plus.svg'
import imagePWA from 'assets/images/pwa_prompt.png'
import { Button } from 'components/common/button'
import { pwaUtilities } from './pwa-utilities'
import moment from 'moment'

export const PWAPrompt = () => {
  const [open, setOpen] = React.useState(false)

  const { requiresManualInstall, deferredInstallEvent, setDeferredInstallEvent } = pwaUtilities.useDetectInstallable({
    togglePrompt: () => setOpen(true),
  })

  useEffect(() => {
    if (requiresManualInstall) {
      const lastRejectionTimestamp = localStorage.getItem('pwa_denied_timestamp')

      if (lastRejectionTimestamp) {
        const nowMinusThreshold = moment.utc().subtract(8, 'hours')
        const lastRejection = moment.utc(lastRejectionTimestamp)

        if (!nowMinusThreshold.isAfter(lastRejection)) {
          return
        }
      }

      localStorage.setItem('pwa_denied_timestamp', moment.utc().valueOf() + '')
      setOpen(true)
    }
  }, [requiresManualInstall])

  return (
    <Modal open={open} close={() => setOpen(!open)} className={css['modal']}>
      <Image alt="Devcon wizard" objectFit="cover" className={css['background']} src={imagePWA} />
      <div className={css['content']}>
        <div className={css['tag']}>
          <p className="font-xs bold">DEVCON WEB APP</p>
        </div>

        <div className={css['info']}>
          <p className={`${css['cta']} font-xl`}>
            This website can be used as an <span className="bold">App!</span> Install by following the instructions
            below.
          </p>

          <div className={css['description']}>
            {requiresManualInstall ? (
              (() => {
                if (requiresManualInstall === 'ios') {
                  return (
                    <p className="font-xs bold text-uppercase">
                      Instructions: Press &quot;Share&quot; icon then &quot;Add to home&quot;
                    </p>
                  )
                } else if (requiresManualInstall === 'samsung') {
                  return (
                    <p className="font-xs bold text-uppercase">
                      Instructions: An &quot;Install&quot; icon will be shown on the top bar OR press &quot;Menu&quot;
                      on the bottom bar then &quot;Add/install to home&quot;
                    </p>
                  )
                }

                return (
                  <p className="font-xs bold text-uppercase">
                    Instructions: Press menu on the bottom/top bar then &quot;Add/install to home&quot;
                  </p>
                )
              })()
            ) : (
              <>
                <Button
                  className="squared light-blue sm"
                  onClick={() =>
                    pwaUtilities.installPwa({
                      togglePrompt: () => setOpen(false),
                      deferredInstallEvent,
                      setDeferredInstallEvent,
                    })
                  }
                >
                  <IconPlus />
                </Button>

                <p className="font-xs bold text-uppercase">
                  Install on your device by clicking the button and accepting the prompt!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
