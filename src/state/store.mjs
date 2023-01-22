import { writable } from "svelte/store"
import update from "@axel669/immutable-update"

const processSubstore = () => "Nope"
const store = (info) => {
    const {"@default": defaultValue, ...actions} = info
    const source = writable(defaultValue)

    const mapped = update.expand(
        Object.fromEntries(
            Object.entries(actions).map(
                ([key, action]) => [
                    key,
                    (key.split(".").slice(-1)[0].startsWith("$") === true)
                        ? (...args) => source.set(
                            action(...args)
                        )
                        : (...args) => source.update(
                            (current) => action(current, ...args)
                        )
                ]
            )
        )
    )

    return {
        ...mapped,
        subscribe: source.subscribe,
    }
}

export default store
