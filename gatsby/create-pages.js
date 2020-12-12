const path = require(`path`)

module.exports = async function({ actions, graphql }) {
    const { createPage } = actions;

    const languages = ['en', 'es'];
    const defaultLang = 'en';

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
                    languages: languages,
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

        const slug = node.fields.slug;
        const template = 'dip';
        console.log("Creating DIP", slug, 'with template:', template, 'lang', defaultLang);

        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.tsx`),
            context: {
            slug: slug,
            lang: defaultLang,
                intl: {
                    language: defaultLang,
                    languages: languages,
                    messages: require(`../src/content/i18n/${defaultLang}.json`),
                    routed: true,
                    redirect: false,
                },
            },
        })
    })

    // Create Blogs
    const blogResult = await graphql(`
        query {
            blogs: allMarkdownRemark(filter: {fields: {collection: {eq: "blogs"}}}, sort: {fields: frontmatter___DIP}) {
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
    `);

    blogResult.data.blogs.nodes.forEach(node => {

        const slug = node.fields.slug;
        const template = 'blog';
        const defaultLang = 'en';
        console.log("Creating blog post", slug, 'with template:', template, 'lang', defaultLang);

        createPage({
            path: slug,
            component: path.resolve(`./src/templates/${template}.tsx`),
            context: {
            slug: slug,
            lang: defaultLang,
                intl: {
                    language: defaultLang,
                    languages: languages,
                    messages: require(`../src/content/i18n/${defaultLang}.json`),
                    routed: true,
                    redirect: false,
                },
            },
        })
    })
};