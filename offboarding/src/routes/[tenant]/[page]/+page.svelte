<script>
	import CallToAction from '../../../components/UI/CallToAction.svelte';
	import ImportantInfo from '../../../components/UI/ImportantInfo.svelte';
	import Text from '../../../components/UI/Text.svelte';
	import { response_data } from '../../../services/store';

	let mapper = {
		Text: Text
	};

	/**@type {{ tenant:string, token:string, configs:any}}*/
	export let data;

	let status_message;
	response_data.subscribe((value) => (status_message = value.status));

	/**@type {any}*/
	export const config = import(`../../../tenants/${data.tenant}/config.json`);
</script>

{#each data.configs['PENDING_DEPOSIT'] as component}
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
