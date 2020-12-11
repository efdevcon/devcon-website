const path = require(`path`)

module.exports = async function({ actions, graphql }) {
    const { createPage } = actions;

    // Create Pages
    const pageResult = await graphql(`
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

    pageResult.data.allMarkdownRemark.nodes.forEach(node => {
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

    // Create DIPs
    const dipResult = await graphql(`
        query {
            dips: allMarkdownRemark(filter: {fields: {collection: {eq: "dips"}}}, sort: {fields: frontmatter___DIP}) {
                nodes {
                    frontmatter {
                        DIP
                        Title
                        Status
                        Themes
                        Discussion
                        Authors
                        Resources_Required
                        Tags
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    dipResult.data.dips.nodes.forEach(node => {

        // console.log("Creating DIP", node.fields.slug, 'with template:', 'dip');    
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/dip.tsx`),
            context: {
            slug: node.fields.slug,
            lang: 'en',
            intl: {
                language: 'en',
                languages: ['en', 'es'],
                messages: require(`../src/content/i18n/en.json`),
                routed: true,
                redirect: false,
                },
            },
        })
    })
};