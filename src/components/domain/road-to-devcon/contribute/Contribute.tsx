import React, { useState } from 'react'
import { PageContent, Page } from 'src/components/common/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './contribute.module.scss'
import { Proposals } from 'src/components/domain/dips/overview/proposals'
import { Dropdown } from 'src/components/common/dropdown'
import { Filter } from 'src/components/common/filter'
import { ScrollGradient } from 'src/components/common/scroll-gradient'
import IconInfo from 'src/assets/icons/info.svg'
import { Modal } from 'src/components/common/modal'

export const Contribute = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const [filter, setFilter] = useState('')
  const filters = ['All', 'Draft', 'Accepted', 'Withdrawn', 'Not Implemented']
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent
        backgroundText={intl.formatMessage({ id: 'rtd_improvement_proposals' })}
        links={[
          { url: 'https://github.com/efdevcon/', title: 'Github', icon: 'github' },
          { url: 'https://forum.devcon.org/', title: 'Forum', icon: 'forum' },
        ]}
        bottomLinks={[
          { url: 'https://github.com/efdevcon/DIPs', title: intl.formatMessage({ id: 'rtd_continue_to_github' }) },
        ]}
      >
        <div className={css['container']}>
          <div className={css['header']}>
            <div className={css['title']}>
              <h3 className="subsection-header">{intl.formatMessage({ id: 'dips_proposals' })}</h3>
              <span
                role="button"
                className={css['info']}
                aria-label={props.whatIsaDIP.title}
                onClick={() => {
                  setModalOpen(true)
                }}
              >
                <IconInfo />
              </span>
            </div>
            <div className={css['dropdown']}>{/* <Dropdown onFilter={e => setFilter(e)} filters={filters} /> */}</div>
            <div className={css['filter']}>{/* <Filter onFilter={e => setFilter(e)} filters={filters} /> */}</div>
          </div>
          <ScrollGradient className={css['gradient']} height="50px">
            <div className={css['content']}>
              <Proposals dips={props.dips} filter={filter} />
            </div>
          </ScrollGradient>
        </div>

        <Modal
          open={modalOpen}
          close={() => setModalOpen(false)}
          onWheel={(e: React.SyntheticEvent) => e.nativeEvent.stopImmediatePropagation()}
          onMouseDown={(e: React.SyntheticEvent) => e.stopPropagation()}
        >
          <div className={css['modal-container']}>
            <h4>{props.whatIsaDIP.title} — </h4>
            <div
              className={css['modal-content'] + ' markdown'}
              dangerouslySetInnerHTML={{ __html: props.whatIsaDIP.body }}
            />
          </div>
        </Modal>
      </PageContent>
    </Page>
  )
})
