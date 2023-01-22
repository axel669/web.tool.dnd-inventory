<script>
    import {
        Button,
        Icon,
        Text,
        TextInput,

        Flex,
        Grid,
    } from "svelte-doric"

    export let label
    export let value

    let show = false
    let newValue = value

    const save = () => {
        console.log(newValue)
        value = newValue
        console.log(value)
        show = false
    }
</script>

<Flex>
    <Grid padding="0px" cols="min-content auto">
        <Button on:click={() => show = true}>
            <Icon name="edit" />
        </Button>

        <Text>
            {label}: {value}
        </Text>
    </Grid>

    {#if show === true}
        <TextInput {label} bind:value={newValue}>
            <Button adorn on:click={() => show = false} color="danger" slot="start">
                Cancel
            </Button>
            <Button adorn on:click={save} color="secondary" slot="end">
                Save
            </Button>
        </TextInput>
    {/if}
</Flex>
