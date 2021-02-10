import { CreateSchemaCustomizationArgs } from 'gatsby'
import { links as linksResolver } from './resolvers/links'
import { dip as dipResolver } from './resolvers/dip'

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
      },
    }),
  ]

  createTypes(typeDefs)
}
