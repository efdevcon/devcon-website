import { ArchiveVideo } from 'src/types/ArchiveVideo'

export function ToArchiveData(source: any): Array<ArchiveVideo> {
  return source.videos.nodes.map((video: ArchiveVideo) => ToArchiveVideo(video))
}

export function ToArchiveVideo(source: any): ArchiveVideo {
  return {
    id: source.id,
    devcon: source.frontmatter.devconNum,
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    speakers: source.frontmatter.speakers,
    url: source.frontmatter.url,
    category: source.frontmatter.category,
  }
}
