/**
 * CHANNEL URLS
 */
export const CHANNEL_URL = `/messenger/channel/`
export const CHANNEL_JOIN_URL = `/messenger/channel/join/`

/**
 * MESSAGES URLS
 */
export const MESSAGE_CREATE_URL = `/messenger/messages/`
export const MESSAGE_DETAIL_URL = (id: number) => `${CHANNEL_URL}${id}/messages/`

/**
 * USER CHANNEL URLS
 */
export const USER_CHANNEL_URL = `/messenger/user/`

/**
 * AUTH URLS
 */
export const LOGIN_URL = `/users/auth/login/`
export const LOGOUT_URL = `/users/auth/logout/`
export const REGISTER_URL = `/users/auth/register`

/**
 * WEBSOCKET URLS
 */
export const WEBSOCKET_CHANNEL_URL = `/channel/`
