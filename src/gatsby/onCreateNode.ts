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

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    })

    if (collection === 'pages') {
      const paths = slug.split('/').filter(String)
      const lang = paths[0]
      const level = frontmatter.parent ? 1 : 0
      const parent = frontmatter.parent ? '/' + lang + '/' + frontmatter.parent + '/' : ''

      // console.log("Create node", collection, slug, lang, level, parent)

      createNodeField({
        node,
        name: 'lang',
        value: lang,
      })

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

    if (collection === 'faq') {
      const paths = slug.split('/').filter(String)
      const lang = paths[0]
      const id = paths[1]

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
    }

    if (collection === 'categories') {
      const paths = slug.split('/').filter(String)
      const lang = paths[0]
      const id = paths[1]

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
    }

    if (collection === 'news') {
      const paths = slug.split('/').filter(String)
      const lang = paths[0]

      createNodeField({
        node,
        name: 'lang',
        value: lang,
      })
    }

    if (collection === 'dips') {
      const paths = slug.split('/').filter(String)
      const lang = paths[0]

      createNodeField({
        node,
        name: 'lang',
        value: lang,
      })
    }
    
    if (collection === 'blogs') {
      createNodeField({
        node,
        name: 'slug',
        value: '/blog' + slug,
      })
    } else {
      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })
    }
  }
}
