import React from 'react'
import css from './share.module.scss'

export const Tweet = React.memo(() => {
  const [ready, setReady] = React.useState(false)

  // Load twitter script on demand
  React.useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load()

      setReady(true)

      return
    }

    const script = document.createElement('script')

    window.twttr = {}

    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    script.setAttribute('async', '')
    script.setAttribute('charset', 'utf-8')
    script.addEventListener('load', () => {
      setReady(true)
    })

    document.head.appendChild(script)
  }, [])

  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      data-hashtags="roadtodevcon"
      className={`${css['twitter']} twitter-share-button`}
      data-show-count="false"
    >
      Tweet
    </a>
  )
})
