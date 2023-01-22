<script>
    import {
        Button,
        Icon,
        Paper,
        Text,
        Titlebar,

        Flex,
        Grid,

        Prompt,

        dialog,
    } from "svelte-doric"

    import inventory from "$/state/inventory.mjs"
    import { invWeight } from "$/comm/bags.mjs"

    export let bags

    const editStr = async () => {
        const newValue = await dialog.show(
            Prompt,
            {
                title: "",
                message: "Strength",
                persistent: true,
            }
        )

        if (newValue === false) {
            return
        }

        const str = parseInt(newValue)
        if (isNaN(str) === true) {
            return
        }

        inventory.str.change(str)
    }

    $: str = $inventory.str
    $: weight = invWeight(bags)
</script>

<Paper card borderColor="var(--weight)">
    <Titlebar slot="title">
        <Text textColor="var(--weight)">
            Weight {weight.toFixed(2)}/{str * 15}
        </Text>
    </Titlebar>

    <Grid cols="min-content auto">
        <Button compact on:click={editStr}>
            <Icon name="edit" />
        </Button>

        <Flex itemAlign="center" direction="row">
            <Text>
                Strength: {str}
            </Text>
        </Flex>
    </Grid>
</Paper>
