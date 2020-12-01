const { createFilePath } = require(`gatsby-source-filesystem`);

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const collection = getNode(node.parent).sourceInstanceName;
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        // console.log('Creating slug for', collection, slug)

        if (collection === 'pages') { 
            const paths = slug.split('/').filter(String);
            const lang = paths[paths.length - 1];

            createNodeField({
                node,
                name: 'lang',
                value: lang,
            });
        }

        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });

        createNodeField({
            node,
            name: 'slug',
            value: slug,
        });
    }
};