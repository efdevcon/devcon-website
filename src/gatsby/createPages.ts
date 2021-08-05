import { GatsbyNode, CreatePagesArgs, Actions } from 'gatsby'
import path from 'path'
import { SearchIndexClient } from '../server/services/search-client'
import { mapToArchiveVideo } from '../types/ArchiveVideo'
import { SearchItem } from 'src/types/SearchItem'
import { Tag } from 'src/types/Tag'

const languages = ['en', 'es']
const defaultLang = 'en'
const english = require(`../content/i18n/en.json`)
const spanish = require(`../content/i18n/es.json`)


export const createPages: GatsbyNode['createPages'] = async (args: CreatePagesArgs) => {
  console.log('createPages', languages, 'default', defaultLang)

  // await createContentPages(args)
  // await createBlogPages(args)
  // await createNewsPages(args)
  // await createDipPages(args)
  await createPlaylistPages(args)
  await createVideoPages(args)
  // await createTagPages(args)
  // await createSearchPage(args)

  // await indexArchive(args)
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

    // if (node.frontmatter.template === 'news') {
    //   createPaginatedPage(actions, node.fields.lang, node.fields.slug, 'news', 10, async () => {
    //     const result = await graphql(`
    //         {
    //           allNews: allMarkdownRemark(
    //             filter: { 
    //               fields: { lang: { in: ["${node.fields.lang}", "tweets", "blog-posts"] }, collection: { eq: "news" } } 
    //             }, 
    //             sort: { fields: [frontmatter___date], order: DESC }
    //           ) {
    //             nodes {
    //               fields {
    //                 slug
    //               }
    //             }
    //           }
    //         }
    //     `);

    //     if (result.errors) {
    //       reporter.panicOnBuild(`Error while running News query.`)
    //       return
    //     }

    //     return result.data.allNews.nodes;
    //   });
    // } else {
    createDynamicPage(actions, node.fields.slug, node.frontmatter.template, node.fields.lang)
    // }
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

async function createPlaylistPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      playlists: allMarkdownRemark(filter: { fields: { collection: { eq: "playlists" } } }) {
        nodes {
          fields {
            collection
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running playlist query.`)
    return
  }

  result.data.playlists.nodes.forEach((node: any) => {
    createDynamicPage(actions, node.fields.slug, 'playlist', 'en')
  })
}

async function createVideoPages({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      playlists: allMarkdownRemark(filter: { fields: { collection: { eq: "videos" } } }) {
        nodes {
          fields {
            collection
            slug
          }
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running playlist query.`)
    return
  }

  result.data.playlists.nodes.forEach((node: any) => {
    createDynamicPage(actions, node.fields.slug, 'video', 'en', '', node.frontmatter.tags)
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
      taggedPages: allMarkdownRemark(filter: { frontmatter: { tagCount: { gt: 0 } } }) {
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
  tags = [...new Set(tags)]

  tags.forEach((tag: string) => {
    createDynamicPage(actions, `/en/tags/${tag}/`, 'tag', 'en', tag)
    createDynamicPage(actions, `/es/tags/${tag}/`, 'tag', 'es', tag)
  })
}

async function createSearchPage({ actions, graphql, reporter }: CreatePagesArgs) {
  const result: any = await graphql(`
    query {
      items: allMarkdownRemark(filter: { fields: { collection: { in: ["archive", "faq", "news", "pages"] } } }) {
        nodes {
          fields {
            id
            slug
            lang
            collection
          }
          frontmatter {
            title
            description
            tagItems {
              id
              slug
              lang
              title
            }
          }
          html
        }
      }
      blogs: allFeedDevconBlog(limit: 10) {
        nodes {
          id
          guid
          title
          description
          pubDate
          link
          efblog {
            image
          }
          content {
            encoded
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running search query.`)
    return
  }

  const { createPage } = actions
  
  const blogs: Array<SearchItem> = result.data?.blogs?.nodes?.map((i: any) => {
    return {
      id: i.id,
      slug: i.guid,
      lang: 'en',
      type: 'blog',
      title: i.title,
      description: i.description,
      body: i.content.encoded,
      tags: []
    } as SearchItem
  })

  languages.forEach((language: string) => {
    let data: Array<SearchItem> = result.data?.items?.nodes
      ?.filter((i: any) => i.fields.lang === language)
      .map((i: any) => {
        return {
          id: i.fields.id,
          slug: i.fields.slug,
          lang: i.fields.lang,
          type: i.fields.collection,
          title: i.frontmatter.title,
          description: i.frontmatter.description,
          body: i.html,
          tags: i.frontmatter.tagItems.filter((i: Tag) => i.lang === language).map((i: Tag) => i.title),
        } as SearchItem
      })
    data.push(...blogs)

    createPage({
      path: `/${language}/search/`,
      component: path.resolve(`./src/components/domain/page-templates/search.tsx`),
      context: {
        slug: `/${language}/search/`,
        language: language,
        allSearchData: data,
        intl: {
          language: language,
          languages: languages,
          messages: language === 'es' ? spanish : english,
          routed: true,
          redirect: false,
        },
      },
    })
  })
}

async function indexArchive({ actions, graphql, reporter }: CreatePagesArgs) {
  // search: title, description, speaker name
  // filter: edition, expertise, tags

  const result: any = await graphql(`
    query {
      items: allMarkdownRemark(filter: {fields: {collection: {eq: "videos"}}}) {
        nodes {
          id
          fields {
            slug
            path
          }
          frontmatter {
            title
            edition
            description
            youtubeUrl
            ipfsHash
            duration
            expertise
            type
            track
            tags
            speakers
            profiles {
              id
              name
              lang
              description
              imageUrl
              role
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running search query.`)
    return
  }

  console.log('ElasticSearch client..')
  const elastic = new SearchIndexClient()
  const indexName = 'archive'
  await elastic.deleteIndex(indexName)
  await elastic.createIndex(indexName)
  await elastic.updateMapping(indexName, {
    properties: {
      title: {
        type: 'text',
        fielddata: true,
        fields: {
          raw: {
            type: 'keyword'
          } 
        }
      }
    }
  })
  await elastic.updateMapping(indexName, {
    properties: {
      description: {
        type: 'text',
        fielddata: true,
        fields: {
          raw: {
            type: 'keyword'
          } 
        }
      }
    }
  })
  await elastic.updateMapping(indexName, {
    properties: {
      speakers: {
        type: 'text',
        fielddata: true,
        fields: {
          raw: {
            type: 'keyword'
          } 
        }
      }
    }
  })

  console.log(`Adding ${result.data.items.nodes.length} archive videos to Elastic index..`)
  result.data?.items.nodes.forEach(async (source: any) => {
    const video = mapToArchiveVideo(source)
    await elastic.addToIndex(indexName, video)
  })
}

function createDynamicPage(actions: Actions, slug: string, template: string, lang: string, tag: string = '', tags: string[]): void {
  if (template === 'none') return

  // console.log("Creating page", slug, 'with template:', template, lang);
  const { createPage } = actions

  const tagsRegex = (() => {

    if (tags) {
      const asString = tags.reduce((acc, tag) => {
        if (acc === '') return `${tag}`;

        return `${acc}|${tag}`;
      }, '');

      // Just returning a regex that won't match anything since an empty regex matches everything with the graphql regex operator
      if (asString === '') return '/^abc12345/';

      return `/${asString}/`;
    } 
  })();

  createPage({
    path: slug,
    component: path.resolve(`./src/components/domain/page-templates/${template}.tsx`),
    context: {
      tags: tagsRegex, // Can't pass arrays as arguments to the graphql query, so have to use regex to simulate the in operator
      slug: slug,
      tag: tag,
      lang: lang,
      language: lang, // Merge with lang (language is better because gatsby-intl-plugin writes to the language key)
      intl: {
        language: lang,
        languages: languages,
        messages: lang === 'es' ? spanish : english,
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
