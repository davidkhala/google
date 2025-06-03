import {v2, protos} from '@googlemaps/routing'

const {google: {maps: {routing: {v2: {RouteTravelMode}}}}} = protos
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
     * @param {google.maps.routing.v2.RouteTravelMode} [travelMode]
     * @param {boolean} [all]
     */
    async route(from, to, travelMode = RouteTravelMode.TRANSIT, all) {

        const [response] = await this.client.computeRoutes({
                origin: placeConvert(from),
                destination: placeConvert(to),
                travelMode // SDK Defaults to DRIVE.
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
                distanceMeters, durationHours: (duration.seconds / 3600).toFixed(1), legs
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