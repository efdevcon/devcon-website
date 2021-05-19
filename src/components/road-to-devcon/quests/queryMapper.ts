import moment from 'moment';
import { Quest } from 'src/types/Quest';

export const toQuestData = (data: any): Quest[] => {
  return data.quests.nodes.map((quest: any) => {
    return {
      title: quest.frontmatter.title,
      startDate: moment.utc(quest.frontmatter.startDate).format('MMM D, YYYY'),
      endDate: moment.utc(quest.frontmatter.endDate).format('MMM D, YYYY'),
      issuer: quest.frontmatter.issuer,
      url: quest.frontmatter.url,
      urlInfo: quest.frontmatter.urlInfo,
      description: quest.frontmatter.description,
      image: quest.frontmatter.image.childImageSharp.fluid
    }
  })
}
