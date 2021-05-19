import { useStaticQuery, graphql } from 'gatsby'
import { Quest } from 'src/types/Quest';
import moment from 'moment';

export const useQuests = (): Array<Quest> => {
  const data = useStaticQuery(graphql`
    query {
      quests: allMarkdownRemark(
        filter: { fields: { collection: { eq: "quests" } } }
        sort: { fields: frontmatter___startDate, order: ASC }
      ) {
        nodes {
          frontmatter {
            title
            startDate
            endDate
            issuer
            description
            url
            image {
              childImageSharp {
                fluid(maxHeight: 1024, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
          fields {
            slug
          }
          html
        }
      }
    }
  `)

  return data.quests.nodes.map((i: any) => mapToQuest(i))
}

function mapToQuest(source: any): Quest {
  return {
    title: source.frontmatter.title,
    startDate: moment(source.frontmatter.startDate).format('MMM D, YYYY'),
    endDate: moment(source.frontmatter.endDate).format('MMM D, YYYY'),
    issuer: source.frontmatter.issuer,
    url: source.frontmatter.url,
    description: source.frontmatter.description,
    image: source.frontmatter.image.childImageSharp.fluid
  }
}
