import React, { useEffect } from 'react'
import { Slider, useSlider } from 'src/components/common/slider'
import VerticalDotsIcon from 'src/assets/icons/vertical-dots.svg'
import { BasicCard } from 'src/components/common/card'
import { Link } from 'src/components/common/link'
import ShareIcon from 'src/assets/icons/share.svg'
import { Share } from 'src/components/common/share'
import QRCode from 'qrcode.react'
import {
  CollapsedSection,
  CollapsedSectionHeader,
  CollapsedSectionContent,
} from 'src/components/common/collapsed-section'
import { Dropdown } from 'src/components/common/dropdown'
import css from './home.module.scss'
import ticket from './ticket.png'
import thumbnailPlaceholder from 'src/assets/images/thumbnail-placeholder.png'

export const Home = (props: any) => {
  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    touchThreshold: 100,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3.2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 2.1,
        },
      },
    ],
  }

  const sliderProps = useSlider(settings)

  return (
    <div className="section">
      <div className="content">
        <div className={`${css['account']} border-bottom`}>
          <div className="font-xxl font-primary">
            <h2 className="font-primary">
              Welcome, <br /> Larry -_-
            </h2>
          </div>
          <div className={css['profile-actions']}>
            <button className="label error plain">SETTINGS</button>
            <button className="label error plain">MANAGE WALLETS</button>
            <button className="label error plain">MANAGE EMAILS</button>
          </div>

          {/* <div className={css['dropdown']}>
            <VerticalDotsIcon />
          </div> */}
          <Dropdown
            value="Another thing2"
            renderCustomTrigger={(triggerProps, foldoutContent) => {
              return (
                <div {...triggerProps} className={css['dropdown']}>
                  <VerticalDotsIcon className={`${css['trigger']} icon`} />
                  {foldoutContent}
                </div>
              )
            }}
            onChange={() => console.log('hello')}
            options={[
              {
                text: 'Menu Item 1',
                value: 'Another thing2',
                onClick: () => alert('Clicked'),
              },
              {
                text: 'Menu Item 2',
                value: 'Another thing3',
                onClick: () => alert('Clicked'),
              },
              {
                text: 'Menu Item 3',
                value: 'Another thing4',
                onClick: () => alert('Clicked'),
              },
              {
                text: 'Menu Item 4',
                value: 'Another thing5',
                onClick: () => alert('Clicked'),
              },
            ]}
          />
        </div>

        <CollapsedSection>
          <CollapsedSectionHeader>
            <div className={css['wallet']}>
              <img src={thumbnailPlaceholder} className={css['circle']} />

              <div className={css['details']}>
                <p className={css['network']}>ETHEREUM MAINNET</p>
                <p className={css['wallet-address']}>larry.devcon.eth</p>
                <p className={css['connection']}>Connected</p>
              </div>
            </div>
          </CollapsedSectionHeader>

          <CollapsedSectionContent>
            <div> Here's some hidden content </div>
          </CollapsedSectionContent>
        </CollapsedSection>

        <div className={css['slider-container']}>
          <p className="font-lg bold">Devcon</p>

          <Slider containerClassName={css['slider']} sliderProps={sliderProps} title={props.title} onlySlider>
            <BasicCard
              className={`${css['card']} ${css['pink']}`}
              slide={sliderProps[1].canSlide}
              expandLink
              linkUrl="/app/schedule"
              allowDrag
            >
              <p className={css['title']}>Schedule</p>
              <p className={css['description']}>View & manage your devcon schedule.</p>
            </BasicCard>
            <BasicCard
              className={`${css['card']} ${css['yellow']}`}
              slide={sliderProps[1].canSlide}
              expandLink
              linkUrl="/app/schedule"
              allowDrag
            >
              <p className={css['title']}>Guides</p>
              <p className={css['description']}>Access Devcon Bogota local guides.</p>
            </BasicCard>
            <BasicCard
              className={`${css['card']} ${css['green']}`}
              slide={sliderProps[1].canSlide}
              expandLink
              linkUrl="/app/schedule"
              allowDrag
            >
              <p className={css['title']}>Venue Map</p>
              <p className={css['description']}>Find your way around the Conference</p>
            </BasicCard>
            <BasicCard
              className={`${css['card']} ${css['blue']}`}
              slide={sliderProps[1].canSlide}
              expandLink
              linkUrl="/app/schedule"
              allowDrag
            >
              <p className={css['title']}>Speakers</p>
              <p className={css['description']}>View speakers presenting at Devcon.</p>
            </BasicCard>
          </Slider>
        </div>

        <CollapsedSection>
          <CollapsedSectionHeader title="Updates" />

          <CollapsedSectionContent>
            <div>Here's some hidden content</div>
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection>
          <CollapsedSectionHeader title="Ticket Attestation" />

          <CollapsedSectionContent>
            <div className={css['ticket-container']}>
              <div className={css['ticket']}>
                <img src={ticket} />

                <p className={css['ticket-type']}>Builder Ticket</p>
                <p className={css['ticket-id']}>No 1561854</p>
                <div className={css['qr-code']}>
                  <QRCode value="https://en.wikipedia.org/wiki/Larry" style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className={css['bottom']}>
                <button className="label neutral plain">Manage Attestations</button>
                <div className={css['nft']}>
                  <Link to="https://www.youtube.com/watch?v=lCcwn6bGUtU" className={css['view-nft']}>
                    View ticket NFT
                  </Link>

                  <Share url="https://www.youtube.com/watch?v=lCcwn6bGUtU" />
                </div>
              </div>
            </div>
          </CollapsedSectionContent>
        </CollapsedSection>

        <CollapsedSection>
          <CollapsedSectionHeader title="Collection" />

          <CollapsedSectionContent>
            <div>Collection</div>
          </CollapsedSectionContent>
        </CollapsedSection>
      </div>
    </div>
  )
}
