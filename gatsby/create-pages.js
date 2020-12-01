const path = require(`path`)

module.exports = async function({ actions, graphql }) {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            allMarkdownRemark(filter: {fields: {collection: {eq: "pages"}}}) {
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
    `);

    // console.log(JSON.stringify(result, null, 4))

    result.data.allMarkdownRemark.nodes.forEach(node => {
        if (node.frontmatter.template === 'none') return;

        console.log("Creating page", node.fields.slug, 'with template:', node.frontmatter.template);
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${node.frontmatter.template}.tsx`),
          context: {
            slug: node.fields.slug,
            lang: node.fields.lang
          },
        })
      })
};