import {Client} from '../places.js'
import {FromFile, ToFile} from '@davidkhala/csv/index.js'
import * as fs from "node:fs";
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
    it('Bandar Baru Klang', async ()=>{
        let data = await client.search("HSBC Bandar Baru Klang")
        console.debug(data)
        data = await client.search('HSBC Taman Molek')
        console.debug(data)
    })
})

function load_csv(name) {
    const {data} = FromFile(`tests/fixture/${name}.csv`)
    return [data.map(d => d['Work Location Name'] + ', HSBC'), data]
}


describe('batch', function () {
    this.timeout(0)
    const task = async (name) => {
        const [searchTexts, raw] = load_csv(name)
        for (let i = 0; i < raw.length; i++) {
            const item = searchTexts[i]
            const list = await client.search(item)
            const locations = list.map(i => i.location)

            if (locations.length > 1) {
                console.debug(item, locations)
            } else if(locations.length === 1) {
                const {latitude, longitude} = locations[0]
                raw[i]['latitude'] = latitude
                raw[i]['longitude'] = longitude
            }else {
                console.warn(item, locations)
            }

        }
        fs.writeFileSync(`${name}2.csv`, ToFile(raw))
    }
    it('AUS', async () => {
        await task('aus')
    })
    it('malaysia', async () => {
        await task('malaysia')
    })
    it('Bangladesh', async ()=>{
        await task('bangladesh')
    })
    it('vietnam', async ()=>{
        await task('vietnam')
    })
})