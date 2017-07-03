
import { Bluebird, _ } from 'quizar-domain';

export { Bluebird, _ };

export type RequestContextType = {
    user?: RequestUser
}

export type RequestUser = {
    id: string
}
