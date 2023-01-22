<script context="module">
    const labels = {
        c: "Copper",
        s: "Silver",
        e: "Electrum",
        g: "Gold",
        p: "Platinum",
    }
    const keys = ["c", "s", "e", "g", "p"]

    const objmap = (source, map) => Object.fromEntries(
        Object.entries(source).map(
            ([key, value]) => [key, map(value)]
        )
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
        TextInput,

        Flex,
        Grid,
    } from "svelte-doric"

    export let bag

    const coins = {...bag.coins}

    let values = objmap(
        coins,
        (amount) => amount.toString()
    )

    $: nums = objmap(
        values,
        (coinText) => parseInt(coinText)
    )
    $: errors = objmap(
        nums,
        (amount) => isNaN(amount) ? "Invalid amount of coins" : ""
    )

    let scr = null
    const cancel = () => scr.close(null)
    const save = () => scr.close(nums)
</script>

<Screen bind:this={scr}>
    <Appbar slot="title">
        Coins in {bag.name}
    </Appbar>

    <Flex padding="0px">
        <Paper card square>
            <Flex>
                <Grid
                direction="column"
                rows="min-content min-content min-content"
                cols="1fr 1fr"
                padding="0px"
                >
                    {#each keys as key}
                        <TextInput
                        label={labels[key]}
                        bind:value={values[key]}
                        error={errors[key]}
                        extra={errors[key]}
                        >
                            <Text textColor="var(--coins)" slot="start">
                                <Icon name="coins" />
                            </Text>
                        </TextInput>
                    {/each}
                </Grid>

                <Grid padding="0px" cols="1fr 1fr">
                    <Button color="danger" on:click={cancel}>
                        Cancel
                    </Button>
                    <Button color="secondary" on:click={save}>
                        Save
                    </Button>
                </Grid>
            </Flex>
        </Paper>
    </Flex>
</Screen>
