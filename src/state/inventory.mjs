import update from "@axel669/immutable-update"

import api from "$/comm/mock/api.mjs"
import store from "./store.mjs"

const inventory = store({
    "@default": null,
    load: (_, inv) => inv,
    $reset: () => null,
    "str.change": (inv, str) => ({
        ...inv,
        str,
    }),
    "bag.set": (inv, bag) => update(
        inv,
        { [`bags.${bag.id}.$set`]: bag }
    ),
    "bag.remove": (inv, bag) => update(
        inv,
        { "bags.$unset": [bag.id] }
    ),
    "bag.update": (inv, bag, changes) => update(
        inv,
        Object.fromEntries(
            Object
            .entries(changes)
            .map(
                ([key, value]) => [
                    `bags.${bag.id}.${key}.$set`,
                    value
                ]
            )
        )
    ),
    "bag.item.set": (inv, bag, item) => update(
        inv,
        { [`bags.${bag.id}.items.${item.id}.$set`]: item }
    ),
    "bag.item.remove": (inv, bag, item) => update(
        inv,
        { [`bags.${bag.id}.items.$unset`]: [item.id] }
    ),
})

export default inventory
