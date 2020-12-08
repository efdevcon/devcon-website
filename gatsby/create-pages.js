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

    result.data.allMarkdownRemark.nodes.forEach(node => {
        if (node.frontmatter.template === 'none') return;

        // console.log("Creating page", node.fields.slug, 'with template:', node.frontmatter.template);    
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${node.frontmatter.template}.tsx`),
          context: {
            slug: node.fields.slug,
            lang: node.fields.lang,
            intl: {
                language: node.fields.lang,
                languages: ['en', 'es'],
                messages: require(`../src/content/i18n/${node.fields.lang}.json`),
                routed: true,
                redirect: false,
              },
          },
        })
      })
};