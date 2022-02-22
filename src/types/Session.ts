import { Speaker } from "./Speaker";

export interface Session {
  id: string
  speakers: Speaker[]
  title: string
  track: string
  duration: number
  start: number
  end: number
  room: string
  type?: string
  description?: string
  abstract?: string
  image?: string
  resources?: string[]
  tags?: string[]
}
