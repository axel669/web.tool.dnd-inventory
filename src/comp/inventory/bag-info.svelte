<script>
    import {
        Button,
        Toggle,
        Icon,
        Paper,
        Text,
        Titlebar,

        Flex,
        Grid,

        Confirm,

        dialog,
    } from "svelte-doric"

    import inventory from "$/state/inventory.mjs"

    import { coinValue, contentWeight } from "$/comm/bags.mjs"

    export let bag
    export let open
    export let edit

    const openBag = () => open(bag)
    const editBag = () => edit(bag)

    const remove = async () => {
        const remove = await dialog.show(
            Confirm,
            {
                message: `Remove ${bag.name}? All items in bag will be lost.`,
                persistent: true,
            }
        )

        if (remove === false) {
            return
        }

        inventory.bag.remove(bag)
    }

    let include = bag.include
    $: coins = coinValue(bag)
    $: itemWeight = contentWeight(bag)
    $: bagWeightColor = include ? "var(--weight)" : null

    $: if (bag.include !== include) {
        inventory.bag.update(bag, { include })
    }
</script>

<Paper square card>
    <Titlebar slot="title">
        {bag.name}

        <Toggle checkbox bind:on={include} slot="menu" />

        <Button on:click={editBag} adorn slot="action">
            <Icon name="edit" />
        </Button>
    </Titlebar>

    <Grid cols="min-content 1fr min-content" padding="0px">
        <Button compact color="danger" on:click={remove}>
            <Icon name="circle-minus" />
        </Button>

        <Flex padding="0px">
            <Flex direction="row" itemJustify="space-between">
                <Text textColor="var(--weight)">
                    <Icon name="weight-hanging" />
                    {bag.weight.toFixed(2)}
                </Text>
                <Text textColor="var(--coins)">
                    <Icon name="coins" />
                    {coins}
                </Text>

                <Text textColor={bagWeightColor}>
                    <Icon name="box" />
                    {itemWeight.toFixed(2)}
                </Text>
            </Flex>

            <Flex direction="row" itemJustify="space-evenly">
                <Text subtitle>{bag.coins.c}c</Text>
                <Text subtitle>{bag.coins.s}s</Text>
                <Text subtitle>{bag.coins.e}e</Text>
                <Text subtitle>{bag.coins.g}g</Text>
                <Text subtitle>{bag.coins.p}p</Text>
            </Flex>
        </Flex>

        <Button compact color="primary" on:click={openBag}>
            <Icon name="search" />
        </Button>
    </Grid>
</Paper>
