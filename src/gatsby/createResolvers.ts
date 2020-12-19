// https://github.com/gatsbyjs/gatsby/issues/27096 <--- type issue
// import { CreateSchemaCustomizationArgs } from 'gatsby';

// export const createResolvers: any = ({ createResolvers }: any) => {
//   const pageResolver = {
//     resolve: (source: any, _: any, context: any, __: any) => {
//       console.log(source, 'source lul')
//       return context.nodeModel.runQuery({
//         query: {
//           filter: {
//             frontmatter: {
//               title: { in: source.map((pageData: any) => pageData.page) }
//             }
//           }
//         },
//         firstOnly: true
//       }).then((page: any) => {
//         return {
//           title: page.frontmatter.title,
//           slug: page.fields.slug,
//           order: source.page.order
//         }
//       })
//     },
//   };

//   const resolvers = {
//     Frontmatter: {
//       pages: pageResolver,
//       bottomPages: pageResolver,
//       highlightedPages: pageResolver
//     }
//   };

//   createResolvers(resolvers as any);
// };
