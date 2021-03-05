import React from 'react'
import { Tooltip } from 'src/components/common/tooltip'
import ShareIcon from 'src/assets/icons/share.svg'
import { Modal } from 'src/components/common/modal'
import { Tweet } from './Tweet'
import { Link } from 'src/components/common/link'
import css from './share.module.scss'

type ShareProps = {
  renderTrigger: (onClick: React.Dispatch<React.SetStateAction<undefined>>) => React.ReactNode
}

// Remove soon
const CopyToClipboardLegacy = ({ url }: any) => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <Tooltip arrow={false} visible={clicked} content={<p>Copied to clipboard</p>}>
      <div style={{ display: 'inline-block', cursor: 'pointer' }}>
        <ShareIcon
          onClick={() => {
            // TO-DO: Make SSR safe so we can conditionally render component
            if (window?.navigator?.clipboard) {
              navigator.clipboard.writeText(url)

              setClicked(true)

              setTimeout(() => {
                setClicked(false)
              }, 800)
            }
          }}
        />
      </div>
    </Tooltip>
  )
}

const CopyToClipboard = ({ url }: any) => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <div className={css['copy-to-clipboard']}>
      <div className={css['link-text']}>{window.location.href}</div>

      <Tooltip arrow={false} visible={clicked} content={<p>Copied to clipboard</p>}>
        <button
          className={css['copy-button']}
          onClick={() => {
            // TO-DO: Make SSR safe so we can conditionally render component
            if (window?.navigator?.clipboard) {
              navigator.clipboard.writeText(window.location.href)

              setClicked(true)

              setTimeout(() => {
                setClicked(false)
              }, 800)
            }
          }}
        >
          Copy Link
        </button>
      </Tooltip>
    </div>
  )
}

export const Share = (props: ShareProps) => {
  const [open, setOpen] = React.useState(false)

  const toggle = () => {
    if (navigator && navigator.share) {
      navigator.share({
        title: 'Road to Devcon',
        text: 'Join us on the Road to Devcon!',
        url: window.location.href,
      })
    } else {
      setOpen(!open)
    }
  }

  if (props.renderTrigger)
    return (
      <>
        <Modal open={open} close={toggle}>
          <div className={css['share']}>
            <h2>SHARE ROAD TO DEVCON</h2>

            <div className={css['twitter']}>
              <Tweet />
            </div>

            <Link
              title="Share by Email"
              to="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
            >
              <button className={css['email']}>Email</button>
            </Link>

            <CopyToClipboard />
          </div>
        </Modal>

        {props.renderTrigger(toggle)}
      </>
    )

  // Remove later
  return <CopyToClipboardLegacy {...props} />
}
