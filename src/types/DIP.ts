export enum Status {
  'Draft',
  'Accepted',
  'Postponed',
  'Rejected',
  'Changes Requested',
  'Active',
}

export enum Theme {
  'Ticketing',
  'Social',
  'Environmental Sustainability',
  'Virtual Experience',
  'Purchases & ID',
  'Community Involvement',
  'Art & Beauty',
  'Freeform',
  'Meta',
}

export enum Tag {
  'Event Operations',
  'Event Production',
  'Software',
  'Communications',
  'Sponsorships',
  'Other',
}

export interface DIP {
  number: number
  title: string
  status: Status
  github: string
  themes: Array<Theme>
  tags: Array<Tag>
  authors: Array<string>
  resources: string
  discussion: string
  created: Date
  body: string
  slug: string
}
