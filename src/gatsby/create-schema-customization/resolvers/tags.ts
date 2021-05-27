export const tagsResolver = {
  type: '[Tag]',
  resolve: (source: any, { language }: any, context: any) => {
    const pageTags = source['tags']
    if (!pageTags) return []

    return context.nodeModel
      .runQuery({
        query: {
          filter: {
            fields: {
              collection: {
                eq: 'tags',
              },
              id: {
                in: pageTags,
              },
              lang: {
                eq: language,
              },
            },
          },
        },
        type: 'MarkdownRemark',
      })
      .then((tags: any) => {
        return tags.map((i: any) => {
          return {
            id: i.id,
            slug: i.fields.id,
            title: i.frontmatter.title,
          }
        })
      })
  },
  args: {
    language: {
      type: 'String!',
    },
  },
}

export const tagCountResolver = {
  type: 'Int',
  resolve: (source: any) => {
    const pageTags = source['tags']
    if (!pageTags) return 0
    return pageTags.length
  }
}
