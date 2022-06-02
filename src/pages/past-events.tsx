import React from 'react'
import Page from 'components/common/layouts/page'
import { PageHero } from 'components/common/page-hero'
import themes from './themes.module.scss'
import { pageHOC } from 'context/pageHOC'
import { getGlobalData } from 'services/global'
import { GetPage } from 'services/page'
import { GetBlogs } from 'services/blogs'
import { Tags } from 'components/common/tags'
import { usePageContext } from 'context/page-context'
import ArrowRight from 'assets/icons/arrow_right.svg'
import Accordion from 'components/common/accordion'
import css from './past-events.module.scss'
import { Link } from 'components/common/link'
import Image from 'next/image'
import { Button } from 'components/common/button'
import EventLocations from 'assets/images/event-locations.png'
// import ImageEdition01 from 'assets/images/editions/devcon-0_1.png'
// import ImageEdition02 from 'assets/images/editions/devcon-0_2.png'
// import ImageEdition03 from 'assets/images/editions/devcon-0_3.png'
// import ImageEdition0Title from 'assets/images/editions/devcon-0_title.png'

// import ImageEdition11 from 'assets/images/editions/devcon-1_1.png'
// import ImageEdition12 from 'assets/images/editions/devcon-1_2.png'
// import ImageEdition13 from 'assets/images/editions/devcon-1_3.png'
// import ImageEdition1Title from 'assets/images/editions/devcon-1_title.png'

// import ImageEdition21 from 'assets/images/editions/devcon-2_1.png'
// import ImageEdition22 from 'assets/images/editions/devcon-2_2.png'
// import ImageEdition23 from 'assets/images/editions/devcon-2_3.png'
// import ImageEdition2Title from 'assets/images/editions/devcon-2_title.png'

// import ImageEdition31 from 'assets/images/editions/devcon-3_1.png'
// import ImageEdition32 from 'assets/images/editions/devcon-3_2.png'
// import ImageEdition33 from 'assets/images/editions/devcon-3_3.png'
// import ImageEdition3Title from 'assets/images/editions/devcon-3_title.png'

// import ImageEdition41 from 'assets/images/editions/devcon-4_1.png'
// import ImageEdition42 from 'assets/images/editions/devcon-4_2.png'
// import ImageEdition43 from 'assets/images/editions/devcon-4_3.png'
// import ImageEdition4Title from 'assets/images/editions/devcon-4_title.png'

// import ImageEdition53 from 'assets/images/editions/devcon-5_3.png'
// import ImageEdition52 from 'assets/images/editions/devcon-5_2.png'
// import ImageEdition51 from 'assets/images/editions/devcon-5_1.png'
// import ImageEdition5Title from 'assets/images/editions/devcon-5_title.png'

import Berlin from 'assets/images/editions/Berlin.png'
import Cancun from 'assets/images/editions/Cancun.png'
import Shanghai from 'assets/images/editions/Shanghai.png'
import Prague from 'assets/images/editions/Prague.png'
import Osaka from 'assets/images/editions/Osaka.png'
import London from 'assets/images/editions/London.png'

type EditionProps = {
  number: number
  title: string
  image: any
  children: string | React.ReactChild
  links: {
    text: string
    url: string
  }[]
}

