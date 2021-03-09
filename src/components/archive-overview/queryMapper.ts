import { ArchiveVideo } from 'src/types/ArchiveVideo'

export function ToArchiveData(source: any): Array<ArchiveVideo> {
  const videos = source.videos.nodes.map((video: ArchiveVideo) => ToArchiveVideo(video));
  for (let i = videos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[videos[i], videos[j]] = [videos[j], videos[i]]
  }

  return videos;
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
