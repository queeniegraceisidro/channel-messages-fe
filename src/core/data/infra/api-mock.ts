import MockAdapter from 'axios-mock-adapter'
import { CHANNEL_URL, REGISTER_URL } from '../gateways/api/constants'
import { IChannelModel } from '../gateways/api/api.types'
import { IFormSignUp } from '../../domain/entities/formModels/signup-form.entity'

export const mockAPIResponses = (
   axiosInstance: any, testError: boolean = false, baseDataRes: any = {}
): void => {
   const mock = new MockAdapter(axiosInstance)
   if (testError) {
      // Channel
      mock.onPost(CHANNEL_URL).reply(400, getChannelErrorResponse(baseDataRes))
      // User Registration
      mock.onPost(REGISTER_URL).reply(400, getUserRegistrationErrorResponse(baseDataRes))
   } else {
      // Channel
      mock.onPost(CHANNEL_URL).reply(201, formatChannelCreateIntoResponse(baseDataRes))
      // User Registration
      mock.onPost(REGISTER_URL).reply(201, formatUserCreateIntoResponse(baseDataRes))
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

/** User Registration */
const getUserRegistrationErrorResponse = (data: string) => {
   return {
      "username": [
         "This username is taken."
      ]
   }
}

const formatUserCreateIntoResponse = (data: IFormSignUp) => {
   return {
      "access": "xxx",
      "refresh": "yyy",
      "user": {
         "pk": 5,
         "first_name": data.firstName,
         "last_name": data.lastName,
         "username": data.username,
      },
   }
}