import { greenhouseConsumer } from './greenhouse-consumer'
import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'

interface GridsomeActions {
  addCollection(name: string): any
  addCollection(def: GridsomeCollectionDef): any
}

interface GridsomeCollectionDef {
  typeName: string
}

export default function (api: any, userOptions: GreenhouseOptions) {
  const options = greenhouseOptions(userOptions)
  const consumer = greenhouseConsumer(options)

  api.loadSource(async (actions: GridsomeActions) => {
    await loadJobs(actions);
    await loadDepartments(actions);
  })

  async function loadJobs(actions: GridsomeActions) {
    const greenhouseJobs = actions.addCollection('Job')
    const greenhouseJobDetails = actions.addCollection('JobDetail')

    const { jobs } = await consumer.listJobs()

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i]
      greenhouseJobs.addNode(job)

      const jobDetail = await consumer.retrieveJob(job.id)
      greenhouseJobDetails.addNode(jobDetail)
    }
  }

  async function loadDepartments(actions: GridsomeActions) {
    const greenhouseDepartments = actions.addCollection('Department')

    const { departments } = await consumer.listDepartments()

    for (let i = 0; i < departments.length; i++) {
      const department = departments[i]
      greenhouseDepartments.addNode(department)
      // Maybe create references at some point. Currently, we don't need this
      // functionality
    }
  }


}
