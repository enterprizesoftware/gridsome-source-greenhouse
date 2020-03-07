import { isNil } from 'lodash'
import { isBlank, mixinDeep } from './utils'

export interface GreenhouseOptions {
  boardsApiUrl: string
  boardToken: string

  harvestApiUrl: string
  harvestApiToken: string

  timeout: number
}

export function defaultOptions(): Partial<GreenhouseOptions> {
  return {
    timeout: 3000,
    boardsApiUrl: 'https://boards-api.greenhouse.io/v1/boards',
    harvestApiUrl: 'https://harvest.greenhouse.io/v1'
  }
}

export function greenhouseOptions(userOptions: Partial<GreenhouseOptions>): GreenhouseOptions {
  return validate(mixinDeep({}, defaultOptions(), userOptions))
}

export function validate(options: GreenhouseOptions): GreenhouseOptions {
  if (isNil(options))
    throw new Error('Cannot utilize Greenhouse source without any options')

  if (isBlank(options.boardToken))
    throw new Error('Must specify working board token')

  if (isBlank(options.harvestApiToken))
    throw new Error('Must specify working harvest API token')

  return options
}
