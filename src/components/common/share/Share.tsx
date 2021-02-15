import React from 'react'
import { Tooltip } from 'src/components/common/tooltip'
import ShareIcon from 'src/assets/icons/share.svg'

export const Share = ({ url }: any) => {
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
