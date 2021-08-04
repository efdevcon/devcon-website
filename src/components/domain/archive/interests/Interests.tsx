import React from 'react'
import IconCheck from 'src/assets/icons/check_circle.svg'
import IconPlus from 'src/assets/icons/plus.svg'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'
import css from './interests.module.scss'
import { chunkArray } from 'src/utils/chunk-array'
import { Link } from 'src/components/common/link'
import { useQueryStringer } from 'src/hooks/useQueryStringer'
import { usePageContext } from 'src/context/page-context'

export const Interests = (props: any) => {
  const [selectedTags, setSelectedTags] = React.useState({} as { [key: string]: any })
  const tags = usePageContext()?.data.distinctVideoTags
  const tagRows = chunkArray(tags, 1 /*2*/) // Accounts currently missing, so we'll wait with chunking the array to take up more horizontal space in the meantime
  const queryString = useQueryStringer({ tags: selectedTags }, false)

  const hasSelectedTags = Object.keys(selectedTags).length > 0;

  return (
    <div className="section">
      <div className={`${css['container']} content padding-bottom`}>
        <div className={css['header']}>
          <h4 className={`bold font-xl font-primary ${css['title']}`}>Explore Devcon Archive —</h4>
          <p className="font-xs">
            Dive into the immersive world of Devcon content by selecting topics most relevant to your interest.
          </p>
          <p className={css['rabbit']}>✨🦄</p>
        </div>

        <div className={css['tags-container']}>
          <p className="bold font-sm">Filter by Category</p>
          {tagRows.map((tagRow, index) => {
            return (
              <div key={index} className={css['tags']}>
                {tagRow.map(tag => {
                  let className = `${css['tag']} label label-hover plain white`
                  const selected = selectedTags[tag]

                  if (selected) className += ` ${css['selected']} black`

                  return (
                    <button
                      className={className}
                      key={tag}
                      onClick={() => {
                        const nextTags = {
                          ...selectedTags,
                          [tag]: true,
                        } as any

                        const selected = selectedTags[tag]

                        if (selected) delete nextTags[tag]

                        setSelectedTags(nextTags)
                      }}
                    >
                      <div className={css['icons']}>
                        <IconCheck className={`icon ${css['icon-check']}`} />
                        <IconPlus className={`icon ${css['icon-plus']}`} />
                      </div>
                      <span>{tag}</span>
                    </button>
                  )
                })}
              </div>
            )
          })}

          <div className={css['clear']}>
            <Link className={`${!hasSelectedTags ? 'disabled ' : ''}${css['continue']} font-sm button red`} to={`/archive/watch${queryString}`}>
              <span>View talks</span> <IconArrowRight />
            </Link>

            {hasSelectedTags && 
              <p className={`${css['clear']} bold text-underline`} onClick={() => setSelectedTags({})}>
                Clear All
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