const Edition = (props: EditionProps) => {
  return (
    <div className={css['edition']}>
      <div className={css['left']}>
        <Image src={props.image} alt={`${props.title} event image`} />
        {/* <div className={css['image-container']}>
          <div className="aspect square">
            <div className={className}>
              <div className={css['image-wrapper']}>
                <Image src={props.images[1]} objectFit="cover" alt={`${props.title} event image`} />
              </div>

              <div className={css['image-wrapper']}>
                <Image src={props.images[2]} objectFit="cover" alt={`${props.title} event image`} />
              </div>

              <div className={css['image-wrapper']}>
                <Image src={props.images[3]} objectFit="cover" alt={`${props.title} event image`} />
              </div>

              <div className={`${css['image-wrapper']} ${css['title']}`}>
                <Image src={props.images['title']} objectFit="cover" layout="fill" alt={`${props.title} event image`} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className={css['right']}>
        <h2 className="spaced">{props.title}</h2>
        <div>{props.children}</div>
        <div className={css['links']}>
          {props.links.map(link => {
            return (
              <Link key={link.url} to={link.url}>
                <Button className="green lg" onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                  {link.text}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const editions = [
  {
    title: <h2>Devcon 5</h2>,
    id: 5,
    body: (
      <Edition
        number={5}
        image={Osaka}
        title="Devcon V"
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=5&order=desc&sort=edition',
          },
          {
            text: 'Photo Gallery',
            url: 'https://archive.devcon.org/archive/watch?edition=4&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
  {
    title: <h2>Devcon 4</h2>,
    id: 4,
    body: (
      <Edition
        number={4}
        title="Devcon IV"
        image={Prague}
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=4&order=desc&sort=edition',
          },
          {
            text: 'Photo Gallery',
            url: 'https://archive.devcon.org/archive/watch?edition=4&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
  {
    title: <h2>Devcon 3</h2>,
    id: 3,
    body: (
      <Edition
        number={3}
        title="Devcon III"
        image={Cancun}
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=3&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
  {
    title: <h2>Devcon 2</h2>,
    id: 2,
    body: (
      <Edition
        number={2}
        title="Devcon II"
        image={Shanghai}
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=2&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
  {
    title: <h2>Devcon 1</h2>,
    id: 1,
    body: (
      <Edition
        number={1}
        title="Devcon I"
        image={London}
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=1&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
  {
    title: <h2>Devcon 0</h2>,
    id: 0,
    body: (
      <Edition
        number={0}
        title="Devcon 0"
        image={Berlin}
        links={[
          {
            text: 'Watch',
            url: 'https://archive.devcon.org/archive/watch?edition=0&order=desc&sort=edition',
          },
        ]}
      >
        Devcon 5 brought the Ethereum ecosystem together in Japan in October of 2019 for an event that featured more
        content and attendees than ever before. In addition to the conference talks, Devcon featured the event&apos;s
        first community run outdoor stage and experiential Park area, a powerful open from the City of Osaka, a
        celebrity appearance by the world&apos;s most well-known dog, Kabosu (the original “Doge”) and so much more.
      </Edition>
    ),
  },
]

export default pageHOC(function PastEvents(props: any) {
  const pageContext = usePageContext()

  return (
    <Page theme={themes['about']}>
      <PageHero />

      <div className="section">
        <div className={`two-columns ${css['about']} clear-bottom border-bottom margin-bottom`}>
          <div className={`left ${css['left']}`}>
            <div>
              <h2 className="spaced">Devcon Editions</h2>
              <p className="h2 highlighted">
                Devcon is the Ethereum conference for developers, researchers, thinkers, and makers. Devcon travels the
                world every year, historically rotating to the east each year with every edition bringing something
                unique.
              </p>
            </div>

            <div className={css['links']}>
              <Link to="/schedule" className="text-uppercase hover-underline font-lg bold">
                Programming
                <ArrowRight />
              </Link>
              <Link to="https://archive.devcon.org/archive/" className="text-uppercase hover-underline font-lg bold">
                Archive
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className={`right ${css['right']}`}>
            <h2 className="spaced">Locations</h2>
            <Image src={EventLocations} alt="Devcon events on world map" />
          </div>
        </div>

        <div className="border-bottom clear-bottom">
          <h2>Past Devcons</h2>
        </div>

        {editions.map(edition => {
          return (
            <div key={edition.id} className="clear-bottom clear-top">
              {edition.body}
            </div>
          )
        })}

        {/* <Accordion dense items={editions} /> */}

        <div className="clear-bottom" />

        <Tags items={pageContext?.current?.tags} viewOnly={false} />
      </div>
    </Page>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const page = await GetPage('/past-events', context.locale)

  return {
    props: {
      ...globalData,
      page,
      blogs: await GetBlogs(),
    },
  }
}
