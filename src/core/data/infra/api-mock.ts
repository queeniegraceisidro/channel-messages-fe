import { CHANNEL_URL } from '../gateways/api/constants'
import { IChannelModel } from '../gateways/api/api.types'

var MockAdapter = require("axios-mock-adapter");

export const mockAPIResponses = (
  axiosInstance: any, testError: boolean = false, baseDataRes: any = {}
): void => {
  const mock = new MockAdapter(axiosInstance)

  if (testError) {
    // Channel
    mock.onPost(CHANNEL_URL).reply(400, getChannelErrorResponse(baseDataRes))
  } else {
    // Channel
    mock.onPost(CHANNEL_URL).reply(201, formatChannelCreateIntoResponse(baseDataRes))
  }
}

const getChannelErrorResponse = (data: string) => {
  return {
    "name": [
      "This field is required."
    ]
  }
}

const formatChannelCreateIntoResponse = (data: IChannelModel) => {
  return {
    "id": 2,
    "name": data,
    "created_at": "2024-01-24",
    "updated_at": null,
    "delted_at": null
  }
}