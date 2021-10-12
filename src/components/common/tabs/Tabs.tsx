import { useLocation } from '@reach/router'
import React, { ReactNode, useState, useEffect } from 'react'
import { useQueryStringer } from 'src/hooks/useQueryStringer'
import css from './tabs.module.scss'

interface TabsProps {
  children: any
  useQuerystring?: boolean
  tabContentClassName?: string
}

const findFirstValidTab = (children: React.ReactChildren): any => {
  // Children can be invalid (happens when a child is rendered conditionally), so we'll loop until we find the first valid child
  return React.Children.toArray(children).find(child => !!child)
}

export function Tabs(props: TabsProps) {
  const tab = new URLSearchParams(useLocation().search).get('tab') ?? ''
  let defaultTab = props.children ? findFirstValidTab(props.children)?.props?.title : ''
  if (props.useQuerystring) {
    const child = React.Children.toArray(props.children).find(i => !!i && i.props?.title === tab)

    if (child) {
      defaultTab = child.props?.title
    }
  }
  
  const [activeTab, setActiveTab] = useState(defaultTab)  
  if (props.useQuerystring) useQueryStringer({ tab: activeTab }, true)

  let tabContentClassName = css['tab-content']
  if (props.tabContentClassName) tabContentClassName += ` ${props.tabContentClassName}`

  return (
    <>
      <ul className={css['tabs']}>
        {props.children &&
          props.children.map((child: any) => {
            if (!child) return null

            const childProps = child.props
            const className = childProps.title === activeTab ? 'active' : ''

            console.log('Render tab headers', childProps.title, className)
            return (
              <li key={childProps.title} className={css[className]} onClick={() => setActiveTab(childProps.title)}>
                {childProps.title}
              </li>
            )
          })}
      </ul>

      <div className={tabContentClassName}>
        {props.children &&
          props.children.map((child: any) => {
            if (!child) return null
            if (child.props.title !== activeTab) return undefined
            return child
          })}
      </div>
    </>
  )
}

interface TabProps {
  title: string
  children: ReactNode
}

export function Tab(props: TabProps) {
  return <div id={props.title}>{props.children}</div>
}
