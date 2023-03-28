<script>
	import { isWebview } from "../../lib/isWebview";
import { store } from "../../services/store";
	import Modal from "./Modal.svelte";
	import {page} from '$app/stores';
	import { mappedEnv } from "../../lib/mappedEnv";

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

	const dashboardUrl = mappedEnv(tenant, 'DASHBOARD_URL')

	/**
	 * @type {any}
	 */
	 export let isDisabled = false;
	if(depends_on){
		store.subscribe(((/** @type {{ [x: string]: any; }} */ value) => {
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
{:else if action === 'goback'}
<a {id} href={$page.data.isWebView ? 'https://exitwebview.com' :dashboardUrl }>
	{#if icon}
		<img src={`/assets/${icon}.svg`} alt="call to action icon" />
	{:else}
		{value}
	{/if}
</a>
{:else}
<a {id} href={action}>
	{#if icon}
		<img src={`/assets/${icon}.svg`} alt="call to action icon" />
	{:else}
		{value}
	{/if}
</a>
{/if}


