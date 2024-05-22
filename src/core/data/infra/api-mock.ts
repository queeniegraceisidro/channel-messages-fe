import MockAdapter from 'axios-mock-adapter'
import { CHANNEL_JOIN_URL, CHANNEL_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL, USER_CHANNEL_URL } from '../gateways/api/constants'
import { IChannelModel } from '../gateways/api/api.types'
import { IFormLogin, IFormSignUp } from '../../domain/entities/formModels/signup-form.entity'

export const mockAPIResponses = (
  axiosInstance: any, testError: boolean = false, baseDataRes: any = {}, pk: number | null = null
): void => {
  const mock = new MockAdapter(axiosInstance)
  if (testError) {
    // Channel
    mock.onPost(CHANNEL_URL).reply(400, getChannelErrorResponse(baseDataRes))
    // Join Channel
    mock.onPost(CHANNEL_JOIN_URL).reply(400, getChannelJoinErrorResponse(baseDataRes))
    // User Registration
    mock.onPost(REGISTER_URL).reply(400, getUserRegistrationErrorResponse(baseDataRes))
    // Login
    mock.onPost(LOGIN_URL).reply(400, getUserLoginErrorResponse(baseDataRes))
    // Retrieve User Channels
    mock.onGet(USER_CHANNEL_URL).reply(400, getUserChannelsErrorResponse())
    // Retrieve Channel Messages
    mock.onGet(`${CHANNEL_URL}${pk}/messages/`).reply(400, getRetrieveChannelMessagesErrorResponse())
  } else {
    // Channel
    mock.onPost(CHANNEL_URL).reply(201, formatChannelCreateIntoResponse(baseDataRes))
    // Join Channel
    mock.onPost(CHANNEL_JOIN_URL).reply(200, formatChannelJoinIntoResponse(baseDataRes))
    // Retrieve User Channels
    mock.onGet(USER_CHANNEL_URL).reply(200, formatUserChannelsIntoResponse())
    // User Registration
    mock.onPost(REGISTER_URL).reply(201, formatUserCreateIntoResponse(baseDataRes))
    // Login
    mock.onPost(LOGIN_URL).reply(200, formatUserLoginIntoResponse(baseDataRes))
    // Logout
    mock.onPost(LOGOUT_URL).reply(200, formatUserLogoutIntoResponse())
    // Retrieve Channel Messages
    mock.onGet(`${CHANNEL_URL}${pk}/messages/`).reply(200, formatRetrieveChannelMessagesIntoResponse(pk))
  }
}

/** Logout */
const formatUserLogoutIntoResponse = () => {
  return {
    "detail": "Successfully logged out."
  }
}

/** Login */
const getUserLoginErrorResponse = (data: string) => {
  return {
    "non_form_errors": [data]
  }
}

const formatUserLoginIntoResponse = (data: IFormLogin) => {
  return {
    "access": "xxx",
    "refresh": "yyy",
    "user": {
      "pk": 5,
      "first_name": "John",
      "last_name": "Doe",
      "username": data.username,
    },
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
    "invite_code": "12345678",
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

/** User Channels */
const getUserChannelsErrorResponse = () => {
  return {
    "message": "No results found"
  }
}

const formatUserChannelsIntoResponse = () => {
  return {
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 1,
        "channel": {
          "id": 5,
          "name": "test channel again",
          "created_at": "2024-03-20 08:56 AM",
          "updated_at": "2024-03-20 08:56 AM",
          "deleted_at": null
        }
      },
      {
        "id": 2,
        "channel": {
          "id": 7,
          "name": "test",
          "created_at": "2024-03-20 09:14 AM",
          "updated_at": "2024-03-20 09:14 AM",
          "deleted_at": null
        }
      },
      {
        "id": 3,
        "channel": {
          "id": 8,
          "name": "create created channel",
          "created_at": "2024-03-20 09:15 AM",
          "updated_at": "2024-03-20 09:15 AM",
          "deleted_at": null
        }
      }
    ]
  }
}

/** Join Channel */
const getChannelJoinErrorResponse = (data: string) => {
  return {
    "invite_code": [
      data
    ]
  }
}

const formatChannelJoinIntoResponse = (data: { name: string, code: string }) => {
  return {
    "id": 2,
    "name": data.name,
    "invite_code": data.code,
    "created_at": "2024-01-24",
    "updated_at": null,
    "delted_at": null
  }
}

/** Retrieve Channel Messages */
const getRetrieveChannelMessagesErrorResponse = () => {
  return {
    "detail": "Authentication credentials were not provided."
  }
}

const formatRetrieveChannelMessagesIntoResponse = (pk: number | null) => {
  if (pk == 6) {
    return {
      "count": 8,
      "next": "http://127.0.0.1:8000/api/messenger/channel/6/messages/?page=2",
      "previous": null,
      "results": [
        {
          "id": 8,
          "channel": 6,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "bbb",
          "created_at": "2024-04-13 11:22 PM"
        },
        {
          "id": 7,
          "channel": 6,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "aaaaa",
          "created_at": "2024-04-13 11:20 PM"
        },
        {
          "id": 6,
          "channel": 6,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "Hi everyone! Thanks for inviting me to this sample channel.",
          "created_at": "2024-04-13 11:20 PM"
        }
      ]
    }
  } else if (pk == 7) {
    return {
      "count": 4,
      "next": null,
      "previous": null,
      "results": [
        {
          "id": 4,
          "channel": 7,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "bbb",
          "created_at": "2024-04-13 11:22 PM"
        },
        {
          "id": 3,
          "channel": 7,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "aaaaa",
          "created_at": "2024-04-13 11:20 PM"
        },
        {
          "id": 2,
          "channel": 7,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "Hi everyone! Thanks for inviting me to this sample channel.",
          "created_at": "2024-04-13 11:20 PM"
        },
        {
          "id": 1,
          "channel": 7,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "Hi everyone! Thanks for inviting me to this sample channel.",
          "created_at": "2024-04-13 11:20 PM"
        }
      ]
    }
  }
}
