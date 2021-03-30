import React from 'react'
import { Accordion } from '../accordion'
import { Alert } from '../alert'
import './design-system.module.scss'

export function DesignSystem() {
  const items = [
    { id: '1', title: 'Accordion item #1', body: 'This is the extended body of accordion item #1' },
    { id: '2', title: 'Accordion item #2', body: 'This is the extended body of accordion item #2' },
    { id: '3', title: 'Accordion item #3', body: 'This is the extended body of accordion item #3' },
    { id: '4', title: 'Accordion item #4', body: 'This is the extended body of accordion item #4' },
    { id: '5', title: 'Accordion item #5', body: 'This is the extended body of accordion item #5' },
  ]

  return (
    <div>
      <p>Various components for testing the design system</p>
      <div>
        <h1>Headers</h1>
        <hr />

        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <title>Title</title>
      </div>

      <div>
        <h1>Typography</h1>
        <hr />

        <p>Normal</p>
        <p className="text-italic">Italic</p>
        <p className="text-bold">Bold</p>
        <p className="text-small">Small</p>
        <p className="text-uppercase">Uppercase</p>
        <p className="text-lowercase">Lowercase</p>
        <p className="text-line-through">Linethrough</p>
        <p className="text-underline">Text underline</p>
        <p className="no-underline">No underline</p>

        <h2>Colors</h2>
        <p className="text-primary">Primary</p>
        <p className="text-secondary">Secondary</p>
        <p className="text-tertiary">Tertiary</p>
      </div>

      <div>
        <h1>Buttons</h1>
        <hr />

        <button>Button</button>
        <button className="button-primary">Primary Button</button>
        <button className="button-primary">Secondary Button</button>
        <button className="button-tertiary">Terietary Button</button>
      </div>

      <div>
        <h1>Alerts</h1>
        <hr />

        <Alert type="success" message="A success alert message." />
        <Alert type="error" message="A error alert message." />
        <Alert type="warning" message="A warning alert message." />
        <Alert type="info" message="A info alert message." />
        <Alert type="light" message="A light alert message." />

        <h2>Options</h2>
        <Alert type="success" title="With custom title" message="A success alert message." />
        <Alert type="error" title="Without message" />
        <Alert type="warning" message='You can dismiss this alert by clicking "X"' dismissable={true} />
        <Alert type="info" dismissable={true} />
      </div>

      <div>
        <h1>Accordion</h1>
        <hr />

        <Accordion title="Expanded Accordion" open={true} items={items} />
        <Accordion title="Collapsed Accordion" open={false} items={items} />
      </div>

      <div>
        <br />
      </div>
    </div>
  )
}
