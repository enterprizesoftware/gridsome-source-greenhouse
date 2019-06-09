import { greenhouseConsumer } from './greenhouse-consumer'
import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'

export default function(api: any, userOptions: GreenhouseOptions) {
  const options = greenhouseOptions(userOptions)
  const consumer = greenhouseConsumer(options)

  api.loadSource(async (store: any) => {
    const greenhouseJobs = store.addContentType({
      typeName: 'GreenhouseJobs',
      route: '/job/:id'
    })

    const greenhouseJobDetails = store.addContentType({
      typeName: 'GreenhouseJobDetails',
      route: '/jobDetail/:id'
    })

    const { jobs } = await consumer.listJobs()

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i]
      greenhouseJobs.addNode(job)

      const jobDetail = await consumer.retrieveJob(job.id)
      greenhouseJobDetails.addNode(jobDetail)
    }
  })
}