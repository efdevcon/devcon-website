
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Page } from 'types/Page'
import { Tag } from 'types/Tag'
import { BASE_CONTENT_FOLDER } from 'utils/constants'
import { DIP } from 'types/DIP'
import { NewsItem } from 'types/NewsItem'
import { Category } from 'types/Category'
import { FAQ } from 'types/FAQ'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export function GetPage(slug: string, lang: string = 'en'): Page | undefined {
    try {
        const filePath = join(process.cwd(), BASE_CONTENT_FOLDER, 'pages', lang, slug + '.md')
        const content = fs.readFileSync(filePath, 'utf8')

        if (!content) {
            console.log('File has no content..', filePath)
            return undefined
        }

        const doc = matter(content)
        const allTags = GetTags(lang)
        const tags: Array<string> = doc.data.tags ?? []
        return {
            ...doc.data,
            body: doc.content,
            lang: lang,
            id: slug,
            slug: `/${slug}`, 
            tags: tags.map(i => allTags.find(x => x.slug === i)).filter(i => !!i)
        } as Page
    }
    catch (e) {
        // page not found
    }
}

export function GetPages(lang: string = 'en'): Array<Page> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'pages', lang)
    return fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const doc = matter(content)
        const allTags = GetTags(lang)
        const tags: Array<string> = doc.data.tags ?? []
        return {
            ...doc.data,
            lang: lang,
            id: i.replace('.md', '').toLowerCase(),
            slug: `/${i.replace('.md', '').toLowerCase()}`,
            tags: tags.map(i => allTags.find(x => x.slug === i)).filter(i => !!i)
        } as Page
    }).filter(i => !!i) as Array<Page>
}

export async function GetDIPs(lang: string = 'en'): Promise<Array<DIP>> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'dips', lang)
    const allDips = fs.readdirSync(dir, { withFileTypes: true })
        .filter(i => i.isFile() && i.name.endsWith('.md'))
        .map(i => Number(i.name.replace('.md', '').replace('DIP-', '')))
        .sort((a, b) => a - b)

    const dips = fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const currentIndex = allDips.indexOf(Number(i.replace('.md', '').replace('DIP-', '')))
        const prevDip = currentIndex > 0 ? `/${lang}/dips/dip-${allDips[currentIndex - 1]}` : `/${lang}/dips/`
        const nextDip = currentIndex < allDips.length ? `/${lang}/dips/dip-${allDips[currentIndex + 1]}` : `/${lang}/dips/`

        const doc = matter(content)

        // const htmlFormattedMarkdown = serialize(doc.content);

        return {
            number: doc.data.DIP,
            title: doc.data.Title,
            summary: doc.data.Summary,
            status: doc.data.Status,
            github: doc.data['Github URL'],
            themes: doc.data.Themes ? doc.data.Themes.split(',') : [],
            tags: doc.data.Tags ? doc.data.Tags.split(',') : [],
            authors: doc.data.Authors ? doc.data.Authors.split(',') : [],
            resources: doc.data['Resources Required'] ?? '',
            discussion: doc.data.Discussion,
            created: doc.data.Created ? new Date(doc.data.Created).getTime() : 0,
            body: doc.content,
            slug: i.replace('.md', '').toLowerCase(),
            next_dip: nextDip,
            prev_dip: prevDip
        } as DIP
    }).filter(i => !!i) as Array<DIP>

    // Parse markdown into html
    await Promise.all(dips.map(async dip => {
        if (dip.body) {
            const markdownAsHtml = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeSanitize)
                .use(rehypeStringify)
                .process(dip.body)

            dip.body = String(markdownAsHtml);
        }

        if (dip.summary) {
            let summary = dip.summary; 

            if (summary.length > 255) summary = `${summary.slice(0, 255)}...`

            const markdownAsHtml = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeSanitize)
                .use(rehypeStringify)
                .process(summary)

            dip.summary = String(markdownAsHtml);
        }
    }))

    return dips;
}

export function GetNews(lang: string = 'en'): Array<NewsItem> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'news', lang)
    return fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const doc = matter(content)
        const allTags = GetTags(lang)
        const tags: Array<string> = doc.data.tags ?? []
        return {
            ...doc.data,
            id: i.replace('.md', '').toLowerCase(),
            title: doc.data.title,
            date: new Date(doc.data.date).getTime(),
            tags: tags.map(i => allTags.find(x => x.slug === i)).filter(i => !!i)
        } as NewsItem
    }).filter(i => !!i) as Array<NewsItem>
}

export function GetCategories(lang: string = 'en'): Array<Category> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'categories', lang)
    const faqs = GetFAQ(lang)
    return fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const doc = matter(content)
        const id = i.replace('.md', '').toLowerCase()
        return {
            id: id,
            title: doc.data.title,
            questions: faqs.filter(x => x.category?.id === id)
        } as Category
    }).filter(i => !!i) as Array<Category>
}

export function GetFAQ(lang: string = 'en'): Array<FAQ> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'faq', lang)

    return fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const doc = matter(content)
        const singleFaq = {
            ...doc.data,
            id: i.replace('.md', '').toLowerCase(),
            title: doc.data.title,
            body: doc.content,
            order: doc.data.order ?? undefined,
            category: { id: doc.data.category }
        } as FAQ

        return singleFaq
    }).filter(i => !!i) as Array<FAQ>
}

export function GetTags(lang: string = 'en'): Array<Tag> {
    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'tags', lang)

    return fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }

        const doc = matter(content)
        return {
            ...doc.data,
            id: i.replace('.md', '').toLowerCase(),
            slug: i.replace('.md', '').toLowerCase(),
            title: doc.data.title,
            lang: lang
        } as Tag
    }).filter(i => !!i) as Array<Tag>
}