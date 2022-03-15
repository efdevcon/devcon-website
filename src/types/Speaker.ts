export interface Speaker {
  id: string,
  name: string,
  role?: string,
  company?: string
  avatar?: string
  description?: string
  tracks?: string[]
  eventDays?: number[]
}
