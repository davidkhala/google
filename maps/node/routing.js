import {v2} from '@googlemaps/routing'

const {RoutesClient} = v2


const placeConvert = (place) => {
    if (typeof place === 'string') {
        return {address: place}
    } else if (typeof place === 'object') {
        const {latitude, longitude, id} = place
        if (id) {
            return {placeId: id}
        } else {
            return {location: {latLng: {latitude, longitude}}}
        }

    }

}


export class Client {
    constructor(projectId, apiKey) {
        this.client = new RoutesClient({
            apiKey, projectId
        })
    }

    /**
     *
     * @param {string|Place} from
     * @param {string|Place} to
     * @param {boolean} [all]
     */
    async route(from, to, all) {

        const [response] = await this.client.computeRoutes({
                origin: placeConvert(from),
                destination: placeConvert(to)
            },
            {
                otherArgs: {
                    headers: {
                        'X-Goog-FieldMask': all ? '*' : 'routes.distanceMeters,routes.duration,routes.legs',
                    },
                },
            })
        const {routes} = response
        if (all) {
            return routes
        } else {
            return routes.map(({distanceMeters, duration, legs}) => ({
                distanceMeters, durationSeconds:duration.seconds, legs
            }))
        }
    }
}

/**
 * @typedef Place
 * @property id
 * @property latitude
 * @property longitude
 */