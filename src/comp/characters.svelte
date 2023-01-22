<script context="module">
    const baseInventory = {
        str: 0,
        bags: {}
    }
</script>

<script>
    import {
        Appbar,
        Button,
        CircleSpinner as Spinner,
        Footer,
        Icon,
        Paper,
        Screen,
        Text,

        Flex,
    } from "svelte-doric"

    import asuid from "@labyrinthos/asuid/browser"

    import CharCard from "./characters/char-card.svelte"
    import NewChar from "./characters/new-char.svelte"
    import Inventory from "./inventory.svelte"

    import api from "$/comm/mock/api.mjs"

    import chars from "$/state/chars.mjs"

    let scr = null
    const open = (character) => scr.openStack(
        Inventory,
        { character }
    )
    const addChar = async () => {
        const name = await scr.openStack(NewChar)

        if (name === null) {
            return
        }

        const id = asuid()
        chars.add(name, id)
        api.inventory.write(id, baseInventory)
    }
    $: charList = $chars?.map(
        (ch) => {
            const [ name, id ] = ch.split(":")
            return { name, id, raw: ch }
        }
    )
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        Inventory Manager

        <Button adorn on:click={addChar} slot="action">
            <Icon name="add" />
            New
        </Button>
    </Appbar>

    <Paper square card>
        <Flex gap="12px">
            {#if $chars === null}
                <Spinner size={100} />
            {:else}
                {#each charList as character (character)}
                    <CharCard {character} {open} />
                {:else}
                    <div>
                        No Characters
                    </div>
                {/each}
            {/if}
        </Flex>
    </Paper>
</Screen>
