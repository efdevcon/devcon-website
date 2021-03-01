import React, { ReactNode, useState } from 'react'
import css from './tabs.module.scss'

interface TabsProps {
  children: any
}

export function Tabs(props: TabsProps) {
  const defaultTab = props.children ? props.children[0].props.title : ''
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <>
      <ul className={css['tabs']}>
        {props.children &&
          props.children.map((child: any) => {
            const childProps = child.props
            const className = childProps.title === activeTab ? 'active' : ''

            return (
              <li key={childProps.title} className={css[className]} onClick={() => setActiveTab(childProps.title)}>
                {childProps.title}
              </li>
            )
          })}
      </ul>

      <div className="tab-content">
        {props.children &&
          props.children.map((child: any) => {
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
