import { CreateSchemaCustomizationArgs } from 'gatsby'
import { links as linksResolver } from './resolvers/links'
import { tagCountResolver, tagsResolver } from './resolvers/tags'
import { dip as dipResolver } from './resolvers/dip'
import { videoResolver } from './resolvers/archive'

const baseTypes = `
  type MarkdownRemark implements Node { 
    frontmatter: Frontmatter 
  }

  type Link {
    url: String,
    title: String,
    type: String
    links: [Link]
  }

  type Tag {
    id: String,
    slug: String,
    lang: String,
    title: String
  }

  type ArchiveVideo {
    id: String,
    slug: String,
    edition: Int,
    title: String,
    description: String,
    youtubeUrl: String,
    ipfsHash: String,
    expertise: String,
    type: String,
    track: String,
    tags: [String],
    speakers: [String]
  }
`

export const createSchemaCustomization = ({ actions, schema }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions

  const typeDefs: any = [
    baseTypes,
    schema.buildObjectType({
      name: 'Frontmatter',
      fields: {
        links: linksResolver,
        next_dip: dipResolver('next'),
        prev_dip: dipResolver('prev'),
        tagItems: tagsResolver,
        tagCount: tagCountResolver,
        archiveVideos: videoResolver,
      },
    }),
  ]

  createTypes(typeDefs)
}
