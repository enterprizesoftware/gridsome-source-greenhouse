import { createBoardConsumer } from '../board-consumer';
import { greenhouseOptions } from '../greenhouse-options';

describe('board-consumer', () => {

  const options = greenhouseOptions({
    boardToken: process.env.BOARD_TOKEN,
    harvestApiToken: process.env.HARVEST_TOKEN
  })

  const consumer = createBoardConsumer(options);

  test('listJobs', async (done) => {
    const jobs = await consumer.listJobs()
    expect(jobs.jobs).toBeDefined()
    expect(jobs.jobs.length).toBeGreaterThan(0)
    done()
  })

  test('retrieveJob', async (done) => {
    const jobs = await consumer.listJobs()
    const jobDetailId = jobs.jobs[2].id
    const jobDetail = await consumer.retrieveJob(jobDetailId)
    expect(jobs.jobs).toBeDefined()
    expect(jobDetail.title).toBeDefined()
    expect(jobDetail.departments.length).toBeGreaterThan(0)
    done()
  })

  test('listDepartments', async (done) => {
    const departments = await consumer.listDepartments()
    expect(departments.departments).toBeDefined()
    expect(departments.departments.length).toBeGreaterThan(0)
    done()
  })

})
