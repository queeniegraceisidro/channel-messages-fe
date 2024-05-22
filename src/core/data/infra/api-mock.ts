import MockAdapter from 'axios-mock-adapter'
import { CHANNEL_JOIN_URL, CHANNEL_URL, LOGIN_URL, LOGOUT_URL, MESSAGE_CREATE_URL, REGISTER_URL, USER_CHANNEL_URL } from '../gateways/api/constants'
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
    // Create Channel Messages
    mock.onPost(MESSAGE_CREATE_URL).reply(400, getCreateChannelMessagesErrorResponse())

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
    // Create Channel Messages
    mock.onPost(MESSAGE_CREATE_URL).reply(201, formatCreateChannelMessagesIntoResponse(baseDataRes))
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
  if (pk == 1) {
    return {
      "next": "http://127.0.0.1:8000/api/messenger/channel/1/messages/?cursor=cD0yMDI0LTA1LTA0KzA4JTNBMDMlM0EzNy4wNjk4NzUlMkIwMCUzQTAw",
      "previous": null,
      "results": [
        {
          "id": 95,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a60",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 94,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a59",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 93,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a58",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 92,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a57",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 91,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a56",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 90,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a55",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 89,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a54",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 88,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a53",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 87,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a52",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 86,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a51",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 85,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a50",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 84,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a49",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 83,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a48",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 82,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a47",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 81,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a46",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 80,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a45",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 79,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a44",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 78,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a43",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 77,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a42",
          "created_at": "2024-05-04 05:03 PM"
        },
        {
          "id": 76,
          "channel": 1,
          "sender": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe"
          },
          "message": "a41",
          "created_at": "2024-05-04 05:03 PM"
        }
      ]
    }
  }
}

/** Create Channel Messages */
const getCreateChannelMessagesErrorResponse = () => {
  return {
    "detail": "Authentication credentials were not provided."
  }
}

const formatCreateChannelMessagesIntoResponse = (data: { message: string, channel: number }) => {
  return {
    "id": 1,
    "channel": 1,
    "sender": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe"
    },
    "message": data.message,
    "created_at": "2024-05-04 03:52 PM"
  }
}