export interface DIP {
  number: number
  title: string
  status:
    | string
    | "Draft"
    | "Accepted"
    | "Postponed"
    | "Rejected"
    | "Changes Requested"
    | "Active"
  theme:
    | string
    | "Ticketing"
    | "Social"
    | "Environmental Sustainability"
    | "Virtual Experience"
    | "Purchases & ID"
    | "Community Involvement"
    | "Art & Beauty"
    | "Freeform"
    | "Meta"
  tags:
    | string
    | "Event Operations"
    | "Event Production"
    | "Software"
    | "Communications"
    | "Sponsorships"
    | "Other"
  authors: Array<string>
  resources: string
  discussion: string
  created: Date
  body: string
}
