import React from 'react'
import { graphql } from 'gatsby'
import { SEO } from 'src/components/domain/seo'
import { DIPOverview } from 'src/components/domain/dips/overview'
import Content from 'src/components/common/layouts/content'
import { DIP } from 'src/types/dip'

export default function DIPsTemplate({ data, location }: any) {
  const page = data.markdownRemark

  return (
    <Content navigationData={data.navigationData} location={location}>
      <SEO title={page.frontmatter.title} description={page.frontmatter.description} lang={page.fields.lang} />

      <DIPOverview
        dips={React.useMemo(() => data.dips.nodes.map((dip: DIP) => mapToDIP(dip)), [data.dips])}
        dipDescription={data.markdownRemark.html}
        contributors={data.contributors.nodes}
      />
    </Content>
  )
}

export function mapToDIP(source: any): DIP {
  return {
    github: source.frontmatter.Github_URL,
    // summary: source.frontmatter.Summary,
    summary: source.excerpt,
    number: source.frontmatter.DIP,
    title: source.frontmatter.Title,
    status: source.frontmatter.Status,
    themes: source.frontmatter.Themes ? source.frontmatter.Themes.split(',') : [],
    tags: source.frontmatter.Tags ? source.frontmatter.Tags.split(',') : [],
    authors: source.frontmatter.Authors ? source.frontmatter.Authors.split(',') : [],
    resources: source.frontmatter.Resources,
    discussion: source.frontmatter.Discussion,
    created: new Date(source.frontmatter.Created),
    next_dip: source.frontmatter.next_dip,
    prev_dip: source.frontmatter.prev_dip,
    // body: source.html,
    slug: source.fields?.slug,
  }
}

export const query = graphql`
  query($slug: String!, $language: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        lang
      }
      frontmatter {
        title
        template
        description
      }
    }
    ...DipsData
    ...NavigationData
  }
`
