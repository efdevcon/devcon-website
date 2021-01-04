import { Category } from 'src/types/Category'
import { FAQ } from 'src/types/FAQ'

export function ToCategories(data: any): Array<Category> {
  return data.categories ? data.categories.nodes.map((i: any) => ToCategory(i)) : []
}

export function ToCategory(node: any): Category {
  return {
    title: node.frontmatter.title,
    lang: node.fields.lang,
  }
}

export function ToFAQs(data: any): Array<FAQ> {
  return data.faqs ? data.faqs.nodes.map((i: any) => ToFAQ(i)) : []
}

export function ToFAQ(node: any): FAQ {
  return {
    title: node.frontmatter.title,
    body: node.html,
    category: node.frontmatter.category ? node.frontmatter.category.map((i: any) => ToCategory(i)) : [],
    order: node.frontmatter.order,
    lang: node.fields.lang,
  }
}
