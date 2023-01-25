<script>
	import '../../app.css';
	import LayoutViumi from '../../components/LayoutViumi.svelte';
	import NotFound from '../../components/NotFound.svelte';

	/**@type {{ tenant:string }}*/
	export let data;

	/**@type {Record<string ,any>}*/
	const layouts = {
		viumi: LayoutViumi,
		notFound: NotFound
	};

	export const LayoutPicked = data.tenant ? layouts[data.tenant] ?? NotFound : null;
</script>

<LayoutPicked><slot /></LayoutPicked>
