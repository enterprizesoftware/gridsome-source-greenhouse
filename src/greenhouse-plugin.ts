import { greenhouseConsumer } from './greenhouse-consumer'
import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'

interface GridsomeActions {
  addCollection(name: string): any
  addCollection(def: GridsomeCollectionDef): any
}

interface GridsomeCollectionDef {
  typeName: string
}

export default function(api: any, userOptions: GreenhouseOptions) {
  const options = greenhouseOptions(userOptions)
  const consumer = greenhouseConsumer(options)

  api.loadSource(async (actions: GridsomeActions) => {
    const greenhouseJobs = actions.addCollection('Job')

    const greenhouseJobDetails = actions.addCollection('JobDetail')

    const { jobs } = await consumer.listJobs()

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i]
      greenhouseJobs.addNode(job)

      const jobDetail = await consumer.retrieveJob(job.id)
      greenhouseJobDetails.addNode(jobDetail)
    }
  })
}
