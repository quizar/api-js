
export const Promise = require('bluebird');

export type RequestContextType = {
    user?: RequestUser
}

export type RequestUser = {
    id: string
}
