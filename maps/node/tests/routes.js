import {Client} from '../routing.js'
import * as assert from "node:assert";


const projectId = 'gcp-data-davidkhala'
const apiKey = process.env.API_KEY
const client = new Client(projectId, apiKey)
describe('Philippines', function () {
    this.timeout(0)
    it('Manila', async ()=>{
        const MuntinlupaCity = {
            latitude: 14.4248718, 	longitude: 121.0274923
        }
        const Makati = {
            latitude: 14.5535847, 	longitude: 121.0261037
        }
        assert.equal((await client.route(MuntinlupaCity, Makati))[0].durationHours, '1.3')
    })
})