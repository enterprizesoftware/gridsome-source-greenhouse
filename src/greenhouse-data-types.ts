export interface PublicJobs {
  jobs: PublicJob[]
  meta: {
    total: number
  }
}

export interface PublicJob {
  absoluteUrl: string
  internalJobId: number
  location: Location
  metadata: any[]
  id: number
  updatedAt: Date
  requisitionId: string
  title: string
}

export interface Location {
  name: string
}

export interface BoardJobDetail extends PublicJob {
  content: string
  departments: Department[]
  offices: Office[]
}

export interface Departments {
  departments: Department[]
}

export interface Department {
  id: number
  name: string
  childIds: number[]
  parentId: number
  jobs: PublicJob[]
}

export interface Office {
  id: number
  name: string
  location: Location
  childIds: number[]
  parentId: number
  primaryContactUserId: number
  externalId: string
}

export type Jobs = Job[]

export interface Job {
  id: number
  name: string
  requisitionId: string
  notes: string
  confidential: boolean
  status: string
  createdAt: Date
  openedAt: Date
  closedAt: Date
  updatedAt: Date
  departments: Department[]
  offices: Office[]
  customFields: CustomFields
  keyedCustomFields: KeyedCustomFields
  hiringTeam: HiringTeam
  openings: Opening[]
}

export interface Offices {
  offices: Office[]
}

export interface CustomFields {
  employmentType: string
  maximumBudget: string
  salaryRange: Range
  [prop: string]: string | Range
}

export interface Field {
  name: string
}

export interface Range {
  minValue: number
  maxValue: number
  unit: string
}

export interface KeyedCustomFields {
  [prop:string]: CurrencyRangeField | SingleSelect | ShortText
}

export interface CurrencyRangeField extends Range, Field {
  type: 'currency_range'
}

export interface TextField extends Field {
  value: string
}

export interface SingleSelect extends TextField {
  type: 'single_select'
}

export interface ShortText extends TextField {
  type:'short_text'
}

export interface HiringTeam {
  hiringManagers: StaffMember[]
  recruiters: ResponsibleStaffMember[]
  coordinators: ResponsibleStaffMember[]
  sources: StaffMember[]
}

export interface StaffMember {
  id: number
  firstName: string
  lastName: string
  name: string
  employeeId: string
}

export interface ResponsibleStaffMember extends StaffMember {
  responsible: boolean
}

export interface Opening {
  id: number
  openingId: string
  status: string
  openedAt: Date
  closedAt: Date
  applicationId: number
  closeReason: CloseReason
}

export interface CloseReason {
  id: number
  name: string
}
