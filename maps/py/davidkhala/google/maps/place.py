from typing import Iterable

from google.api_core.client_options import ClientOptions
from google.maps import places_v1
from google.maps.places_v1 import Place, PlacesClient, SearchTextRequest, GetPlaceRequest


class Places:
    def __init__(self, project_id, api_key):
        self.client = PlacesClient(client_options=ClientOptions(
            api_key=api_key,
            quota_project_id=project_id
        ))
        self.all_fields = False

    def search(self, text_query) -> Iterable[Place]:
        request = SearchTextRequest(text_query=text_query)

        response = self.client.search_text(
            request,
            metadata=[("x-goog-fieldmask",
                       "*" if self.all_fields else "places.formattedAddress,places.displayName,places.location,places.id")]
        )

        return response.places

    def of(self, place_id: str) -> Place:
        request = GetPlaceRequest({
            'name': PlacesClient.place_path(place_id),
        })

        return self.client.get_place(request, metadata=[("x-goog-fieldmask",
                                                         "*" if self.all_fields else "international_phone_number,formatted_address,location,google_maps_uri,website_uri,display_name.text")])
