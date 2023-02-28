<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

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

	const dispatch = createEventDispatcher();
	const close = () => {
		dispatch('close');
	};
	/**@type {Record<string, () => void>}*/
	const actions = {
		close: close
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
				<button id={elem.id} on:click={actions[elem.action]}>{elem.text}</button>
			{/each}
		</div>
	</div>
</div>
