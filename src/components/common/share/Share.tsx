import React from 'react'
import { Tooltip } from 'src/components/common/tooltip'
import ShareIcon from 'src/assets/icons/share.svg'
import css from './share.module.scss'

const CopyToClipboard = ({ url }: any) => {
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

export const Share = (props: any) => {
  return <CopyToClipboard {...props} />
}
