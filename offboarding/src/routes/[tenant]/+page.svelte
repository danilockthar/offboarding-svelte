<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { canUnsubscribe } from '../../services/canUnsubscribe';

	/**@type {{ tenant:string | null, token:string | null, error: boolean | null }}*/
	export let data;
	export let isLoading = false;
	onMount(async () => {
		isLoading = true;
		canUnsubscribe()
			.then((res) => {
				isLoading = false;
			})
			.catch((err) => {
				goto(`/${data.tenant}/cannot-operate`);
				isLoading = false;
			});
	});
</script>

{#if isLoading}
	<p>loading..</p>
{:else}
	<div>cargado</div>
{/if}
