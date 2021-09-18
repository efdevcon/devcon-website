import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { createFileNodeFromBuffer } from 'gatsby-source-filesystem'
import fs from 'fs'
import path from 'path'

const fileCache = {} as any

// This is normally done by transformer-sharp, but transformer-sharp doesn't work with custom resolvers - loading the images and creating file nodes manually instead:
const resolveImage = async (dependencies: any, node: any) => {
  if (typeof node.frontmatter.image !== 'string') return null

  const imagePath = path.resolve(node.fileAbsolutePath, '..', node.frontmatter.image)

  if (fileCache[imagePath]) return fileCache[imagePath]

  let buffer

  try {
    buffer = await fs.promises.readFile(imagePath)
  } catch (e) {
    return null
  }

  if (!buffer) return null

  const imageName = node.frontmatter.image.split('/').pop().split('.')[0]

  fileCache[imagePath] = createFileNodeFromBuffer({
    buffer: buffer,
    name: imageName,
    ...dependencies,
  })

  return fileCache[imagePath]
}

export const videoResolver = (dependencies: any) => ({
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
        const promises = videos.map(async (source: any) => {
          const imageFileNode = await resolveImage(dependencies, source)

          return {
            id: source.id,
            slug: source.fields.slug,
            edition: source.frontmatter.edition,
            title: source.frontmatter.title,
            description: source.frontmatter.description,
            youtubeUrl: source.frontmatter.youtubeUrl,
            image: imageFileNode,
            imageUrl: source.frontmatter.imageUrl,
            ipfsHash: source.frontmatter.ipfsHash,
            duration: source.frontmatter.duration,
            expertise: source.frontmatter.expertise,
            type: source.frontmatter.type,
            track: source.frontmatter.track,
            tags: source.frontmatter.tags,
            speakers: source.frontmatter.speakers,
            profiles: source.frontmatter.profiles,
          } as ArchiveVideo
        })

        return Promise.all(promises)
      })
  },
  args: {},
})

export const distinctVideoTagsResolver = {
  type: '[String]',
  resolve: (source: any, args: any, context: any) => {
    const filter: any = {
      fields: {
        collection: {
          eq: 'videos',
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
        const tags = {} as { [key: string]: boolean }

        videos.forEach((video: any) => {
          if (!video.frontmatter.tags) return

          video.frontmatter.tags.forEach((tag: any) => {
            if (tags[tag.trim()]) return

            tags[tag.trim()] = true
          })
        })

        return Object.keys(tags).sort()
      })
  },
  args: {},
}
