<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { createMutation,useIsMutating } from '@tanstack/svelte-query'
	import { response_data, store } from '../../services/store';
	import { unsubscribe } from '../../services/unsubscribe';
	import { env } from '$env/dynamic/public';
	import { mappedEnv } from '$lib/mappedEnv';

	/**@type {string}*/
	export let tenant;
	/**@type {string}*/
	export let modalTitle;
	/**@type {boolean}*/
	export let isModalOpen;
	/**@type {string}*/
	export let modalBody;
	/**@type {Array<Record<string, string>>}*/
	export let footer;

	const api_domain = mappedEnv(tenant, 'BACKEND_DOMAIN');
	const xtenant = mappedEnv(tenant, 'X_TENANT');

	let isLoading = false;
	const dispatch = createEventDispatcher();
	const close = () => {
		dispatch('close');
	};

  	/**@type {string}*/
  	let token;
	/**@type {string | number}*/
	let account_id;
	store.subscribe(values => {
		  // @ts-ignore
		token = values.token;
		  // @ts-ignore
		account_id = values.account_id;
	})

  	const unsubscribeFc = async () => {
		if(!token || !account_id) return false
		isLoading = true
		try {
			const response = await unsubscribe(token, account_id, api_domain, xtenant);
			const data = await response.json();
			response_data.set({message:data.message, status_code:'SUCCESS'})
			isLoading = false
		} catch (error) {
			isLoading = false
			console.log(error)
		}
	}

	/**@type {Record<string, () => void>}*/
	const actions = {
		close: close,
		unsubscribe: unsubscribeFc
	};
</script>
<div class="fixed w-screen h-screen bg-[#00000057] top-0 left-0 {isModalOpen ? 'block' : 'hidden'}">
	<div
		id="dialog-modal"
		class="p-4 bg-white absolute top-2/4 left-2/4 -translate-y-[70%] lg:-translate-y-[60%] -translate-x-2/4 lg:min-w-[50vw] min-w-[90vw]"
	>
		<div id="dialog-modal-header" class="grid grid-cols-[1fr_30px] items-center">
			<h3 class="font-medium">{modalTitle}</h3>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				src={`/${tenant}/assets/close.svg`}
				alt="close icon"
				class="justify-self-end cursor-pointer"
				on:click={close}
			/>
		</div>
		<div id="diagol-modal-body" class="my-6">
			{@html modalBody}
		</div>
		<div id="diagol-modal-footer">
			{#each footer as elem}
				<button id={elem.id} on:click={actions[elem.action]}> 
					{elem.text}  
					{#if isLoading && elem.action !== 'close'}
					<img class="loadersvg"  src="/assets/loader.svg" alt="loader svg"/> 
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>
