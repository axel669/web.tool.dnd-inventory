<script>
    import {
        Appbar,
        Button,
        Icon,
        Paper,
        Screen,
        Text,
        TextInput,

        Flex,
        Grid,
    } from "svelte-doric"

    import asuid from "@labyrinthos/asuid/browser"

    export let item

    let scr = null
    const close = () => scr.close(null)
    const add = () => {
        if (item !== null) {
            return scr.close({
                ...item,
                name,
                weight,
                count,
            })
        }

        scr.close({
            name,
            weight,
            count,
            id: asuid(),
        })
    }

    let name = item?.name ?? ""
    let weightText = item?.weight?.toString() ?? "0"
    let countText = item?.count?.toString() ?? "1"

    $: weight = parseFloat(weightText)
    $: count = parseInt(countText)
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        {(item === null) ? "New" : "Edit"} Item
    </Appbar>

    <Flex padding="0px">
        <Paper card square>
            <Flex>
                <TextInput
                    label="Name"
                    bind:value={name}
                />
                <TextInput
                    type="number"
                    label="Count"
                    bind:value={countText}
                />
                <TextInput
                type="number"
                label="Weight"
                extra="Per item"
                bind:value={weightText}
                >
                    <Text textColor="var(--weight)" slot="start">
                        <Icon name="weight-hanging" />
                    </Text>
                </TextInput>

                <Grid cols="1fr 1fr">
                    <Button color="danger" on:click={close}>
                        Cancel
                    </Button>

                    <Button color="secondary" on:click={add}>
                        {(item === null) ? "Add" : "Save"} Item
                    </Button>
                </Grid>
            </Flex>
        </Paper>
    </Flex>
</Screen>
