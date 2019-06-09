import { isNil } from 'lodash'
import { isBlank, mixinDeep } from './utils'

export interface GreenhouseOptions {
  baseUrl: string
  boardToken: string
  timeout: number
}

export function defaultOptions(): Partial<GreenhouseOptions> {
  return {
    timeout: 3000,
    baseUrl: 'https://boards-api.greenhouse.io/v1/boards/'
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

  return options
}
