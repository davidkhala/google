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
    it('Bandar Baru Klang', async () => {
        let data = await client.search("HSBC Bandar Baru Klang")
        console.debug(data)
        data = await client.search('HSBC Taman Molek')
        console.debug(data)
    })
    it('Selangor, Jln Ss', async ()=>{
        const data = await client.search('Lot 55, 57 & 59, Jalan SS21/37, Damansara Utama, Damansara Utama, Selangor Darul Ehsan, 47400, Petaling Jaya')
        assert.equal(data.length, 1)
        console.debug(data)

    })
    it('Tokyo, Nihonbashi 3-Chome', async ()=>{
        const data = await client.search("HSBC Building 11-1, Nihonbashi 3-chome,Chuo-ku")
        assert.equal(data.length, 1)
        console.debug(data)
    })
    it('Republic of Korea', async ()=>{
        const data = await client.search("서울 칠패로 37, HSBC Building")
        assert.equal(data.length, 1)
        console.debug(data)
    })
    it('New Zealand', async ()=>{
        let data = await client.search("Wellington 6011")
        assert.equal(data.length, 1)
        console.debug(data)
        data = await client.search("188 Quay Street Auckland 1010")
        assert.equal(data.length, 1)
        console.debug(data)
    })

    it('Singapore', async ()=>{
        // SingLand Tower
        let data = await client.search('HSBC (Raffles Place Branch)')
        assert.equal(data.length, 1)
        console.debug(data)
        data = await client.search('9 Battery Road #12-01 MYP Centre')
        assert.equal(data.length, 1)
        console.debug(data)
    })

    it('vietnam', async ()=>{
        let data = await client.search('Flemington Tower, 182 Đ. Lê Đại Hành, Phường 15, Quận 11, Hồ Chí Minh, 越南')
        assert.equal(data.length, 1)
        console.debug(data)
        // IDMC Building
        data = await client.search('15 Phạm Hùng, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành phố Hà Nội')
        assert.equal(data.length, 1)
        console.debug(data)
        // Hanoi, Golden Palace Le Van Luong
        data = await client.search('2R32+PX4, Trung Hòa Nhân Chính, Thanh Xuân, Hà Nội, 越南')
        assert.equal(data.length, 1)
        console.debug(data)
        // Viet Tower
        data = await client.search('1 P. Thái Hà, Trung Liệt, Đống Đa, Hà Nội, 越南')
        assert.equal(data.length, 1)
        console.debug(data)
    })
})

function load_csv(name) {
    const {data} = FromFile(`tests/fixture/${name}.csv`, undefined, "|")
    return [data.map(d => d['Work Location Name'] + ', HSBC'), data]
}


describe('batch', function () {
    this.timeout(0)
    const search = async (name) => {
        const [searchTexts, raw] = load_csv(name)
        for (let i = 0; i < raw.length; i++) {
            const item = searchTexts[i]
            const list = await client.search(item)
            const locations = list.map(i => i.location)
            if (locations.length > 1) {
                console.debug(item, locations)
            } else if (locations.length === 1) {
                const {latitude, longitude} = locations[0]
                raw[i]['latitude'] = latitude
                raw[i]['longitude'] = longitude
            } else {
                console.warn(item, locations)
            }

        }
        fs.writeFileSync(`tests/out/${name}2.csv`, ToFile(raw))
    }
    it('AUS', async () => {
        await search('aus')
    })
    it('malaysia', async () => {
        await search('malaysia')
    })
    it('Bangladesh', async () => {
        await search('bangladesh')
    })
    it('vietnam', async () => {
        await search('vietnam')
    })
    it('Indonesia', async () => {
        await search('indon')
    })
    it('Sri Lanka', async () => {
        await search('sri-lanka')
    })
    it('Philippines', async () => {
        await search('philip')
    })
    it('Singapore', async () => {
        await search('sin')
    })
})