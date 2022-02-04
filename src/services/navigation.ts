
import fs from 'fs'
import matter from 'gray-matter'
import { join } from "path"
import { Link } from 'types/Link'
import { NavigationData } from "types/NavigationData"
import { BASE_CONTENT_FOLDER } from 'utils/constants'

export async function GetNavigationData(lang: string = 'en'): Promise<NavigationData> {
    return {
        top: GetNavigation('top', lang),
        site: GetNavigation('site', lang),
        footer: {
            bottom: GetNavigation('footer-bottom', lang),
            highlights: GetNavigation('footer-highlights', lang),
            left: GetNavigation('footer-left', lang),
            right: GetNavigation('footer-right', lang),
        },
    }
}

export function GetNavigation(slug: string, lang: string = 'en'): Array<Link> {
    const filePath = join(process.cwd(), BASE_CONTENT_FOLDER, 'navigation', slug + '.md')
    let content
    try {
        content = fs.readFileSync(filePath, 'utf8')
    }
    catch (e) {
        // file not found.. ignore
    }

    if (!content) {
        console.log('File not found..', filePath)
        return []
    }

    const doc = matter(content)
    return parseLinks(doc.data.links, lang)
}

function parseLinks(links: any[], lang: string): Array<Link> {
    return links.map((i: any) => {
        if (i.type === 'page' || i.type === 'app') {
            // TODO: Get page info from /pages/${slug}.md
            return {
                title: i.slug,
                url: i.slug,
                type: i.type
            }
        }

        if (i.type === 'link') {
            const linkFilePath = join(process.cwd(), BASE_CONTENT_FOLDER, 'links', lang, i.slug + '.md')
            const linkContent = fs.readFileSync(linkFilePath, 'utf8')
            const linkDoc = matter(linkContent)

            return {
                title: linkDoc.data.title,
                url: linkDoc.data.url,
                type: i.type
            }
        }

        if (i.type === 'header') {
            const headerFilePath = join(process.cwd(), BASE_CONTENT_FOLDER, 'headers', lang, i.slug + '.md')
            const headerContent = fs.readFileSync(headerFilePath, 'utf8')
            const headerDoc = matter(headerContent)

            return {
                title: headerDoc.data.title,
                url: '#',
                type: i.type
            }
        }
        
        if (i.type === 'links') {
            return {
                title: i.slug,
                url: '#',
                type: i.type,
                links: parseLinks(i.links, lang)
            }
        }

        return {
            title: i.slug,
            url: i.slug,
            type: i.type
        }
    })
}