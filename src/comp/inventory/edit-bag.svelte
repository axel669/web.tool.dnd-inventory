<script>
    import {
        Appbar,
        Button,
        Footer,
        Paper,
        Screen,
        TextInput,

        Flex,
        Grid,
    } from "svelte-doric"

    import asuid from "@labyrinthos/asuid/browser"

    export let bag

    let scr = null
    let name = bag?.name ?? ""
    let weightText = bag?.weight?.toString() ?? "1"

    const cancel = () => scr.close(null)
    const create = () => {
        if (isNaN(weight) === true) {
            return
        }

        if (bag !== null) {
            return scr.close({
                ...bag,
                name,
                weight,
            })
        }

        scr.close({
            name,
            weight,
            items: {},
            include: true,
            coins: {
                c: 0,
                s: 0,
                e: 0,
                g: 0,
                p: 0,
            },
            id: asuid()
        })
    }

    $: weight = parseFloat(weightText)
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        {(bag === null) ? "New" : "Edit"} Bag
    </Appbar>

    <Flex padding="0px">
        <Paper square card>
            <Flex>
                <TextInput label="Name" bind:value={name} />
                <TextInput
                    label="Weight"
                    type="number"
                    bind:value={weightText}
                />

                <Grid cols="1fr 1fr">
                    <Button color="danger" on:click={cancel}>
                        Cancel
                    </Button>

                    <Button color="secondary" on:click={create}>
                        {(bag === null) ? "Create" : "Save"} Bag
                    </Button>
                </Grid>
            </Flex>
        </Paper>
    </Flex>
</Screen>
