<script>
	import { store } from '../../services/store';
	import Modal from './Modal.svelte';
	import { page } from '$app/stores';
	import { mappedEnv } from '../../lib/mappedEnv';
	import { isWebview } from '$lib/isWebview';

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

	const dashboardUrl = mappedEnv(tenant, 'DASHBOARD_URL');

	/**
	 * @type {any}
	 */
	export let isDisabled = false;
	if (depends_on) {
		store.subscribe((/** @type {{ [x: string]: any; }} */ value) => {
			// @ts-ignore
			isDisabled = !value[depends_on];
		});
	}
</script>

{#if modal}
	<Modal on:close={() => (isModalOpen = false)} {...modal} {isModalOpen} {tenant} />
	<button
		id={`${id}-modal-title`}
		disabled={isDisabled}
		class={isDisabled === true ? 'disabled-btn' : null}
		on:click={() => (isModalOpen = true)}
	>
		{value}
	</button>
{:else if action === 'goback'}
	{#if !$page.data.isWebView}
		<a {id} href={dashboardUrl}>
			{#if icon}
				<img src={`/assets/${icon}.svg`} alt="call to action icon" />
			{:else}
				{value}
			{/if}
		</a>
	{/if}
{:else}
	<a {id} href={action}>
		{#if icon}
			<img src={`/assets/${icon}.svg`} alt="call to action icon" />
		{:else}
			{value}
		{/if}
	</a>
{/if}
