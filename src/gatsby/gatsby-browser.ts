import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/assets/css/index.scss'

// import 'src/assets/css/main.scss'

export const onServiceWorkerActive = async (...args) => {
  console.log('SERVICE WORKER ACTIVE');

  Notification.requestPermission(function (status) {
    console.log(status, 'NOTIFICATION STATUS')
  })
  // console.log(args, 'args');
  // Notification.requestPermission(function(status) {
  //   console.log('Notification permission status:', status);
  // });

  // if (navigator.serviceWorker) {
  //   const reg = await navigator.serviceWorker.getRegistration()

  //   if (reg && reg.pushManager) {
  //     const subscription = await reg.pushManager.getSubscription()

  //     console.log(subscription, 'subscription')

  //     if (!subscription) {
  //       const key = await fetch('api/pwa/vapid_key')
  //       const keyData = await key.text()

  //       const sub = await reg.pushManager.subscribe({
  //         applicationServerKey: keyData,
  //         userVisibleOnly: true,
  //       })

  //       await fetch('api/pwa/push_subscribe', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           endpoint: sub.endpoint,
  //           keys: sub.toJSON().keys,
  //         }),
  //       })
  //     }
  //   }
  // }
}

export const onServiceWorkerUpdateReady = () => {
  // const answer = window.confirm(`This application has been updated. Reload to display the latest version?`)

  // if (answer === true) {
  //   window.location.reload()
  // }

  // window.location.reload()
}
