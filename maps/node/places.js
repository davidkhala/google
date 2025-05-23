import {v1} from '@googlemaps/places'

const {PlacesClient} = v1

export class Client {
    constructor(projectId, apiKey) {
        this.client = new PlacesClient({
            apiKey,
            projectId
        })
    }

    async search(textQuery, all) {
        const [response] = await this.client.searchText({
            textQuery
        }, {
            otherArgs: {
                headers: {
                    'X-Goog-FieldMask': all ? '*' : 'places.displayName,places.formattedAddress,places.location,places.id',
                },
            },
        });
        const {places} = response
        if (all) {
            return places
        } else {
            return response.places.map(({formattedAddress, location, displayName, id}) => ({
                formattedAddress, location, displayName, id
            }))
        }

    }
}