import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

interface NodeFrontmatter {
  title: string
  parent: string
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // console.log('onCreateNode')

  if (node.internal.type === `MarkdownRemark`) {
    const frontmatter = node.frontmatter as NodeFrontmatter
    const collection = getNode(node.parent || '').sourceInstanceName
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const paths = slug.split('/').filter(String)
    const lang = paths[0]
    const id = paths[1]

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    })

    createNodeField({
      node,
      name: 'lang',
      value: lang,
    })

    createNodeField({
      node,
      name: 'id',
      value: id,
    })

    if (collection === 'pages') {
      const level = frontmatter.parent ? 1 : 0
      const parent = frontmatter.parent ? '/' + lang + '/' + frontmatter.parent + '/' : ''

      createNodeField({
        node,
        name: 'level',
        value: level,
      })

      createNodeField({
        node,
        name: 'parent',
        value: parent,
      })
    }

    let formattedSlug = slug
    if (collection === 'blogs') {
      formattedSlug = '/blog' + slug
    }
    if (collection === 'dips') {
      formattedSlug = `/${lang}/dips/${slug.split('/')[2].toLowerCase()}/` // /en/dips/dip-0/
    }
    if (collection === 'news') {
      formattedSlug = `/${lang}/news/${slug.split('/')[2].toLowerCase()}/` // /en/news/something
    }
    if (collection === 'playlists') {
      formattedSlug = '/archive/playlists' + slug
    }

    createNodeField({
      node,
      name: 'slug',
      value: formattedSlug,
    })
  }
}
