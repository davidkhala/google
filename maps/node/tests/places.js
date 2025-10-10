import {Client} from '../places.js'
import * as assert from "node:assert";

const projectId = 'gcp-data-davidkhala'
const apiKey = process.env.API_KEY
const client = new Client(projectId, apiKey)
describe('try one', function () {
    this.timeout(0)
    it('Subang Jaya', async () => {
        const data = await client.search("HSBC Subang Jaya")
        assert.equal(data.length, 1)
        console.debug(data)
        //       location: { latitude: 3.0484288999999998, longitude: 101.58590410000001 },
    })
    it('Selangor, Jln Ss', async ()=>{
        const data = await client.search('Lot 55, 57 & 59, Jalan SS21/37, Damansara Utama, Damansara Utama, Selangor Darul Ehsan, 47400, Petaling Jaya')
        assert.ok(data.length>1)
        console.debug(data)

    })
})


