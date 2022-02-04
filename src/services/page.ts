
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Page } from 'types/Page'
import { Tag } from 'types/Tag'
import { BASE_CONTENT_FOLDER } from 'utils/constants'


export function GetPage(slug: string, lang: string = 'en'): Page | undefined { 
    const filePath = join(process.cwd(), BASE_CONTENT_FOLDER, slug + '.md')
    const content = fs.readFileSync(filePath, 'utf8')

    if (!content) {
        console.log('File has no content..', filePath)
        return undefined
    }

    const doc = matter(content)
    return { 
        ...doc.data,
        lang: lang,
        id: slug,
        slug: slug,
        tags: new Array<Tag>()
    } as Page
}
