<script>
    import {
        Icon,
        Paper,
        Text,
        Titlebar,

        Flex,
    } from "svelte-doric"

    import { coinValue } from "$/comm/bags.mjs"

    export let bags

    $: totalCoins = bags.reduce(
        (value, bag) => {
            value.c += bag.coins.c
            value.s += bag.coins.s
            value.e += bag.coins.e
            value.g += bag.coins.g
            value.p += bag.coins.p

            return value
        },
        { c: 0, s: 0, e: 0, g: 0, p: 0 }
    )
    $: totalCoin = coinValue({ coins: totalCoins })
</script>

<Paper card borderColor="var(--coins)">
    <Titlebar slot="title">
        <Text textColor="var(--coins)">
            <Icon name="coins" />
            {totalCoin}g
        </Text>
    </Titlebar>
    <Flex direction="row" itemJustify="space-evenly">
        <Text variant="secondary">{totalCoins.c}c</Text>
        <Text variant="secondary">{totalCoins.s}s</Text>
        <Text variant="secondary">{totalCoins.e}e</Text>
        <Text variant="secondary">{totalCoins.g}g</Text>
        <Text variant="secondary">{totalCoins.p}p</Text>
    </Flex>
</Paper>
