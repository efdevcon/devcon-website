import { GatsbyNode, CreatePagesArgs, Actions } from 'gatsby'
import path from 'path'

const languages = ['en', 'es']
const defaultLang = 'en'

export const createPages: GatsbyNode['createPages'] = async (args: CreatePagesArgs) => {
  console.log('createPages', languages, 'default', defaultLang)

  await createContentPages(args)
  await createBlogPages(args)
  await createDipPages(args)
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
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running Content Pages query.`)
    return
  }

  result.data.allMarkdownRemark.nodes.forEach((node: any) =>
    createDynamicPage(actions, node.fields.slug, node.frontmatter.template, node.fields.lang)
  )
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

function createDynamicPage(actions: Actions, slug: string, template: string, lang: string): void {
  if (template === 'none') return

  // console.log("Creating page", slug, 'with template:', template, lang);
  const { createPage } = actions

  createPage({
    path: slug,
    component: path.resolve(`./src/components/domain/page-templates/${template}.tsx`),
    context: {
      slug: slug,
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
