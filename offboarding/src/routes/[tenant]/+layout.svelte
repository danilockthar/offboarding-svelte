<script>
	import LayoutViumi from '../../components/LayoutViumi.svelte';
	import LayoutOpenpay from '../../components/LayoutOpenpay.svelte';
	import NotFound from '../../components/NotFound.svelte';
	import CallToAction from '../../components/UI/CallToAction.svelte';
	import ImportantInfo from '../../components/UI/ImportantInfo.svelte';
	import Text from '../../components/UI/Text.svelte';
	import Checkbox from '../../components/UI/Checkbox.svelte';
	import { response_data, store } from '../../services/store';
	import Modal from '../../components/UI/Modal.svelte';
	import Image from '../../components/UI/Image.svelte';
	import { onMount } from 'svelte';

	/**@type {Record<string,any>}*/
	const layouts = {
		viumi: LayoutViumi,
		openpay: LayoutOpenpay,
		notFound: NotFound
	};
	
	/**@type {any}*/
	export let data;

	response_data.set(data.response);
	
	/**@type {string}*/
	let status_message;
	response_data.subscribe((value) => {
		// @ts-ignore
		status_message = value.status_code
		
		// @ts-ignore
		if(value.status_code === 'SUCCESS' && typeof window !== undefined){
			window.parent.postMessage({ 
			event: 'offboardingLastScreenReached'
			}, '*');
		}
	});
	store.update((/** @type {any} */ prev) => {
		return {
			...prev,
			account_id: data.account,
			token: data.token
		};
	});
	onMount( () => {
		// @ts-ignore
		if(status_message === 'SUCCESS' && typeof window !== undefined){
			window.parent.postMessage({ 
			event: 'offboardingLastScreenReached'
			}, '*');
		}
	});

</script>

<svelte:component this={layouts[data.tenant]} tenant={data.tenant}>
	<!--<slot /> -->
	{#each data.config[status_message] as component}
		{#if component.component === 'Text'}
			<Text {...component} />
		{/if}
		{#if component.component === 'Image'}
			<Image {...component} tenant={data.tenant} />
		{/if}
		{#if component.component === 'Checkbox'}
			<Checkbox {...component} />
		{/if}
		{#if component.component === 'Modal'}
			<Modal {...component} tenant={data.tenant} />
		{/if}
		{#if component.component === 'ImportantInfo'}
			<ImportantInfo {...component} tenant={data.tenant} />
		{/if}
		{#if component.component === 'CallToAction'}
			<CallToAction {...component} tenant={data.tenant} />
		{/if}
	{/each}
</svelte:component>
