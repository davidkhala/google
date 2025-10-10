import os
import unittest
from davidkhala.google.maps.place import Places


class PlacesTestCase(unittest.TestCase):
    def test_hsbc(self):
        api_key = os.environ.get('API_KEY')

        project_id = 'gcp-data-davidkhala'
        places = Places(project_id, api_key)
        r = places.search("HSBC Subang Jaya")
        print(r)
        self.assertEqual(1, len(r))


if __name__ == '__main__':
    unittest.main()
