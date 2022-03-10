export async function getMessages(locale: string) {
  if (locale === 'es')
    return (await import(`../../content/i18n/es.json`)).default

  return (await import(`../../content/i18n/en.json`)).default
}