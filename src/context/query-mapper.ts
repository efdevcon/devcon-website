import { Link } from 'src/types/Link'
import { NavigationData } from 'src/types/NavigationData'
import { Notification } from 'src/types/Notification'
import { FooterData } from 'src/types/FooterData'

export function ToNavigationData(nodes: any): NavigationData {
  return {
    top: ToLinks(nodes, 'top'),
    site: ToLinks(nodes, 'site'),
    footer: ToFooterData(nodes),
  }
}

export function ToNotification(data: any): Notification {
  return {
    title: data.frontmatter.title,
    url: '/en/news/',
    label: 'NEWS',
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
