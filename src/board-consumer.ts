import axios from 'axios'
import { Departments, BoardJobDetail, PublicJobs } from './greenhouse-data-types'
import { GreenhouseOptions } from './greenhouse-options'
import { camelize } from '@ridi/object-case-converter'

export interface BoardConsumer {
  listJobs(): Promise<PublicJobs>
  retrieveJob(jobId: number): Promise<BoardJobDetail>
  listDepartments(): Promise<Departments>
}

export function createBoardConsumer(
  opts: GreenhouseOptions
): BoardConsumer {
  const client = axios.create({
    baseURL: `${opts.boardsApiUrl}/${opts.boardToken}`,
    timeout: opts.timeout
  })

  function listJobs(): Promise<PublicJobs> {
    return client
      .get('/jobs')
      .then(response => camelize(response.data) as PublicJobs)
  }

  function retrieveJob(jobId: number): Promise<BoardJobDetail> {
    return client
      .get(`/jobs/${jobId}`)
      .then(response => camelize(response.data) as BoardJobDetail)
  }

  function listDepartments(): Promise<Departments> {
    return client
      .get('/departments')
      .then(response => camelize(response.data) as Departments)
  }

  return {
    listJobs,
    retrieveJob,
    listDepartments
  }
}
