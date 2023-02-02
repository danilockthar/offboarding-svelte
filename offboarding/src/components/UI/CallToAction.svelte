<script>
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let value;
	/**@type {string}*/
	export let action;
	/**@type {string}*/
	export let icon;
	const goback = () => false;
	/**@type {Record<string, () => void>}*/
	const actions = {
		goback
	};
</script>

<button {id} on:click={actions[action]}>
	{#if icon}
		<img src={`/assets/${icon}.svg`} alt="call to action icon" />
	{:else}
		{value}
	{/if}
</button>
