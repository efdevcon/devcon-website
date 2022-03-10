
import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Notification } from 'types/Notification'
import { BASE_CONTENT_FOLDER } from 'utils/constants'

export function GetLatestNotification(lang: string = 'en') { 
    if (lang !== 'es') lang = 'en'

    return GetNotifications(lang).shift()
}

export function GetNotifications(lang: string = 'en'): Array<Notification> { 
    if (lang !== 'es') lang = 'en'

    const dir = join(process.cwd(), BASE_CONTENT_FOLDER, 'notifications', lang)
    const notifications = fs.readdirSync(dir).map(i => {
        const content = fs.readFileSync(join(dir, i), 'utf8')
        if (!content) {
            console.log('File has no content..', i)
            return undefined
        }
        
        const doc = matter(content)
        return {
          title: doc.content,
          url: doc.data.url,
          label: doc.data.label,
          labelType: doc.data.labelType,
        } as Notification
    })

    return notifications.filter(i => !!i) as Array<Notification>
}