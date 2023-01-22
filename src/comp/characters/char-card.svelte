<script>
    import {
        Button,
        Icon,
        Paper,
        Titlebar,

        Confirm,

        Flex,

        dialog,
    } from "svelte-doric"

    import api from "$/comm/mock/api.mjs"
    import chars from "$/state/chars.mjs"

    export let character
    export let open

    const { name } = character
    const remove = async () => {
        const confirmed = await dialog.show(
            Confirm,
            {
                title: "Confirm",
                message: `Delete ${character.name}?`
            }
        )

        if (confirmed !== true) {
            return
        }

        chars.remove(character)
        api.inventory.remove(character.id)
    }
    const viewChar = () => open(character)
</script>

<Paper card>
    <Titlebar>
        {name}

        <Button color="secondary" on:click={viewChar} adorn slot="action">
            <Icon name="book-open" />
        </Button>

        <Button adorn color="danger" on:click={remove} slot="menu">
            <Icon name="circle-minus" />
        </Button>
    </Titlebar>
</Paper>
