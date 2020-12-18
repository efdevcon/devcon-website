import { GatsbyNode, NodePluginArgs, Node } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

interface NodeFrontmatter { 
    title: string
    parent: string
}

// const getFooterNode = (() => {
//   let footerNode: Node | undefined | any;

//   return (getNodesByType: NodePluginArgs["getNodesByType"], getNode: NodePluginArgs["getNode"]) => {
//     if (footerNode) return footerNode;

//     const allMarkdownNodes = getNodesByType('MarkdownRemark');

//     console.log(allMarkdownNodes.length, 'all markdown nodes');

//     footerNode = allMarkdownNodes.find(node => {
//       // console.log(node, 'node');
//       const collection = getNode(node.parent || '').sourceInstanceName;

//       if (collection === 'footer') {
//         console.log(collection, 'collection MATCH');
//         return node;
//       }
//     });
//   };
// })();

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, getNode, getNodesByType, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const frontmatter = node.frontmatter as NodeFrontmatter;
    const collection = getNode(node.parent || '').sourceInstanceName;
    const slug = createFilePath({ node, getNode, basePath: `pages` });

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

      // console.log('Create node', collection, slug, lang, level, parent)

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

      createNodeField({
        node,
        name: 'slug',
        value: slug,
      })

      // const footerNode = getFooterNode(getNodesByType, getNode);
    }

    // if (collection === 'footer') {
    //   const allMarkdownNodes = getNodesByType('MarkdownRemark')
    //   const { highlighted_pages, pages, bottom_pages } = node.frontmatter
    //   const pageUrlLookup = {}
    //   const footerPages = [...highlighted_pages, ...pages, ...bottom_pages]

    //   footerPages.forEach(pageTitle => {
    //     const pageNode = allMarkdownNodes.find(node => node.frontmatter.title === pageTitle)
    //     if (pageNode) {
    //       pageUrlLookup[pageTitle] = pageNode.frontmatter.title // Resolve url here
    //     }
    //   })
    //   console.log('CREATING NODE FIELD')
    //   console.log(pageUrlLookup, 'page urlsss')
    //   createNodeField({
    //     node,
    //     name: 'pageUrlLookup',
    //     value: pageUrlLookup,
    //   })
    //   console.log(
    //     getNodesByType('MarkdownRemark').filter(node => node.fields.collection === 'pages'),
    //     'get nodes'
    //   )
    //   console.log(JSON.stringify(node, null, 2))
    // }

    if (collection === 'dips') {
      createNodeField({
        node,
        name: 'slug',
        value: '/dips' + slug,
      })
    }

    if (collection === 'blogs') {
      createNodeField({
        node,
        name: 'slug',
        value: '/blog' + slug,
      })
    }
  }
};
