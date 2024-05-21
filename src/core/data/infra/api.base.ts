import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { ApiConfig, API_CONFIG } from './api.config'
import { getGeneralApiProblem } from './api.problem'
import { API_WITH_CREDENTIALS } from '../../../config'
import { objectToSnake } from "ts-case-convert";

interface IApi {
  apiSauce: ApisauceInstance
  config: ApiConfig
}

export interface IApiDataResponseModel<TApiResponseModel, TApiErrorResponseModel = null> {
  success: boolean
  code: number
  response?: TApiResponseModel | TApiErrorResponseModel
}

export class Api implements IApi {
  apiSauce: ApisauceInstance
  config: ApiConfig

  constructor() {
    this.config = API_CONFIG
    this.apiSauce = create({
      baseURL: this.config.url,
      headers: {
        Accept: 'application/json'
      },
      withCredentials: API_WITH_CREDENTIALS
    })
  }

  async handleAPIResult<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    return response.data as TApiResponseModel;
  }

  async parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    if (response.ok) {
      return this.handleAPIResult(response);
    }
    const problemKind = getGeneralApiProblem(response)
    if (problemKind?.requestError != null) {
      throw new problemKind.requestError<TApiErrorResponseModel>(problemKind.kind, response.data as TApiErrorResponseModel)
    }
    throw Error("Uncaught exception!")
  }

  async delete<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.delete(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async get<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.get(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async post<TApiResponseModel, TApiErrorResponseModel = null>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const snakeCaseData = objectToSnake(params);
    const result = await this.apiSauce.post(apiPath, snakeCaseData)
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async upload<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const form = new FormData();
    (Object.entries(params) as [string, any][]).forEach(([key, value]) => {
      form.append(key, value);
    });
    const result = await this.apiSauce.post(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async put<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const snakeCaseData = objectToSnake(params);
    const result = await this.apiSauce.put(apiPath, snakeCaseData)
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async patch<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const snakeCaseData = objectToSnake(params);
    const result = await this.apiSauce.patch(apiPath, snakeCaseData)
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

  async uploadPatch<TApiResponseModel, TApiErrorResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const form = new FormData();
    (Object.entries(params) as [string, any][]).forEach(([key, value]) => {
      form.append(key, value);
    });
    const result = await this.apiSauce.post(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel, TApiErrorResponseModel>(result)
  }

}