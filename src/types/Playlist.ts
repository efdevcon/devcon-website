import { ArchiveVideo } from './ArchiveVideo'

export interface Playlist {
  id: string
  slug: string
  title: string
  description: string
  imageUrl?: string
  categories: Array<string>
  curators: Array<string>
  videoCount: number
  videos: Array<ArchiveVideo>
}
