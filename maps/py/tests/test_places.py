import os
import unittest
from davidkhala.google.maps.place import Places
project_id = 'gcp-data-davidkhala'

class PlacesTestCase(unittest.TestCase):
    def setUp(self):
        self.api_key = os.environ.get('API_KEY')
        self.places = Places(project_id, self.api_key)
    def test_hsbc(self):
        r = self.places.search("HSBC Subang Jaya")
        print(r)
        self.assertEqual(1, len(r))
    def test_get(self):
        id = 'ChIJndAUgeB6ATQRqoKOG7NTgMo'
        p = self.places.of(id)
        print(p)


if __name__ == '__main__':
    unittest.main()
