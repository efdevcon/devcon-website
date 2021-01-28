import React from 'react'
import IconMenu from 'src/assets/icons/menu.svg'
import IconArrowDown from 'src/assets/icons/arrow_drop_down.svg'
import { Link } from 'src/components/common/link'
import css from './navigation.module.scss'
import { usePageContext } from 'src/context/page-context'
import { Link as LinkType } from 'src/types/Link'

export const Navigation = () => {
  const { navigation } = usePageContext()

  return (
    <>
      <ul className={css['navigation']}>
        {navigation.site.map((i: LinkType, index: number) => {
          const primaryKey = `site-nav-1_${index}`;
          const hasChildren = i.links && i.links.length > 0

          const link = (
            <Link className={`${css['foldout-link']} plain`} to={i.url}>
              {i.title}
            </Link>
          )

          return (
            <li className="plain" key={primaryKey}>
              {hasChildren ? (
                <>
                  {i.title}
                  <IconArrowDown style={{ width: '10px', height: '5px', margin: '8px' }} />
                  <div className={css['foldout']}>
                    {i.links && i.links.length > 0 && (
                      <ul>
                        {i.links?.map((c: LinkType, subIndex: number) => {
                          const subKey = `site-nav-2_${subIndex}`;

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

      <IconMenu style={{ width: '30px', height: '20px', marginLeft: '28px', cursor: 'pointer' }} />
    </>
  )
}
