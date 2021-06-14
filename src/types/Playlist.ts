import { ArchiveVideo } from './ArchiveVideo'

export interface Playlist {
  id: string
  title: string
  description: string
  imageUrl?: string
  curators: Array<string>
  videos: Array<ArchiveVideo>
}
