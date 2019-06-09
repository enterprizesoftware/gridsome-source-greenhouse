import { GreenhouseConsumer, greenhouseConsumer } from './greenhouse-consumer'
import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'

export default class GreenhouseSource {
  options: GreenhouseOptions
  consumer: GreenhouseConsumer

  constructor(private api: any, userOptions: Partial<GreenhouseOptions>) {
    console.log('**** ACTIVATED ****')
    this.options = greenhouseOptions(userOptions)
    this.consumer = greenhouseConsumer(this.options)
    this.source()
  }

  source() {
    this.api.loadSource(async (store: any) => {
      const greenhouseJobs = store.addContentType({
        typeName: 'GreenhouseJobs',
        route: '/job/:id'
      })

      const greenhouseJobDetails = store.addContentType({
        typeName: 'GreenhouseJobDetails',
        route: '/jobDetail/:id'
      })

      const { jobs } = await this.consumer.listJobs()
      jobs.forEach(greenhouseJobs.addNode)

      jobs.forEach(async (job) => {
        const jobDetail = await this.consumer.retrieveJob(job.id)
        greenhouseJobDetails.addNode(jobDetail)
      })
    })
  }
}
