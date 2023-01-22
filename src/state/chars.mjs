import sort from "@axel669/array-sort"
import update from "@axel669/immutable-update"

import api from "$/comm/mock/api.mjs"
import store from "./store.mjs"

const nameSort = sort.map(
    item => item.name,
    sort.string
)
const chars = store({
    "@default": null,
    load: (_, chars) => chars,
    add: (chars, name, id) => [
        ...chars,
        `${name}:${id}`
        // { name, id }
    ].sort(),
    remove: (chars, target) => chars.filter(
        ch => ch !== target.raw
    )
})
chars.subscribe(api.chars.write)
api.chars.read().then(chars.load)

export default chars
