import { Link } from 'src/types/Link'
import { NavigationData } from 'src/types/NavigationData'
import { Notification } from 'src/types/Notification'
import { FooterData } from 'src/types/FooterData'
import { Tag } from 'src/types/Tag'
import { Page } from 'src/types/Page'

export function ToNavigationData(nodes: any): NavigationData {
  return {
    top: ToLinks(nodes, 'top'),
    site: ToLinks(nodes, 'site'),
    footer: ToFooterData(nodes),
  }
}

export function ToNotification(data: any): Notification {
  console.log(data, 'data');

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

  return source?.frontmatter?.tagItems?.map((i: any) => {
    return { slug: i.slug, title: i.title }
  })
}
