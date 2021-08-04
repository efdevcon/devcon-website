export interface DevconEdition {
  id: string
  number: number
  title: string
  description: string
  location: string
  startDate?: Date
  endDate?: Date
  imageUrl: string
  image: any
  links: Array<{
    title: string
    url: string
  }>
}
