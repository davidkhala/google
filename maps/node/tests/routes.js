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
describe('Indonesia', function () {
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
    it('Kalimantan', async () => {
        const Samarinda = {
            latitude: -0.5014884, longitude: 117.1451361,
        }
        const Balikpapan = {
            latitude: -1.27684, longitude: 116.8377279,
        }
        const [route] = await client.route(Samarinda, Balikpapan, RouteTravelMode.DRIVE)
        assert.equal(route.durationHours, '2.0')
    })
    it('java island', async () => {
        const Malang = {
            latitude: -7.9862201, longitude: 112.6341398,
        }
        // one point among Surabaya
        const Surabaya = {
            latitude: -7.2912248, longitude: 112.716962,
        }
        const [route] = await client.route(Malang, Surabaya)
        assert.equal(route.durationHours, '3.0')
    })
    it('Sumatra Island', async () => {
        const Pekanbaru = {
            latitude: 0.5353713, longitude: 101.4276199,
        }
        // one point among medan
        const Medan = {
            latitude: 3.5977889, longitude: 98.679518
        }
        const [route] = await client.route(Pekanbaru, Medan, RouteTravelMode.DRIVE)
        assert.equal(route.durationHours, '12.2')
    })
    it('Singapore Strait', async () => {
        const Batam = {
            latitude: 1.1393561, longitude: 104.0155464,
        }
        // one point among Singapore
        const Singapore = {
            latitude: 1.2746046, longitude: 103.7990299
        }
        const [route] = await client.route(Singapore, Batam, RouteTravelMode.DRIVE)
        assert.equal(route.durationHours, '5.7')
    })
    it('Sri Lanka', async ()=>{
        const Negombo = {
            latitude: 7.2095698, 	longitude:79.8491076
        }
        // one point among Colombo
        const Colombo= {
            latitude: 6.8962205, 	longitude: 79.8568925
        }
        assert.equal((await client.route(Negombo, Colombo))[0].durationHours, '1.5')

        const Moratuwa = {
            latitude:6.7802707, 	longitude:79.8835025
        }
        assert.equal((await client.route(Moratuwa, Colombo))[0].durationHours, '0.9')
        const Pelawatte = {
            latitude:6.8902203, 	longitude: 79.9289717
        }
        assert.equal((await client.route(Pelawatte, Colombo))[0].durationHours, '0.7')
    })
    it('Philippines', async ()=>{
        // 2 points around Manila
        const MuntinlupaCity = {
            latitude: 14.4248718, 	longitude: 121.0274923
        }
        const Makati = {
            latitude: 14.5535847, 	longitude: 121.0261037
        }
        assert.equal((await client.route(MuntinlupaCity, Makati))[0].durationHours, '1.8')
    })
})