import { ArchiveVideo } from './ArchiveVideo'
import { UserProfile } from './UserProfile';

export interface Playlist {
  id: string
  slug: string
  title: string
  description: string
  imageUrl?: string
  categories: Array<string>
  curators: Array<UserProfile>
  videoCount: number
  videos: Array<ArchiveVideo>
}
