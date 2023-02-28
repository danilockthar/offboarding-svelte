<script>
	import { store } from "../../services/store";
	import Modal from "./Modal.svelte";

	/**@type {string}*/
	export let tenant;
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let value;
	/**@type {string}*/
	export let action;
	/**@type {string}*/
	export let icon;
	/**@type {string}*/
	export let depends_on;
	/**@type {any}*/
	export let modal;

	export let isModalOpen = false;

	/**
	 * @type {any}
	 */
	 export let isDisabled = false;
	if(depends_on){
		store.subscribe((value => {
			// @ts-ignore
			isDisabled = !value[depends_on] 
		}))
	}

	const goback = () => false;
	/**@type {Record<string, () => void>}*/
	const actions = {
		goback
	};
</script>
{#if modal}
	<Modal on:close={() => (isModalOpen = false)} {...modal} {isModalOpen} {tenant} />
	<button id={`${id}-modal-title`} disabled={isDisabled} class={isDisabled === true?  'disabled-btn': null} on:click={() => (isModalOpen = true)}> {value} </button>
{:else}
<button {id} on:click={actions[action]}>
	{#if icon}
		<img src={`/assets/${icon}.svg`} alt="call to action icon" />
	{:else}
		{value}
	{/if}
</button>
{/if}


