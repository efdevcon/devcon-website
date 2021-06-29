import { Link } from 'src/types/Link'
import { NavigationData } from 'src/types/NavigationData'
import { Notification } from 'src/types/Notification'
import { FooterData } from 'src/types/FooterData'
import { Tag } from 'src/types/Tag'
import { Page } from 'src/types/Page'
import { tags } from 'src/components/domain/archive/tags'

export function ToNavigationData(nodes: any, type?: 'default' | 'archive'): NavigationData {
  return {
    top: ToLinks(nodes, 'top'),
    site: type === 'archive' ? ToArchiveNavigation() : ToLinks(nodes, 'site'),
    footer: ToFooterData(nodes),
  }
}

export function ToArchiveNavigation(): Array<Link> {
  const links = new Array<Link>()
  links.push({ title: 'Watch', url: '/archive/watch', type: 'page' })
  links.push({ title: 'Event', url: '', type: 'links', links: [
    { title: 'Devcon 5', url: '/archive/playlists/devcon-5/', type: 'page' },
    { title: 'Devcon 4', url: '/archive/playlists/devcon-4/', type: 'page' },
    { title: 'Devcon 3', url: '/archive/playlists/devcon-3/', type: 'page' },
    { title: 'Devcon 2', url: '/archive/playlists/devcon-2/', type: 'page' },
    { title: 'Devcon 1', url: '/archive/playlists/devcon-1/', type: 'page' },
    { title: 'Devcon 0', url: '/archive/playlists/devcon-0/', type: 'page' }
  ]})
  const tagLinks = tags.map(i => { return { title: i.title, url: `/archive/watch?tags=${i.title}`, type: 'page' } as Link })
  links.push({ title: 'Categories', url: '', type: 'links', links: tagLinks})
  links.push({ title: 'Playlists', url: '/archive/playlists', type: 'page' })

  return links
}

export function ToNotification(data: any): Notification {
  return {
    title: data.rawMarkdownBody,
    url: data.frontmatter.url,
    label: data.frontmatter.label,
    labelType: data.frontmatter.labelType
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
