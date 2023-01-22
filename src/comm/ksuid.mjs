const ksuid = () => {
    const id = new Uint8Array(16)
    const idView = new DataView(id.buffer)

    crypto.getRandomValues(id)

    return [
        Date.now().toString(32).padStart(11, "0"),
        idView.getUint32(0).toString(32).padStart(7, "0"),
        idView.getUint32(4).toString(32).padStart(7, "0"),
        idView.getUint32(8).toString(32).padStart(7, "0"),
        idView.getUint32(12).toString(32).padStart(7, "0"),
    ].join("")
}
ksuid.parse = (uid) => {
    const ts = parseInt(uid.slice(0, 11), 32)
    const date = new Date(ts)
    const id = new Uint8Array(16)
    const idView = new DataView(id.buffer)

    idView.setUint32(0, parseInt(uid.substr(11, 7), 32))
    idView.setUint32(4, parseInt(uid.substr(18, 7), 32))
    idView.setUint32(8, parseInt(uid.substr(25, 7), 32))
    idView.setUint32(12, parseInt(uid.substr(32, 7), 32))

    return { ts, date, id }
}

window.ksuid = ksuid

export default ksuid
