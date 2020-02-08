import axios from 'axios'
import { Departments, JobDetail, Jobs } from './greenhouse-data-types'
import { GreenhouseOptions } from './greenhouse-options'
import { camelize } from '@ridi/object-case-converter'

export interface GreenhouseConsumer {
  listJobs(): Promise<Jobs>
  retrieveJob(jobId: number): Promise<JobDetail>
  listDepartments(): Promise<Departments>
}

export function greenhouseConsumer(
  opts: GreenhouseOptions
): GreenhouseConsumer {
  const client = axios.create({
    baseURL: `${opts.baseUrl}/${opts.boardToken}`,
    timeout: opts.timeout
  })

  function listJobs(): Promise<Jobs> {
    return client
      .get('/jobs')
      .then(response => camelize(response.data) as Jobs)
  }

  function retrieveJob(jobId: number): Promise<JobDetail> {
    return client
      .get(`/jobs/${jobId}`)
      .then(response => camelize(response.data) as JobDetail)
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
