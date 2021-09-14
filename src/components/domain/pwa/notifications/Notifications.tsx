import React from 'react'

// Copied from the web-push documentation
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async (subscription: any) => {
  await fetch('http://localhost:9000/api/pwa/push_subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
      keys: subscription.toJSON().keys,
    }),
  })
}

const subscribePushService = async () => {
  const reg = await navigator.serviceWorker.getRegistration()

  if (reg && reg.pushManager) {
    const subscription = await reg.pushManager.getSubscription()

    if (!subscription) {
      const key = await fetch('http://localhost:9000/api/pwa/vapid')
      const keyData = await key.text()

      const newSubscription = await reg.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(keyData),
        userVisibleOnly: true,
      })

      await saveSubscription(newSubscription)
    } else {
      // Syncing with backend even if subscription already exists (just in case it didn't get persisted when it was created; should keep us edge case free)
      await saveSubscription(subscription)
    }
  }
}

const useNotifications = () => {
  const [consentStatus, setConsentStatus] = React.useState<any>(null)

  React.useEffect(() => {
    setConsentStatus(Notification.permission)

    navigator.serviceWorker.ready.then(() => {
      Notification.requestPermission(function (status) {
        console.log('thening fulfilled promise 1')
        setConsentStatus(status)
      })
    })

    // if (navigator?.serviceWorker?.controller?.state === 'activated') {
    //   Notification.requestPermission(function (status) {
    //     setConsentStatus(status)
    //   })
    // } else {
    //   navigator.serviceWorker.ready.then(() => {
    //     Notification.requestPermission(function (status) {
    //       setConsentStatus(status)
    //     })
    //   })
    // }
  }, [])

  React.useEffect(() => {
    if (consentStatus === 'granted') {
      navigator.serviceWorker.ready.then(() => {
        console.log('thening fulfilled promise 2')
        subscribePushService()
      })
      // if (navigator?.serviceWorker?.controller?.state === 'activated') {
      //   subscribePushService()
      // } else {
      //   navigator.serviceWorker.ready.then(() => {
      //     subscribePushService()
      //   })
      // }
    }
  }, [consentStatus])

  console.log(consentStatus, 'consent status')

  return consentStatus === 'granted'
}

export const Notifications = () => {
  const notificationsEnabled = useNotifications()

  return (
    <div>{notificationsEnabled ? <div>Notifications are enabled</div> : <div>Notifications are disabled</div>}</div>
  )
}
