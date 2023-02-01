<script>
	/**@type {string}*/
	export let value;
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let type;
</script>

{#if type === 'html'}
	{@html value}
{:else}
	<svelte:element this={type ?? 'p'} {id}>{value}</svelte:element>
{/if}
