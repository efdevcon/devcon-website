import { Link } from 'src/types/Link'

type PageNode = {
  frontmatter: {
    title: String
  }
  fields: {
    slug: String
  }
}

const linkResolver = (linkData: Link, context: any): Promise<null | Link> => {
  switch (linkData && linkData.type) {
    case 'url': {
      return Promise.resolve(linkData)
    }

    case 'page': {
      return context.nodeModel
        .runQuery({
          query: {
            filter: {
              fields: {
                collection: {
                  eq: 'pages',
                },
              },
              frontmatter: {
                title: {
                  eq: linkData.title,
                },
              },
            },
          },
          firstOnly: true,
          type: 'MarkdownRemark',
        })
        .then((page: PageNode) => {
          if (!page) return null

          const slugMatch = page.fields.slug.match(/\/[^\/]*(.*)/)

          if (!slugMatch) return null

          const url = '/:lang' + slugMatch[1] // e.g. /en/about => /:lang/about

          return {
            type: linkData.type,
            title: page.frontmatter.title,
            url,
          }
        })
    }
  }

  return Promise.resolve(null)
}

export const links = {
  type: '[Link]',
  resolve: (source: any, args: any, context: any, info: any) => {
    const links = source[info.fieldName]

    if (!links) return []

    const promises = links.map((linkData: any) => {
      return linkResolver(linkData, context)
    })

    // console.time('resolve link query')

    return Promise.all(promises).then(links => {
      // console.timeEnd('resolve link query');
      return links.filter(link => !!link)
    })
  },
}

// Singular link resolver
export const link = {
  type: 'Link',
  resolve: (source: any, args: any, context: any, info: any) => {
    return linkResolver(source, context)
  },
}
