import { Link } from 'src/types/Link'
// import { NewsItem } from 'src/types/NewsItem'
import { NavigationData } from 'src/types/NavigationData'
import { FooterData } from 'src/types/FooterData'

export function ToNavigationData(nodes: any): NavigationData {
  return {
    top: ToLinks(nodes, 'top'),
    site: ToLinks(nodes, 'site'),
    footer: ToFooterData(nodes),
    // news: ToNewsData(nodes, '') // Technically not navigation data but we should probably unify all page context data in one provider (TO-DO: discuss with Wesley)
  }
}

export function ToFooterData(nodes: any): FooterData {
  return {
    bottom: ToLinks(nodes, 'footer-bottom'),
    highlights: ToLinks(nodes, 'footer-highlights'),
    left: ToLinks(nodes, 'footer-left'),
    right: ToLinks(nodes, 'footer-right'),
  }
}

export function ToLinks(nodes: any, type: string): Array<Link> {
  const navItem = nodes.find((i: any) => i.frontmatter.title === type)

  if (!navItem) return []

  return navItem.frontmatter.links.map((i: any) => ToLink(i))
}

export function ToLink(node: any): Link {
  return {
    title: node.title,
    url: node.url,
    type: node.type,
    links: node.links?.map((i: any) => ToLink(i)),
  } as Link
}

// export function ToNewsData(nodes: any): Array<NewsItem> {
//   console.log(nodes, 'uh nodes');

//   return [];
// }