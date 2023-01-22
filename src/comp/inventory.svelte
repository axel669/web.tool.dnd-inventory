<script context="module">
    import sort from "@axel669/array-sort"

    const bagSort = sort.map(
        bag => bag.name,
        sort.natural
    )
</script>

<script>
    import {
        Appbar,
        Button,
        Footer,
        Icon,
        Paper,
        Screen,
        Text,

        HexagonSpinner as Spinner,

        Flex,

        Prompt,

        dialog,
    } from "svelte-doric"

    import Bag from "./inventory/bag.svelte"
    import BagInfo from "./inventory/bag-info.svelte"
    import Coinage from "./inventory/coinage.svelte"
    import EditBag from "./inventory/edit-bag.svelte"
    import StrengthDisplay from "./inventory/strength-display.svelte"
    import ValueEditor from "./inventory/value-editor.svelte"

    import api from "$/comm/mock/api.mjs"
    import inventory from "$/state/inventory.mjs"
    import { coinValue } from "$/comm/bags.mjs"

    export let character

    const { name, id } = character

    let scr = null

    const newBag = async () => {
        const newBag = await scr.openStack(EditBag, { bag: null })

        if (newBag === null) {
            return
        }

        inventory.bag.set(newBag)
    }
    const edit = async (bag) => {
        const newBag = await scr.openStack(EditBag, { bag })

        if (newBag === null) {
            return
        }

        inventory.bag.set(newBag)
    }

    const open = (bag) => scr.openStack(Bag, { id: bag.id })

    inventory.$reset()
    api.inventory.read(id).then(inventory.load)

    $: api.inventory.write(id, $inventory)

    $: bags = Object
        .values($inventory?.bags ?? {})
        .sort(bagSort)
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        {name}

        <Button adorn on:click={() => scr.close()} slot="menu">
            <Icon name="chevron-left" />
        </Button>

        <Button adorn on:click={newBag} slot="action">
            <Icon name="add" />
            Bag
        </Button>
    </Appbar>

    <Paper square card>
        {#if $inventory === null}
            <Flex center>
                <Spinner size={100} />
            </Flex>
        {:else}
            <Flex scrollable gap="8px" padding="8px">
                <StrengthDisplay {bags} />
                <Coinage {bags} />

                {#each bags as bag (bag.id)}
                    <BagInfo {bag} {open} {edit} />
                {:else}
                    No bags :(
                {/each}
            </Flex>
        {/if}
    </Paper>
</Screen>
