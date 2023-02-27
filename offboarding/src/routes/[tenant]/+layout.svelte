<script>
	import LayoutViumi from '../../components/LayoutViumi.svelte';
	import LayoutOpenpay from '../../components/LayoutOpenpay.svelte';
	import NotFound from '../../components/NotFound.svelte';
	import CallToAction from '../../components/UI/CallToAction.svelte';
	import ImportantInfo from '../../components/UI/ImportantInfo.svelte';
	import Text from '../../components/UI/Text.svelte';
	import { response_data } from '../../services/store';

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
	// @ts-ignore
	response_data.subscribe((value) => (status_message = value.status_code));

	console.log(data.response)
</script>

<svelte:component this={layouts[data.tenant]} tenant={data.tenant}>
	<!--<slot /> -->
	{#each data.config[status_message] as component}
		{#if component.component === 'Text'}
			<Text {...component} />
		{/if}
		{#if component.component === 'ImportantInfo'}
			<ImportantInfo {...component} tenant={data.tenant} />
		{/if}
		{#if component.component === 'CallToAction'}
			<CallToAction {...component} />
		{/if}
	{/each}
</svelte:component>
