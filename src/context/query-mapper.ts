import { Link } from 'types/Link'
import { NavigationData } from 'types/NavigationData'
import { Notification } from 'types/Notification'
import { FooterData } from 'types/FooterData'
import { Tag } from 'types/Tag'
import { Page } from 'types/Page'

export function ToNavigationData(nodes: any, videoTags?: any[], type?: 'default' | 'archive' | '404' | 'app'): NavigationData {
  if (type === '404') {
    return {
      top: ToLinks(nodes, 'top-archive'),
      site: [],
      footer: ToFooterData(nodes),
    }
  }

  return {
    top: type === 'app' ? [] : (type === 'archive' ? ToLinks(nodes, 'top-archive') : ToLinks(nodes, 'top')),
    site: type === 'app' ? [] : (type === 'archive' ? ToArchiveNavigation(videoTags) : ToLinks(nodes, 'site')),
    footer: ToFooterData(nodes),
  }
}

export function ToArchiveNavigation(videoTags?: any[]): Array<Link> {
  const links = new Array<Link>()
  links.push({ title: 'Watch', url: '/archive/watch', type: 'page' })
  const eventLinks = [5, 4, 3, 2, 1, 0].map(
    event =>
      ({
        title: `Devcon ${event}`,
        url: `/archive/watch?edition=${event}`,
        type: 'page',
      } as Link)
  )
  const tagLinks = videoTags?.map(i => {
    return { title: i, url: `/archive/watch?tags=${encodeURIComponent(i)}`, type: 'page' } as Link
  })
  links.push({ title: 'Event', url: '', type: 'links', logo: '/assets/images/menu/bogota.svg', links: eventLinks })
  links.push({ title: 'Categories', url: '', type: 'links', logo: '/assets/images/menu/program.svg', links: tagLinks })
  links.push({ title: 'Playlists', url: '/archive/playlists', type: 'page' })

  return links
}

export function ToNotification(data: any): Notification {
  return {
    title: data.rawMarkdownBody,
    url: data.frontmatter.url,
    label: data.frontmatter.label,
    labelType: data.frontmatter.labelType,
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

export function ToPage(source: any): Page {
  return {
    title: source.frontmatter.title,
    description: source.frontmatter.description,
    body: source.html,
    template: source.frontmatter.template,
    tags: ToTags(source),
    lang: source.fields.lang,
    id: source.fields.id,
    slug: source.fields.slug,
  } as Page
}

export function ToTags(source: any): Array<Tag> {
  if (!source?.frontmatter?.tagItems) {
    return []
  }

  return source?.frontmatter?.tagItems
}
