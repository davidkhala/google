import {v1} from '@googlemaps/places'

const {PlacesClient} = v1

export class Client {
    constructor(projectId, apiKey) {
        this.client = new PlacesClient({
            apiKey,
            projectId
        })
    }

    async search(textQuery) {
        const [response] = await this.client.searchText({
            textQuery
        }, {
            otherArgs: {
                headers: {
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location',
                },
            },
        });


        return response.places
    }
}