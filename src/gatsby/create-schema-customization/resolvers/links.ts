import { Link } from 'src/types/Link'

type UnresolvedLink = {
  slug: string,
  type: string,
  title: string,
  url: string
}

type PageNode = {
  frontmatter: {
    title: string
  }
  fields: {
    slug: string
  }
}

const linkResolver = (linkData: UnresolvedLink, language: string, context: any): Promise<null | Link> => {
  switch (linkData && linkData.type) {
    case 'url': {
      const formatted: Link = {
        // External url title may need translation - holding off on that until we have an actual use case
        title: linkData.title, 
        url: linkData.url,
        type: linkData.type
      }

      return Promise.resolve(formatted) 
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
                slug: {
                  eq: `/${language}/${linkData.slug}/`
                }
              }
            },
          },
          firstOnly: true,
          type: 'MarkdownRemark',
        })
        .then((page: PageNode) => {
          if (!page) return null

          return {
            type: linkData.type,
            title: page.frontmatter.title,
            url: page.fields.slug,
          }
        })
    }
  }

  return Promise.resolve(null)
}

export const links = {
  type: '[Link]',
  resolve: (source: any, { language }: any, context: any, info: any) => {
    const links = source[info.fieldName]

    if (!links) return []

    const promises = links.map((linkData: UnresolvedLink) => {
      return linkResolver(linkData, language, context)
    })

    return Promise.all(promises).then(links => {
      return links.filter(link => !!link)
    })
  },
  args: {
    language: {
      type: "String!"
    },
  }
}

// Singular link resolver
export const link = {
  type: 'Link',
  resolve: (source: any, { language }: any, context: any, info: any) => {
    return linkResolver(source, language, context)
  },
  args: {
    language: {
      type: "String!"
    },
  }
}
