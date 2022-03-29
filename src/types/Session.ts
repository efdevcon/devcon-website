import { Room } from "./Room";
import { Speaker } from "./Speaker";

export interface Session {
  id: string
  speakers: Speaker[]
  title: string
  track: string
  duration: number
  start: number
  end: number
  room?: Room
  type?: string
  description?: string
  abstract?: string
  expertise?: string
  image?: string
  resources?: string[]
  tags?: string[]
}
