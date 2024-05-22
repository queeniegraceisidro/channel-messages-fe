import { ApiResponse } from 'apisauce'
import { BaseRequestError, BadRequest } from './api.error'

export interface IGeneralApiProblem {
  kind: string,
  temporary: boolean,
  requestError: typeof BaseRequestError | null
}

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem (response: ApiResponse<any>): IGeneralApiProblem | null {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return { kind: 'cannot-connect', temporary: true, requestError: null}
    case 'NETWORK_ERROR':
      return { kind: 'cannot-connect', temporary: true, requestError: null}
    case 'TIMEOUT_ERROR':
      return { kind: 'timeout', temporary: true, requestError: null}
    case 'SERVER_ERROR':
      return { kind: 'server', temporary: false, requestError: null}
    case 'UNKNOWN_ERROR':
      return { kind: 'unknown', temporary: true, requestError: null}
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 400:
          return { kind: 'bad-request', temporary: true, requestError: BadRequest}
        case 401:
          return { kind: 'unauthorized', temporary: true, requestError: null}
        case 403:
          return { kind: 'forbidden', temporary: false, requestError: null}
        case 404:
          return { kind: 'not-found', temporary: false, requestError: null}
        default:
          return { kind: 'rejected', temporary: false, requestError: null}
      }
    case 'CANCEL_ERROR':
      return null
  }

  return null
}