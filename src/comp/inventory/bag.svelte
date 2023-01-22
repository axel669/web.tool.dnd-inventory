<script context="module">
    import sort from "@axel669/array-sort"

    const nameSort = sort.map(
        item => item.name,
        sort.natural
    )
</script>

<script>
    import {
        Appbar,
        Button,
        Icon,
        Paper,
        Screen,
        Text,

        Flex,
    } from "svelte-doric"

    import Coinage from "./bag/coinage.svelte"
    import EditItem from "./bag/edit-item.svelte"
    import Item from "./bag/item.svelte"

    import inventory from "$/state/inventory.mjs"

    export let id

    $: bag = $inventory.bags[id]
    $: items = Object
        .values(bag.items)
        .sort(nameSort)

    const newItem = async () => {
        const newItem = await scr.openStack(EditItem, { item: null })

        if (newItem === null) {
            return
        }

        inventory.bag.item.set(bag, newItem)
    }
    const edit = async (item) => {
        const newItem = await scr.openStack(EditItem, { item })

        if (newItem === null) {
            return
        }

        inventory.bag.item.set(bag, newItem)
    }
    const editCoins = async () => {
        const coins = await scr.openStack(
            Coinage,
            { bag }
        )

        if (coins === null) {
            return
        }

        inventory.bag.update(bag, { coins })
    }

    let scr = null
    const close = () => scr.close()
</script>

<style>
    extension-area {
        background-color: var(--background-layer);
        display: grid;
        padding: 2px;
    }
</style>

<Screen bind:this={scr}>
    <Appbar slot="title">
        {bag.name}

        <Button adorn on:click={close} slot="menu">
            <Icon name="chevron-left" />
        </Button>

        <Button adorn on:click={newItem} slot="action">
            <Icon name="add" />
            Item
        </Button>

        <extension-area ignore-titlebar-reskin slot="extension">
            <Button
            buttonColor="var(--coins)"
            variant="outline"
            on:click={editCoins}
            >
                <Flex direction="row" itemJustify="space-evenly">
                    <Icon name="coins" />
                    <Text>{bag.coins.c}c</Text>
                    <Text>{bag.coins.s}s</Text>
                    <Text>{bag.coins.e}e</Text>
                    <Text>{bag.coins.g}g</Text>
                    <Text>{bag.coins.p}p</Text>
                </Flex>
            </Button>
        </extension-area>
    </Appbar>

    <Paper card>
        <Flex scrollable gap="6px">
            {#each items as item}
                <Item {bag} {item} {edit} />
            {:else}
                <Text>
                    No items in bag
                </Text>
            {/each}
        </Flex>
    </Paper>
</Screen>
