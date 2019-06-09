import { JobDetail } from './data-types'
import { greenhouseConsumer } from './greenhouse-consumer'
import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'

export default function(api: any, userOptions: GreenhouseOptions) {
  const options = greenhouseOptions(userOptions)
  const consumer = greenhouseConsumer(options)

  api.loadSource((store: any) => {
    const greenhouseJobs = store.addContentType({
      typeName: 'GreenhouseJobs',
      route: '/job/:id'
    })

    const greenhouseJobDetails = store.addContentType({
      typeName: 'GreenhouseJobDetails',
      route: '/jobDetail/:id'
    })

    consumer
      .listJobs()
      .then(({ jobs }) => {
        return Promise.all(
          jobs.map((job) => {
            greenhouseJobs.addNode(job)
            return consumer.retrieveJob(job.id)
          })
        )
      })
      .then((jobDetails: JobDetail[]) => {
        jobDetails.forEach((jobDetail) =>
          greenhouseJobDetails.addNode(jobDetail)
        )
      })
  })
}
