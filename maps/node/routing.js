import {v2} from '@googlemaps/routing'

const {RoutesClient} = v2

export class Client {
    constructor(projectId, apiKey) {
        this.client = new RoutesClient({
            apiKey, projectId
        })

    }
}
