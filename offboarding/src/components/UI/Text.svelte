<script>
	import { replaceTags } from "$lib/replaceTags";
	import { response_data } from "../../services/store";


	/**@type {string}*/
	export let value;
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let type;
	/**@type {any}*/
	let message;
	// @ts-ignore
	response_data.subscribe((value) => (message = value.message));
	/* const message = '$343434.00'; */

</script>

{#if type === 'html'}
	{@html message? replaceTags(value, { message }) : value}
{:else}
	<svelte:element this={type ?? 'p'} {id}>{message ? replaceTags(value, { message }): value}</svelte:element>
{/if}
