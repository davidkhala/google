import {Client} from '../routing.js'
import {protos} from '@googlemaps/routing'
import * as assert from "node:assert";

const {google: {maps: {routing: {v2: {RouteTravelMode}}}}} = protos

const projectId = 'gcp-data-davidkhala'
const apiKey = process.env.API_KEY
const client = new Client(projectId, apiKey)
describe('Malaysia', function () {
    this.timeout(0)

    it('Sarawak', async () => {
        // src
        const Sibu = {
            latitude: 2.291889,
            longitude: 111.8265869,
        }
        // dest
        const Miri = {
            latitude: 4.4237269, longitude: 114.0176622
        }
        assert.equal((await client.route(Sibu, Miri, RouteTravelMode.DRIVE))[0].durationHours, '5.0')

        const Kuching = {
            latitude: 1.5536344, longitude: 110.3602532
        }
        assert.equal((await client.route(Sibu, Kuching, RouteTravelMode.DRIVE))[0].durationHours, '5.0')
    })
    it('Sabah', async () => {
        // src
        const Sandakan = {
            latitude: 5.8575922,
            longitude: 118.0740014
        }
        // dest
        const KotaKinabalu = {
            latitude: 5.9863575,
            longitude: 116.0782821
        }
        assert.equal((await client.route(Sandakan, KotaKinabalu, RouteTravelMode.DRIVE))[0].durationHours, '6.1')
        const Tawau = {
            latitude: 4.2448624,
            longitude: 117.8919058
        }

        assert.equal((await client.route(Sandakan, Tawau, RouteTravelMode.DRIVE))[0].durationHours, '4.9')
    })
})
describe('Indonesia', function (){
    this.timeout(0)
    it('Jawa Tengah', async () => {
        const Semarang = {
            latitude: -6.988178, longitude: 110.422701,
        }
        const Surakarta = {
            latitude: -7.5715897, longitude: 110.8253642,
        }
        const [route] = await client.route(Semarang, Surakarta)
        assert.equal(route.durationHours, '2.6')
    })
})