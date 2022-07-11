import { useTranslations } from 'next-intl'
import LogoProgram from 'assets/images/pages/program.svg'
import LogoAbout from 'assets/images/pages/about.svg'
import LogoBogota from 'assets/images/pages/bogota.svg'
import LogoTickets from 'assets/images/pages/tickets.svg'
import LogoGetInvolved from 'assets/images/pages/get-involved.svg'

const useNavigationData = () => {
  const intl = useTranslations()

  return {
    top: [
      {
        title: intl('navigation_archive'),
        url: 'https://archive.devcon.org/archive/',
        type: 'link',
      },
      {
        title: intl('navigation_forum'),
        url: 'https://forum.devcon.org/',
        type: 'link',
      },
      {
        title: intl('navigation_blog'),
        url: '/blogs',
        type: 'page',
      },
    ],
    site: [
      {
        title: intl('news'),
        url: '/news',
        type: 'page',
      },
      {
        title: intl('navigation_about'),
        url: '#',
        type: 'links',
        logo: LogoAbout,
        links: [
          {
            title: 'Devcon',
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_about_devcon'),
            url: '/about',
            type: 'page',
          },
          {
            title: intl('navigation_past_events'),
            url: '/past-events',
            type: 'page',
          },
          {
            title: intl('navigation_faq'),
            url: '/faq',
            type: 'page',
          },
        ],
      },
      {
        title: intl('navigation_tickets'),
        url: '#',
        type: 'links',
        logo: LogoTickets,
        links: [
          {
            title: intl('navigation_tickets'),
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_get_tickets'),
            url: '/tickets',
            type: 'page',
          },
          {
            title: intl('navigation_tickets_raffle'),
            url: '/raffle-auction',
            type: 'page',
          },
        ],
      },
      {
        title: intl('navigation_program'),
        url: '#',
        type: 'links',
        logo: LogoProgram,
        links: [
          {
            title: intl('navigation_program'),
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_program_overview'),
            url: '/program',
            type: 'page',
          },
          {
            title: intl('navigation_program_apply_to_speak'),
            url: '/applications',
            type: 'page',
          },
        ],
      },
      {
        title: intl('navigation_get_involved'),
        url: '#',
        type: 'links',
        logo: LogoGetInvolved,
        links: [
          {
            title: intl('navigation_community'),
            url: '#',
            type: 'header',
          },
          {
            title: 'DIPs',
            url: '/dips',
            type: 'page',
          },
          {
            title: intl('navigation_participate'),
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_supporter_application'),
            url: 'https://forms.gle/mWpzC6dMQFa5WwvG8',
            type: 'link',
          },
          {
            title: intl('navigation_press'),
            url: 'https://forms.gle/G4FxcQsC2Byy9NEHA',
            type: 'link',
          },
          {
            title: intl('navigation_volunteer'),
            url: 'https://forms.gle/GnH3SyxSNnQCCn8TA',
            type: 'link',
          },
          {
            title: intl('navigation_contribute'),
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_forum'),
            url: 'https://forum.devcon.org/',
            type: 'link',
          },
          {
            title: 'Github',
            url: 'https://github.com/efdevcon/',
            type: 'link',
          },
        ],
      },
      {
        title: 'Bogotá',
        url: '#',
        type: 'links',
        logo: LogoBogota,
        links: [
          {
            title: 'Bogotá',
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_city_guide'),
            url: '/bogota',
            type: 'page',
          },
          {
            title: 'Event',
            url: '#',
            type: 'header',
          },
          {
            title: intl('navigation_devcon_week'),
            url: '/devcon-week',
            type: 'page',
          },
          {
            title: intl('cd_title'),
            url: '/continuous-devcon',
            type: 'page',
          },
        ],
      },
    ],
    footer: {
      bottom: [
        {
          title: intl('navigation_news'),
          url: '/news',
          type: 'page',
        },
      ],
      highlights: [
        {
          title: intl('navigation_faq'),
          url: '/faq',
          type: 'page',
        },
      ],
      left: [
        {
          title: 'DIPs',
          url: '/dips',
          type: 'page',
        },
      ],
      right: [
        {
          title: intl('navigation_about'),
          url: '/about',
          type: 'page',
        },
        {
          title: intl('navigation_tickets'),
          url: '/tickets',
          type: 'page',
        },
        {
          title: intl('navigation_program'),
          url: '/program',
          type: 'page',
        },
        {
          title: 'DIPs',
          url: '/dips',
          type: 'page',
        },
        {
          title: intl('navigation_city_guide'),
          url: '/bogota',
          type: 'page',
        },
        {
          title: 'FAQ',
          url: '/faq',
          type: 'page',
        },
      ],
    },
  }
}

export default useNavigationData
