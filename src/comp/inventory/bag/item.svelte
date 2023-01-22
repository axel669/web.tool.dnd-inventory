<script>
    import {
        Button,
        Icon,
        Paper,
        Text,

        Flex,
        Grid,

        Confirm,

        dialog,
    } from "svelte-doric"

    import inventory from "$/state/inventory.mjs"

    export let bag
    export let item
    export let edit

    const editItem = () => edit(item)
    const remove = async () => {
        const remove = await dialog.show(
            Confirm,
            {
                title: "Confirm",
                message: `Remove ${item.name} from ${bag.name}?`,
                persistent: true,
            }
        )

        if (remove === false) {
            return
        }

        inventory.bag.item.remove(bag, item)
    }
</script>

<Paper square>
    <Grid cols="min-content auto min-content" gap="8px">
        <Button color="danger" compact on:click={remove}>
            <Icon name="circle-minus" />
        </Button>

        <!-- <Flex>
            <Text>
                {item.name}
            </Text>
            <Text subtitle>
                x {item.count}
            </Text>
            <Text subtitle textColor="var(--weight)">
                {(item.weight * item.count).toFixed(2)}lbs
                ({item.weight.toFixed(2)} ea)
            </Text>
        </Flex> -->
        <Grid cols="auto 15% 25%">
            <Flex itemJustify="center">
                <Text>
                    {item.name}
                </Text>
                <Text subtitle textColor="var(--weight)">
                    {item.weight.toFixed(2)} ea
                </Text>
            </Flex>
            <Flex itemJustify="center">
                <Text>
                    x {item.count}
                </Text>
            </Flex>
            <Flex center>
                <Text textColor="var(--weight)">
                    <Icon name="weight-hanging" />
                </Text>
                <Text subtitle textColor="var(--weight)">
                    {(item.weight * item.count).toFixed(2)}
                </Text>
            </Flex>
        </Grid>

        <Button compact on:click={editItem}>
            <Icon name="edit" />
        </Button>
    </Grid>
</Paper>
