import React from 'react'
import ReactDOM from 'react-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/assets/css/index.scss'

// Safari 100vh works poorly - this is the workaround
if (typeof window !== 'undefined') {
  const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--viewport-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', appHeight)
  window.addEventListener('orientationchange', appHeight)
  appHeight()
}

if (typeof window !== 'undefined') {
  console.log('undefined window')
  if (navigator.serviceWorker) {
    console.log('adding event listener')
    navigator.serviceWorker.addEventListener('message', async event => {
      console.log('message')
    })
  }
}

export const onServiceWorkerActive = async (...args) => {
  console.log('SERVICE WORKER ACTIVE')

  navigator.serviceWorker.addEventListener('message', async event => {
    console.log('message 2')
  })
}

export const onServiceWorkerUpdateReady = () => {
  // const answer = window.confirm(`This application has been updated. Reload to display the latest version?`)

  // if (answer === true) {
  //   window.location.reload()
  // }

  const root = document.body.appendChild(document.createElement('div'))

  ReactDOM.render(
    <div>
      <p>
        This app has been updated in the&nbsp;background.
        <br />
        Refresh to see the latest&nbsp;version.
      </p>
      <button onClick={() => window.location.reload()}>Refresh</button>
      <button onClick={() => document.body.removeChild(root)}>Close</button>
    </div>,
    root
  )
}
