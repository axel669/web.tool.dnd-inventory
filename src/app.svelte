<script>
    import {
        AppStyle,
        Baseline as baseline,

        Paper,

        TronTheme as theme
    } from "svelte-doric"

    import Characters from "$/comp/characters.svelte"
    import Inventory from "$/comp/inventory.svelte"

    import fs from "$/comm/fs.mjs"

    import view from "$/state/view.mjs"
</script>

<style>
    :global(body) {
        --coins: gold;
        --weight: #ff530f;
    }
    :global(input) {
        min-width: 24px;
    }
    :global(*) {
        flex-shrink: 0;
    }
</style>

<AppStyle {baseline} {theme} />

<Characters />
