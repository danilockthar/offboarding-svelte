<script>
	import LayoutViumi from '../../../components/LayoutViumi.svelte';
	import LayoutOpenpay from '../../../components/LayoutOpenpay.svelte';
	import NotFound from '../../../components/NotFound.svelte';
	import { response_data } from '../../../services/store';
	/**@type {{ tenant:string, token:string | null, error: boolean | null, response_data:any, configs:any}}*/
	export let data;

	response_data.set(data.response_data);
	/**@type {Record<string ,any>}*/
	const layouts = {
		viumi: LayoutViumi,
		openpay: LayoutOpenpay,
		notFound: NotFound
	};

	export const LayoutPicked = data.tenant ? layouts[data.tenant] ?? NotFound : null;
</script>

<svelte:component this={layouts[data.tenant]} tenant={data.tenant}>
	<slot />
</svelte:component>
<!-- <LayoutPicked tenant={data.tenant}></LayoutPicked> -->
