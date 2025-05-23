import {Client} from '../routing.js'

const projectId = 'gcp-data-davidkhala'
const apiKey = process.env.API_KEY
const client = new Client(projectId, apiKey)
describe('', function () {
    this.timeout(0)
    it('get one', async () => {
        //     "Davao, Abreeza Ayala Business Park",7.0911903999999994,125.61129899999999
        // HSBC Cebu Branch,10.3162503,123.90636509999997
        const [route]= await client.route({
            latitude: 7.0911903999999994,
            longitude: 125.61129899999999
        }, {
            latitude: 10.3162503,
            longitude: 123.90636509999997
        })
        console.debug(route)

    })
})