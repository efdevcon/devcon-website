import React from 'react'
import { Link } from 'src/components/common/link'
import { useIntl } from 'react-intl'
import IconTwitter from 'src/assets/icons/twitter.svg'

export const Tweet = React.memo(() => {
  // const [ready, setReady] = React.useState(false)
  const intl = useIntl()

  // // Load twitter script on demand
  // React.useEffect(() => {
  //   if (window.twttr) {
  //     window.twttr.widgets.load()

  //     setReady(true)

  //     return
  //   }

  //   const script = document.createElement('script')

  //   window.twttr = {}

  //   script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
  //   script.setAttribute('async', '')
  //   script.setAttribute('charset', 'utf-8')
  //   script.addEventListener('load', () => {
  //     setReady(true)
  //   })

  //   document.head.appendChild(script)
  // }, [])

  const tweet = intl.formatMessage({ id: 'rtd_share_tweet' })

  return (
    <Link
      to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweet
      )}&hashtags=roadtodevcon&url=${encodeURIComponent('https://devcon.org')}`}
    >
      <button className="white">
        <IconTwitter /> Twitter
      </button>
    </Link>
  )
})
