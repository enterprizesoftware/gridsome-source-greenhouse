import { greenhouseOptions } from '../greenhouse-options';
import { createHarvestConsumer } from '../harvest-consumer';

describe('harvest-consumer', () => {

  const options = greenhouseOptions({
    boardToken: process.env.BOARD_TOKEN,
    harvestApiToken: process.env.HARVEST_TOKEN
  })

  const consumer = createHarvestConsumer(options);

  test('listJobs', async (done) => {
    const jobs = await consumer.listJobs()
    expect(jobs).toBeDefined()
    expect(jobs.length).toBeGreaterThan(0)
    done()
  })

  test('retrieveJob', async (done) => {
    const jobs = await consumer.listJobs()
    const jobId = jobs[0].id
    const job = await consumer.retrieveJob(jobId)
    expect(jobs).toBeDefined()
    expect(job).toBeDefined()
    expect(job.name).toBeDefined()
    expect(job.departments.length).toBeGreaterThan(0)
    done()
  })

})
