export interface DevconEdition {
  id: string
  number: number
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  imageUrl: string
  links: Array<{
    title: string
    url: string
  }>
}
