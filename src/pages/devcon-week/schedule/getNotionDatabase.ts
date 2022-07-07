import { Client } from '@notionhq/client'

// Notion fetch/format below
const notionDatabasePropertyResolver = (property: any, key: any) => {
  switch (property.type) {
    case 'text':
    case 'rich_text':
    case 'title':
      // Extract url and url text from the Location column
      if (key === 'Location' && property[property.type]) {
        let locationInfo = {} as any

        property[property.type].forEach((chunk: any) => {
          if (chunk.href) {
            locationInfo.url = chunk.href
            locationInfo.text = chunk.plain_text
          }
        })

        return locationInfo
      }

      const dechunked = property[property.type]
        ? property[property.type].reduce((acc: string, chunk: any) => {
            if (chunk.href && property.type === 'rich_text' && key !== 'URL' && key !== 'Stream URL') {
              acc += `<a href=${chunk.href} target="_blank" class="generic" rel="noopener noreferrer">${chunk.plain_text}</a>`
            } else {
              acc += chunk.plain_text
            }

            return acc
          }, '')
        : null

      return `${dechunked}`

    case 'date':
      if (property.date) {
        return {
          startDate: property.date.start,
          endDate: property.date.end || property.date.start,
        }
      }

      return null

    case 'multi_select':
      if (property.multi_select) {
        return property.multi_select.map((value: any) => value.name)
      }

      return null
    case 'select':
      return property.select && property.select.name

    default:
      return 'default value no handler for: ' + property.type
  }
}

const formatResult = (result: any) => {
  const properties = {} as { [key: string]: any }

  // Format the raw notion data into something more workable
  Object.entries(result.properties).forEach(([key, value]) => {
    const val = notionDatabasePropertyResolver(value, key)

    if (Array.isArray(val)) {
      properties[key] = val
    } else if (typeof val === 'object' && val !== null) {
      properties[key] = {
        ...val,
      }
    } else {
      properties[key] = val
    }
  })

  // Insert a default value for time of day when unspecified
  if (!properties['Time of Day']) properties['Time of Day'] = 'FULL DAY'

  return properties
}

const getNotionDatabase = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const databaseID = '8b177855e75b4964bb9f3622437f04f5' // Devconnect
  // const databaseID = '517164deb17b42c8a00a62e775ce24af' // Devcon week

  let data = {}

  try {
    // Notion returns up to 100 results per request. We won't have that many events, but if we ever get close, add support for pagination at this step.
    const response = await notion.databases.query({
      database_id: databaseID,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
        {
          property: 'Priority (sort)',
          direction: 'descending',
        },
      ],
      filter: {
        and: [
          {
            property: 'Date',
            date: {
              is_not_empty: true,
            },
          },
          {
            property: 'Live',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    data = response.results.map(formatResult)
  } catch (error) {
    if (false) {
      // Handle error codes here if necessary
    } else {
      // Other error handling code
      console.error(error)
    }
  }

  return data
}

export default getNotionDatabase
