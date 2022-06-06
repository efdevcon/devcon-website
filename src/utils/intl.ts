// Allows translations nested in objects for easier management
function flattenMessages(nestedMessages: any, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages: any, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}_${key}` : key

    if (typeof value === 'string') {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

export async function getMessages(locale: string) {
  if (locale === 'es') {
    const beforeFlatten = (await import(`../content/i18n/es.json`)).default
    
    return flattenMessages(beforeFlatten);
  }

  const beforeFlatten = (await import(`../content/i18n/en.json`)).default
    
  return flattenMessages(beforeFlatten);
}