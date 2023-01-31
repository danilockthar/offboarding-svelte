<script>
	import { goto } from '$app/navigation';
	import { onMount, setContext } from 'svelte';
	import { canUnsubscribe } from '../../services/canUnsubscribe';

	/**@type {{ tenant:string | null, token:string | null, error: boolean | null }}*/
	export let data;
	export let isLoading = false;

	/**@type {Record<any, string>}*/
	const statusPage = {
		OK: 'MoneyAvailable',
		HAS_BALANCE: 'cannot-operate',
		PENDING_DEPOSIT: 'pending-deposit',
		ERROR: 'cannot-operate',
	};
	onMount(async () => {
		isLoading = true;
		const fakeResponse = {data:{
			status_code:'PENDING_DEPOSIT',
			message:'$1400.00'
		}}
		canUnsubscribe()
			.then((res) => {
				setContext('response_data', fakeResponse.data);
				goto(`/${data.tenant}/${statusPage[fakeResponse.data.status_code]}`)
				isLoading = false;
			})
			.catch((err) => {
				/* setContext('response_data', fakeResponse.data); */
				goto(`/${data.tenant}/${statusPage[fakeResponse.data.status_code]}`)
				isLoading = false;
				/* goto(`/${data.tenant}/cannot-operate`);
				isLoading = false; */
			});
	});
</script>

{#if isLoading}
	<p>loading..</p>
{:else}
	<div>cargado</div>
{/if}
