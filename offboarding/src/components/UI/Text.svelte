<script>
    
    /**@type {string}*/
    export let value;
    /**@type {string}*/
    export let id;

    /**@type {string}*/
    export let type;

</script>


<svelte:element class="text-center" this={type} {id}>{value}</svelte:element>