import 'src/assets/css/main.scss'

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`This application has been updated. Reload to display the latest version?`)

  if (answer === true) {
    window.location.reload()
  }
}
