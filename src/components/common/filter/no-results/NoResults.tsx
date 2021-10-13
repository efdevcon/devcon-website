import React from 'react'
import css from './no-results.module.scss'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export const NoResults = (props: any) => {
  const imageData = useStaticQuery(graphql`
    query {
      files: allFile(filter: { relativePath: { in: ["no-results.png"] } }) {
        nodes {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 80) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `)

  return (
    <div className={css['no-results-container']}>
      <div className={css['no-results-image-container']}>
        <Img alt="" className={css['image']} fluid={imageData.files.nodes[0].childImageSharp.fluid} />

        <p className="font-xxl bold">Sorry No Results Found</p>
        <p>Please try another filter</p>
      </div>
    </div>
  )
}
