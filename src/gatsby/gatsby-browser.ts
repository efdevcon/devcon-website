import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/assets/css/index.scss'

// import 'src/assets/css/main.scss'

export const onServiceWorkerActive = async (...args) => {
  console.log('SERVICE WORKER ACTIVE');
}

export const onServiceWorkerUpdateReady = () => {
  // const answer = window.confirm(`This application has been updated. Reload to display the latest version?`)

  // if (answer === true) {
  //   window.location.reload()
  // }

  // window.location.reload()
}
