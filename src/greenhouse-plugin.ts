import { greenhouseOptions, GreenhouseOptions } from './greenhouse-options'
import { createHarvestConsumer } from './harvest-consumer'
import { createBoardConsumer } from './board-consumer'

interface GridsomeActions {
  addCollection(name: string): GridsomeCollection
}

interface GridsomeCollection {
  addReference(field: string, collectionName: string): void
  addNode(node: any): void
  typeName: string
}

export default function(api: any, userOptions: GreenhouseOptions) {
  const options = greenhouseOptions(userOptions)
  const boardConsumer = createBoardConsumer(options)
  const harvestConsumer = createHarvestConsumer(options)

  api.loadSource(async (actions: GridsomeActions) => {
    const gJobs = await loadJobs(actions)
    await loadDepartments(actions)
    const gPublicJobs = await loadPublicJobs(actions)
    await loadPublicJobDetails(actions)

    gPublicJobs.addReference('internalJobId', gJobs.typeName)
  })

  async function loadJobs(
    actions: GridsomeActions
  ): Promise<GridsomeCollection> {
    const gJobs = actions.addCollection('Job')
    const jobs = await harvestConsumer.listJobs()
    jobs.forEach(gJobs.addNode)
    return gJobs
  }

  async function loadDepartments(
    actions: GridsomeActions
  ): Promise<GridsomeCollection> {
    const gDepartments = actions.addCollection('Department')
    const { departments } = await boardConsumer.listDepartments()
    departments.forEach(gDepartments.addNode)
    return gDepartments
  }

  async function loadPublicJobs(
    actions: GridsomeActions
  ): Promise<GridsomeCollection> {
    const gPublicJobs = actions.addCollection('PublicJob')
    const { jobs } = await boardConsumer.listJobs()
    jobs.forEach(gPublicJobs.addNode)
    return gPublicJobs
  }

  async function loadPublicJobDetails(
    actions: GridsomeActions
  ): Promise<GridsomeCollection> {
    const gPublicJobDetails = actions.addCollection('PublicJobDetail')
    const { jobs } = await boardConsumer.listJobs()
    const publicJobIds = jobs.map((j) => j.id)
    const publicJobDetails = await Promise.all(
      publicJobIds.map(async (id) => await boardConsumer.retrieveJob(id))
    )
    publicJobDetails.forEach(gPublicJobDetails.addNode)
    return gPublicJobDetails
  }
}
