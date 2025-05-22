import {Client} from '../places.js'
describe('', function () {
    this.timeout(0)
    it('', async () => {
        const projectId = 'gcp-data-davidkhala'
        const apiKey = process.env.API_KEY
        const client = new Client(projectId, apiKey)
        const r= await client.search("HSBC")
        console.debug(r)
    })
})