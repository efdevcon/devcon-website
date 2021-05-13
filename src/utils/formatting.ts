export function GetExcerpt(text: string, length: number = 250) {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }

  return text
}

export function GetDomainName(url: string): string {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').split(/[\/?#]/)[0]
}
