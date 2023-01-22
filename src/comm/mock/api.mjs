import ksuid from "../ksuid.mjs"

export default {
    chars: {
        write: async (chars) => {
            if (chars === null) {
                return
            }
            localStorage.chars = JSON.stringify(chars)
        },
        read: async (chars) => JSON.parse(
            localStorage.chars ?? "[]"
        )
    },
    inventory: {
        read: async (id) => JSON.parse(localStorage[`inv:${id}`]),
        write: async (id, inv) => {
            if (inv === null) {
                return
            }
            localStorage[`inv:${id}`] = JSON.stringify(inv)
        },
        remove: async (id) => {
            localStorage.removeItem(`inv:${id}`)
        }
    }
}
