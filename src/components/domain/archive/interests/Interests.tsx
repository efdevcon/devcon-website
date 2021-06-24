import React from 'react'
import { HorizontalScroller } from 'src/components/common/horizontal-scroller'
import IconCheck from 'src/assets/icons/check_circle.svg'
import IconPlus from 'src/assets/icons/plus.svg'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import css from './interests.module.scss'
import { chunkArray } from 'src/utils/chunk-array'
import { filterToQueryString } from 'src/components/domain/archive/watch/VideoFilter'
import { Link } from 'src/components/common/link'

const tags = [
  {
    title: 'Society and Systems',
  },
  {
    title: 'Scalability',
  },
  {
    title: 'UX & Design',
  },
  {
    title: 'Security',
  },
  {
    title: 'Cryptography',
  },
  {
    title: 'Community',
  },
  {
    title: 'Economics',
  },
  {
    title: 'Standards',
  },
  {
    title: 'Privacy',
  },
  {
    title: 'Consensus Layer',
  },
  {
    title: 'Application Layer',
  },
]

export const Interests = (props: any) => {
  const [selectedTags, setSelectedTags] = React.useState({} as { [key: string]: any })
  const tagRows = chunkArray(tags, 1 /*2*/) // Accounts currently missing, so we'll wait with chunking the array to take up more horizontal space in the meantime

  return (
    <div className="section">
      <div className="content">
        <h5 className="font-sm font-primary">Interests</h5>
        <p className="font-xs">Select topics most relevant to your interest.</p>

        {tagRows.map((tagRow, index) => {
          return (
            <div key={index} className={css['tags']}>
              {tagRow.map(tag => {
                let className = `${css['tag']} label plain white`
                const selected = selectedTags[tag.title]

                if (selected) className += ` ${css['selected']} inverted`

                return (
                  <button
                    className={className}
                    key={tag.title}
                    onClick={() => {
                      const nextTags = {
                        ...selectedTags,
                        [tag.title]: true,
                      } as any

                      const selected = selectedTags[tag.title]

                      if (selected) delete nextTags[tag.title]

                      setSelectedTags(nextTags)
                    }}
                  >
                    <IconCheck className={`icon ${css['icon-check']}`} />
                    <IconPlus className={`icon ${css['icon-plus']}`} />
                    <span>{tag.title}</span>
                  </button>
                )
              })}
            </div>
          )
        })}

        <div className={css['clear']}>
          <Link
            className={`${css['continue']} button red`}
            to={`/archive/watch${filterToQueryString({ tags: selectedTags })}`}
          >
            <span>Get Started</span> <IconArrowRight />
          </Link>

          <p className={`${css['clear']} bold text-underline`} onClick={() => setSelectedTags({})}>
            Clear All
          </p>
        </div>
      </div>
    </div>
  )
}
