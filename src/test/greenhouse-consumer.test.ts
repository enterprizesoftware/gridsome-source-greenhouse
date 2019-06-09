import { greenhouseConsumer } from '../greenhouse-consumer';
import { greenhouseOptions } from '../greenhouse-options';

describe('greenhouse-consumer', () => {

  const options = greenhouseOptions({
    boardToken: 'companyname'
  })

  const consumer = greenhouseConsumer(options);

  test('listJobs', async (done) => {
    const jobs = await consumer.listJobs()
    expect(jobs.jobs).toBeDefined()
    expect(jobs.jobs.length).toBeGreaterThan(0)
    done()
  })

  test('retrieveJob', async (done) => {
    const jobs = await consumer.listJobs()
    const jobDetailId = jobs.jobs[0].id
    const jobDetail = await consumer.retrieveJob(jobDetailId)
    expect(jobs.jobs).toBeDefined()
    expect(jobDetail.title).toBeDefined()
    expect(jobDetail.departments.length).toBeGreaterThan(0)
    done()
  })

})
