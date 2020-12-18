export function GetExcerpt(text: string, length: number = 250) {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }

  return text
}
