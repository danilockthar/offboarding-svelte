<script>
	import '../../app.css';
	import LayoutViumi from '../../components/LayoutViumi.svelte';
	import LayoutOpenpay from '../../components/LayoutOpenpay.svelte';
	import NotFound from '../../components/NotFound.svelte';
	/**@type {{ tenant:string | null, token:string | null, error: boolean | null }}*/
	export let data;

	/**@type {Record<string ,any>}*/
	const layouts = {
		viumi: LayoutViumi,
		openpay: LayoutOpenpay,
		notFound: NotFound
	};

	export const LayoutPicked = data.tenant ? layouts[data.tenant] ?? NotFound : null;
	/* export const ssr = false; */
</script>

<LayoutPicked tenant={data.tenant}><slot /></LayoutPicked>
