import { ArchiveVideo, mapToArchiveVideo } from "src/types/ArchiveVideo"

export const videoResolver = {
  type: '[ArchiveVideo]',
  resolve: (source: any, args: any, context: any) => {
    const videos = source['videos']
    if (!videos) return []

    const filter: any = {
      fields: {
        collection: {
          eq: 'videos',
        },
        path: {
          in: videos,
        },
      },
    }

    return context.nodeModel
      .runQuery({
        query: {
          filter,
        },
        type: 'MarkdownRemark',
      })
      .then((videos: any) => {
        return videos.map((source: any) => {
          return {
            id: source.id,
            slug: source.fields.slug,
            edition: source.frontmatter.edition,
            title: source.frontmatter.title,
            description: source.frontmatter.description,
            youtubeUrl: source.frontmatter.youtubeUrl,
            ipfsHash: source.frontmatter.ipfsHash,
            expertise: source.frontmatter.expertise,
            type: source.frontmatter.type,
            track: source.frontmatter.track,
            tags: source.frontmatter.tags,
            speakers: source.frontmatter.speakers
          } as ArchiveVideo
        })
      })
  },
  args: {},
}