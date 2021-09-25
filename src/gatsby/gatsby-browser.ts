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

// import 'src/assets/css/main.scss'

export const onServiceWorkerActive = async (...args) => {
  console.log('SERVICE WORKER ACTIVE');
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`This application has been updated. Reload to display the latest version?`)

  if (answer === true) {
    window.location.reload()
  }

  // window.location.reload()
}
