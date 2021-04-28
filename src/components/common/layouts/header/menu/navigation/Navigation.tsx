import React from 'react'
import IconArrowDown from 'src/assets/icons/arrow_drop_down.svg'
import { Link } from 'src/components/common/link'
import css from './navigation.module.scss'
import { Link as LinkType } from 'src/types/Link'
import ArrowCollapse from 'src/assets/icons/arrow_collapse.svg'
import ArrowDropdown from 'src/assets/icons/arrow_drop_down.svg'

const Mobile = (props: any) => {
  return (
    <div className={css['mobile-navigation']}>
      <ul className={css['accordion']}>
        {props.navigationData.site.map((i: LinkType, index: number) => {
          return (
            <li key={i.title}>
              {i.title}
              {true ? <ArrowCollapse /> : <ArrowDropdown />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const Navigation = (props: any) => {
  if (props.mobile) {
    return <Mobile {...props} />
  }

  return (
    <>
      <ul className={css['navigation']}>
        {props.navigationData.site.map((i: LinkType, index: number) => {
          const primaryKey = `site-nav-1_${index}`
          const hasChildren = i.links && i.links.length > 0

          const link = (
            <Link className={`${css['foldout-link']} plain bold`} to={i.url}>
              {i.title}
            </Link>
          )

          return (
            <li className="plain bold" key={primaryKey}>
              {hasChildren ? (
                <>
                  {i.title}
                  <IconArrowDown style={{ width: '10px', height: '5px', margin: '8px' }} />
                  <div className={css['foldout']}>
                    {i.links && i.links.length > 0 && (
                      <ul>
                        {i.links?.map((c: LinkType, subIndex: number) => {
                          const subKey = `site-nav-2_${subIndex}`

                          if (c.type === 'header') {
                            return (
                              <li key={subKey}>
                                <span className={css['foldout-header']}>{c.title}</span>
                              </li>
                            )
                          }
                          if (c.type === 'links') {
                            // nothing?
                          }

                          return (
                            <li key={subKey}>
                              <Link className={`${css['foldout-link']} plain`} to={c.url}>
                                {c.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </>
              ) : (
                link
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}
