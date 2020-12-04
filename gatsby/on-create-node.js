const { createFilePath } = require(`gatsby-source-filesystem`);

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const collection = getNode(node.parent).sourceInstanceName;
        const slug = createFilePath({ node, getNode, basePath: `pages` });

        if (collection === 'pages') { 
            const paths = slug.split('/').filter(String);
            const lang = paths[0];
            const level = paths.length - 2;
            paths.pop();
            const parent = '/' + paths.join('/') + '/';

            createNodeField({
                node,
                name: 'lang',
                value: lang,
            });

            createNodeField({
                node,
                name: 'level',
                value: level,
            });

            createNodeField({
                node,
                name: 'parent',
                value: parent,
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