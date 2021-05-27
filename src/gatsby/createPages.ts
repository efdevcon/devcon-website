import { GatsbyNode, CreatePagesArgs, Actions } from 'gatsby'
import path from 'path'

const languages = ['en', 'es']
const defaultLang = 'en'

export const createPages: GatsbyNode['createPages'] = async (args: CreatePagesArgs) => {
  console.log('createPages', languages, 'default', defaultLang)

  await createContentPages(args)
  await createBlogPages(args)
  await createNewsPages(args)
  await createDipPages(args)
  // await createTagPages(args)
}

async function createContentPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "pages" } } }) {
        nodes {
          fields {
            lang
            slug
          }
          frontmatter {
            title
            template
            url
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Content Pages query.`)
    return
  }

  result.data.allMarkdownRemark.nodes.forEach((node: any) => {
    if (node.url) return // No reason to create pages for external news

    createDynamicPage(actions, node.fields.slug, node.frontmatter.template, node.fields.lang)
  })
}

async function createNewsPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      news: allMarkdownRemark(filter: { fields: { collection: { eq: "news" } } }) {
        nodes {
          fields {
            slug
            lang
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running DIP query.`)
    return
  }

  result.data.news.nodes.forEach((node: any) => {
    createDynamicPage(actions, node.fields.slug, 'news-item', node.fields.lang)
  })
}

async function createDipPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      dips: allMarkdownRemark(filter: { fields: { collection: { eq: "dips" } } }, sort: { fields: frontmatter___DIP }) {
        nodes {
          fields {
            slug
            lang
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running DIP query.`)
    return
  }

  result.data.dips.nodes.forEach((node: any) => {
    createDynamicPage(actions, node.fields.slug, 'dip', node.fields.lang)
  })
}

async function createBlogPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      blogs: allMarkdownRemark(
        filter: { fields: { collection: { eq: "blogs" } } }
        sort: { fields: frontmatter___DIP }
      ) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Blog query.`)
    return
  }

  result.data.blogs.nodes.forEach((node: any) => createDynamicPage(actions, node.fields.slug, 'blog', defaultLang))
}

async function createTagPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      taggedPages : allMarkdownRemark(filter: {frontmatter: {tagCount: {gt: 0}}}) {
        nodes {
          frontmatter {
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Tags query.`)
    return
  }

  let tags: string[] = []
  result.data.taggedPages.nodes.forEach((node: any) => {
    tags = tags.concat(node.frontmatter.tags)
  })
  tags = [...new Set(tags)];

  tags.forEach((tag: string) => {
    createDynamicPage(actions, `/en/tags/${tag}/`, 'tag', 'en', tag)
    createDynamicPage(actions, `/es/tags/${tag}/`, 'tag', 'es', tag)
  })
}

function createDynamicPage(actions: Actions, slug: string, template: string, lang: string, tag: string = ''): void {
  if (template === 'none') return

  // console.log("Creating page", slug, 'with template:', template, lang);
  const { createPage } = actions

  createPage({
    path: slug,
    component: path.resolve(`./src/components/domain/page-templates/${template}.tsx`),
    context: {
      slug: slug,
      tag: tag,
      lang: lang,
      language: lang, // Merge with lang (language is better because gatsby-intl-plugin writes to the language key)
      intl: {
        language: lang,
        languages: languages,
        messages: require(`../content/i18n/${lang}.json`),
        routed: true,
        redirect: false,
      },
    },
  })
}
