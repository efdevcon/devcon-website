const addListener = (keys: string[], modifiers = false, callback) => {
  const handler = e => {
    if (e.defaultPrevented) {
      return
    }

    if (modifiers && !modifiers.every(modifier => e[modifier])) return

    var key = e.key || e.keyCode

    if (keys.includes(key)) {
      callback(e, true)
    }
  }

  document.addEventListener('keyup', handler)

  return () => document.removeEventListener('keyup', handler)
}

export default addListener
