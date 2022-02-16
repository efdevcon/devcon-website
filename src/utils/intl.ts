export async function getMessages(locale: string) { 
  const intl = (await import(`../../content/i18n/${locale}.json`)).default
  return intl
}