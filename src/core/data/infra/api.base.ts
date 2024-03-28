import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { ApiConfig, API_CONFIG } from './api.config'
import { getGeneralApiProblem } from './api.problem'
import { IErrorResponseModel } from '../gateways/api/api.types'

interface IApi {
  apiSauce: ApisauceInstance
  config: ApiConfig
}

interface IApiDataResponseModel<TApiResponseModel> {
  success: boolean
  code: number
  error: string | null
  response?: TApiResponseModel | IErrorResponseModel
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
      }
    })
  }

  async handleAPIFailure<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    const problemKind = getGeneralApiProblem(response);
    const errRes = {
      detail: problemKind?.kind,
      error: response.status ?? '400'
    } as IErrorResponseModel;

    const convertedError: TApiResponseModel = {
      success: false,
      code: response.status,
      error: problemKind?.kind ?? 'Unknown error',
      response: errRes
    } as TApiResponseModel;
    return convertedError;
  }

  async handleAPIResult<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    const data = response.data as IApiDataResponseModel<TApiResponseModel>
    if (response.status && [200, 201, 202, 203, 204].includes(response.status)) {
      return data as TApiResponseModel
    } else {
      const errorResponseObject = JSON.parse(JSON.stringify(data));
      throw errorResponseObject
    }
  }

  async parseAPIResultIntoModel<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    if (response.ok) {
      return await this.handleAPIResult<TApiResponseModel>(response)
    } else {
      return await this.handleAPIFailure(response) as TApiResponseModel;
    }
  }

  async delete<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.delete(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async get<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.get(apiPath, params)
    return await this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async post<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.post(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async upload<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const form = new FormData();
    (Object.entries(params) as [string, any][]).forEach(([key, value]) => {
      form.append(key, value);
    });
    const result = await this.apiSauce.post(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async put<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.put(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async patch<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.patch(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async uploadPatch<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const form = new FormData();
    (Object.entries(params) as [string, any][]).forEach(([key, value]) => {
      form.append(key, value);
    });
    const result = await this.apiSauce.patch(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

}