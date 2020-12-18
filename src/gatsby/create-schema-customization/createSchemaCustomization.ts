import { CreateSchemaCustomizationArgs, GatsbyGraphQLObjectType } from 'gatsby';
import { links as linksResolver } from './resolvers/links';

const baseTypes = `
  type MarkdownRemark implements Node { 
    frontmatter: Frontmatter 
  }

  type Link {
    url: String,
    title: String,
    type: String
  }
`;

export const createSchemaCustomization = ({ actions, schema }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions

  const typeDefs: any = [
    baseTypes,
    schema.buildObjectType({
      name: "Frontmatter",
      fields: {
        highlightedLinks: linksResolver,
        leftLinks: linksResolver,
        rightLinks: linksResolver,
        bottomLinks: linksResolver
      },
    }),
  ];

  createTypes(typeDefs);
};