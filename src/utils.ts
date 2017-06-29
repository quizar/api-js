
import { Bluebird } from 'quizar-domain';

export { Bluebird };

export type RequestContextType = {
    user?: RequestUser
}

export type RequestUser = {
    id: string
}
