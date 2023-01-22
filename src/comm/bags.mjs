export const coinValue = (bag) => {
    const { coins } = bag

    return (
        (coins.c / 100)
        + (coins.s / 10)
        + (coins.e / 2)
        + (coins.g)
        + (coins.p * 10)
    ).toFixed(2)
}

export const contentWeight = (bag) =>
    Object
    .values(bag.items)
    .reduce(
        (total, item) => total + (item.weight * item.count),
        (
            bag.coins.c / 50
            + bag.coins.s / 50
            + bag.coins.e / 50
            + bag.coins.g / 50
            + bag.coins.p / 50
        )
    )

export const invWeight = (bags) => bags.reduce(
    (weight, bag) => {
        if (bag.include === true) {
            return weight + bag.weight + contentWeight(bag)
        }

        return weight + bag.weight
    },
    0
)
