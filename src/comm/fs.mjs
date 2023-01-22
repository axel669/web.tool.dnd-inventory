import ksuid from "./ksuid.mjs"

const readdir = async (dir) => {
    const entries = []
}

const test = async () => {
    const root = await navigator.storage.getDirectory()

    const id = ksuid()
    const test = await root.getFileHandle(`Maria-${id}`, { create: true })
    const ref = await test.createWritable()
    await ref.write(`{"str":10,"bags":{"1674187217067":{"name":"Bag of Holding","weight":15,"items":{},"include":false,"coins":{"c":0,"s":0,"e":0,"g":0,"p":0},"id":1674187217067},"1674187255392":{"name":"Pouch","weight":1,"items":{"1674187270546":{"name":"Potion of Healing","weight":1,"count":1,"id":1674187270546}},"include":true,"coins":{"c":0,"s":0,"e":0,"g":0,"p":0},"id":1674187255392}}}`)
    await ref.close()
}
test()

export default {}
