export interface Jobs {
  jobs: Job[]
  meta: {
    total: number
  }
}

export interface Job {
  absoluteUrl: string
  internalJobId: number
  location: Location
  metadata: any
  id: number
  updatedAt: string
  requisitionId: string
  title: string
}

export interface Location {
  name: string
}

export interface JobDetail extends Job {
  content: string
  departments: Department[]
  offices: Office[]
}

export interface Department {
  id: number
  name: string
  childIds: number[]
  parentId: number
}

export interface Office {
  id: number
  name: string
  location: string
  childIds: number[]
  parentId: number
}
