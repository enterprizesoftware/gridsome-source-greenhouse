import axios from 'axios'
import { camelize } from '@ridi/object-case-converter'
import { Job, Jobs } from './greenhouse-data-types'
import { GreenhouseOptions } from './greenhouse-options'

export interface HarvestConsumer {
  listJobs(): Promise<Jobs>
  retrieveJob(jobId: number): Promise<Job>
}

export function createHarvestConsumer(
  opts: GreenhouseOptions
): HarvestConsumer {

  const client = axios.create({
    baseURL: `${opts.harvestApiUrl}`,
    auth: {
      username: opts.harvestApiToken,
      password: ''
    },
    timeout: opts.timeout
  })

  function listJobs(): Promise<Jobs> {
    return client
      .get('/jobs')
      .then(response => camelize(response.data) as Jobs)
  }

  function retrieveJob(jobId: number): Promise<Job> {
    return client
      .get(`/jobs/${jobId}`)
      .then(response => camelize(response.data) as Job)
  }

  return {
    listJobs,
    retrieveJob
  }
}
