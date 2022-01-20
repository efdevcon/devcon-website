import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import css from './login.module.scss'
import { Link, LinkList } from 'src/components/common/link'
import { Button } from 'src/components/common/button'
import { useAccountContext } from 'src/context/account-context'
import { Alert } from 'src/components/common/alert'
import { CollapsedSection, CollapsedSectionHeader, CollapsedSectionContent } from 'src/components/common/collapsed-section'
import AccountFooter from './AccountFooter'

export default function SettingsPage(props: RouteComponentProps) {
  const accountContext = useAccountContext()
  const [areYouSure, setAreYouSure] = useState(false)
  const [error, setError] = useState('')

  const deleteAccount = async () => {
    if (!accountContext.account?._id) {
      setError('Unable to delete account.')
      return
    }
    
    await accountContext.deleteAccount(accountContext.account?._id)
  }

  return (
    <div className={css['container']}>
      <div>
        <div className="section">
          <div className="content">

            <div className={css['alert']}>
              {error && <Alert type="info" message={error} />}
            </div>

            <CollapsedSection>
              <CollapsedSectionHeader title="Account" />
              <CollapsedSectionContent>
                <div className={css['links']}>
                  <LinkList>
                    <Link to="/app/settings/username">Edit username</Link>
                    <Link to="/app/settings/email">Manage Email</Link>
                    <Link to="/app/settings/wallets">Manage Wallets</Link>
                  </LinkList>
                </div>
              </CollapsedSectionContent>
            </CollapsedSection>

            <CollapsedSection>
              <CollapsedSectionHeader title="Notifications" />
              <CollapsedSectionContent>
                <div className={css['links']}>
                  <LinkList>
                    <Link to="/app/settings">Personalized Agenda</Link>
                    <Link to="/app/settings">Programming Suggestions</Link>
                    <Link to="/app/settings">Health &amp; Safety</Link>
                  </LinkList>
                </div>
              </CollapsedSectionContent>
            </CollapsedSection>

            <CollapsedSection>
              <CollapsedSectionHeader title="Application" />
              <CollapsedSectionContent>
                <div className={css['links']}>
                  <LinkList>
                    <Link to="/app/faq">FAQ</Link>
                    <Link to="/app/support">Support</Link>
                  </LinkList>
                </div>
              </CollapsedSectionContent>
            </CollapsedSection>

            <CollapsedSection>
              <CollapsedSectionHeader title="Delete Account" />
              <CollapsedSectionContent>
                <div className={css['wallet']}>
                  <p>Once you delete your Devcon account, there is no going back. Tread lightly.</p>
                  {!areYouSure && <Button className={`red ${css['button']}`} onClick={() => setAreYouSure(true)}>Delete Devcon account</Button>}

                  {areYouSure && <>
                    <Button className={`black ${css['button']}`} onClick={() => setAreYouSure(false)}>No, keep my account</Button>
                    <Button className={`red ${css['button']}`} onClick={deleteAccount}>Yes, delete my account</Button>
                  </>}
                </div>
              </CollapsedSectionContent>
            </CollapsedSection>

          </div>
        </div>
      </div>
      
      <AccountFooter />
    </div>
  )
}
