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
    if (node.url) return; // No reason to create pages for external news

    if (node.frontmatter.template === 'news') {
      createPaginatedPage(actions, node.fields.lang, node.fields.slug, 'news', 10, async () => {
        const result = await graphql(`
            {
              allNews: allMarkdownRemark(
                filter: { 
                  fields: { lang: { in: ["${node.fields.lang}", "tweets", "blog-posts"] }, collection: { eq: "news" } } 
                }, 
                sort: { fields: [frontmatter___date], order: DESC }
              ) {
                nodes {
                  fields {
                    slug
                  }
                }
              }
            }
        `);

        if (result.errors) {
          reporter.panicOnBuild(`Error while running News query.`)
          return
        }

        return result.data.allNews.nodes;
      });
    } else {
      createDynamicPage(actions, node.fields.slug, node.frontmatter.template, node.fields.lang)
    }
  });
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
    reporter.panicOnBuild(`Error while running News query.`)
    return
  }

  result.data.news.nodes.forEach((node: any) => {
    // No need to generate pages for tweets or blog posts 
    if (node.fields.lang === 'tweets' || node.fields.lang === 'blog-posts') return;
    
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

async function createPaginatedPage(actions: Actions, lang: string, slug: string, template: string, itemsPerPage = 10, getAllItems: any): Promise<void> {
  const items = await getAllItems();
  const numPages = Math.ceil(items.length / itemsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `${slug}` : `${slug}${i + 1}`,
      component: path.resolve(`./src/components/domain/page-templates/${template}.tsx`),
      context: {
        slug,
        lang,
        language: lang,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        intl: {
          language: lang,
          languages: languages,
          messages: require(`../content/i18n/${lang}.json`),
          routed: true,
          redirect: false,
        },
      },
    })
  })
}
