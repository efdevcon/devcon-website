import React, { ReactNode, useState } from 'react'
import css from './tabs.module.scss'

interface TabsProps {
  children: any
  tabContentClassName?: string
}

const findFirstValidTab = (children: React.ReactChildren): any => {
  // Children can be invalid (happens when a child is rendered conditionally), so we'll loop until we find the first valid child
  return React.Children.toArray(children).find(child => !!child)
}

export function Tabs(props: TabsProps) {
  const defaultTab = props.children ? findFirstValidTab(props.children).props.title : ''
  const [activeTab, setActiveTab] = useState(defaultTab)

  let tabContentClassName = css['tab-content']

  if (props.tabContentClassName) tabContentClassName += ` ${props.tabContentClassName}`

  console.log(tabContentClassName, 'uh')

  return (
    <>
      <ul className={css['tabs']}>
        {props.children &&
          props.children.map((child: any) => {
            if (!child) return null

            const childProps = child.props
            const className = childProps.title === activeTab ? 'active' : ''

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
