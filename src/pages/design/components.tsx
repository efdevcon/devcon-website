import moment from 'moment'
import React from 'react'
import { Accordion } from 'src/components/common/accordion'
import { Alert } from 'src/components/common/alert'
import { Card } from 'src/components/common/card'
import { Carousel } from 'src/components/common/carousel'
import { Dropdown } from 'src/components/common/dropdown'
import { Filter } from 'src/components/common/filter'
import { Label } from 'src/components/common/label'
import { Link } from 'src/components/common/link'
import { Modal } from 'src/components/common/modal'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'
import { Tooltip } from 'src/components/common/tooltip'

export default function Components() {
  const [modalOpen, setModalOpen] = React.useState(false)

  const items = [
    { id: '1', title: 'Accordion item #1', body: 'This is the extended body of accordion item #1' },
    { id: '2', title: 'Accordion item #2', body: 'This is the extended body of accordion item #2' },
    { id: '3', title: 'Accordion item #3', body: 'This is the extended body of accordion item #3' },
  ]
  const filters = ['Filter item #1', 'Filter item #2', 'Filter item #3']

  return (
    <div>
      <h1>Components</h1>
      <br />
      <h2>Accordion</h2>
      <Accordion title="Expanded Accordion" open={true} items={items} />
      <Accordion title="Collapsed Accordion" open={false} items={items} />
      <br />
      <h2>Alerts</h2>
      <Alert type="success" message="A success alert message." />
      <Alert type="error" message="A error alert message." />
      <Alert type="warning" message="A warning alert message." />
      <Alert type="info" message="A info alert message." />
      <Alert type="light" message="A light alert message." />
      <br />
      <h3>Options</h3>
      <Alert type="success" title="With custom title" message="A success alert message." />
      <Alert type="error" title="Without message" />
      <Alert type="warning" message='You can dismiss this alert by clicking "X"' dismissable={true} />
      <Alert type="info" dismissable={true} />
      <br />
      <h2>Buttons</h2>
      <button>Button</button>
      <button className="button-primary">Primary Button</button>
      <button className="button-secondary">Secondary Button</button>
      {/* <button className="button-tertiary">Terietary Button</button> */}
      <br />
      <br />
      <h2>Cards</h2>
      <div style={{ width: '454px' }}>
        <Card
          title="Card with Description"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          imageUrl="https://blog.ethereum.org/img/2019/09/eth-wallpaper.jpg"
          linkUrl="https://www.devcon.org/"
          metadata={[moment(new Date()).format('ll'), 'devcon team']}
        />
        <Card
          title="Card with Image"
          imageUrl="https://devcon.org/assets/images/rtd-social.png"
          linkUrl="https://www.devcon.org/"
          metadata={[moment(new Date()).format('ll'), 'devcon team']}
        />
      </div>
      <br />
      <h2>Carousel</h2>
      <Carousel />
      <br />
      <h2>Dropdown</h2>
      {/* <Dropdown filters={filters} /> */}
      <br />
      <br />
      <h2>Filter</h2>
      {/* <Filter filters={filters} /> */}
      <br />
      <br />
      <h2>Label</h2>
      <Label>Default Label</Label>
      <Label type="success">Success Label</Label>
      <Label type="error">Error Label</Label>
      <Label type="warning">Warning Label</Label>
      <br />
      <br />
      <h2>Link</h2>
      <Link to="/design">Internal Link</Link> <br />
      <Link to="https://www.devcon.org/">External Link</Link> <br />
      <Link to="https://www.devcon.org/" indicateExternal>
        External Link with Icon
      </Link>{' '}
      <br />
      <br />
      <h2>Modal</h2>
      <span role="button" onClick={() => setModalOpen(true)}>
        Click to open Modal
      </span>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(!modalOpen)}
        onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
        onWheel={(e: React.SyntheticEvent) => e.nativeEvent.stopImmediatePropagation()}
      >
        <div>Modal Content</div>
      </Modal>
      <br />
      <h2>Table</h2>
      <div>...</div>
      <br />
      <h2>Tabs</h2>
      <Tabs>
        <Tab title="Tab #1">
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo leo nec urna faucibus, sed
              luctus arcu tristique. Maecenas vitae nunc purus. Proin ut nisl commodo, venenatis lacus eu, lobortis
              ligula. Nam felis justo, vulputate nec tempus porta, placerat sit amet augue.
            </p>
          </div>
        </Tab>
        <Tab title="Tab #2">
          <div>
            <p>
              Maecenas semper lacus ut est egestas lacinia. Vestibulum mattis porttitor felis in cursus. Pellentesque
              sed elit sed nulla molestie condimentum at ut erat. Ut suscipit magna in ante commodo, vel fermentum
              sapien iaculis. Sed porta nibh in tortor eleifend convallis.
            </p>
            <p>
              Maecenas luctus, metus vitae semper fringilla, felis nisl commodo leo, vel feugiat justo purus quis
              turpis. Vestibulum id mollis diam, non condimentum tellus.
            </p>
          </div>
        </Tab>
      </Tabs>
      <br />
      <h2>Tooltip</h2>
      <Tooltip content={'Lorem ipsum dolor sit amet.'}>
        <p>Tooltip #1</p>
      </Tooltip>
      <br />
    </div>
  )
}
