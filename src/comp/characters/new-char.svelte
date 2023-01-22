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

    let scr = null
    let name = ""

    const add = () => scr.close(name)
    const cancel = () => scr.close(null)
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        New Character
    </Appbar>

    <Flex padding="0px">
        <Paper card square>
            <Flex>
                <TextInput label="Name" bind:value={name} />

                <Grid cols="1fr 1fr">
                    <Button color="danger" on:click={cancel}>
                        Cancel
                    </Button>

                    <Button color="secondary" on:click={add}>
                        Create
                    </Button>
                </Grid>
            </Flex>
        </Paper>
    </Flex>
</Screen>
