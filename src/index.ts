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

    consumer.listJobs().then(({ jobs }) => {
      jobs.forEach((job) => {
        greenhouseJobs.addNode(job)
        consumer.retrieveJob(job.id).then((jobDetail) => {
          greenhouseJobDetails.addNode(jobDetail)
        })
      })
    })
  })
}
