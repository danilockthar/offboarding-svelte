<script>
	import { containsHTML } from '$lib/containsHtml';
	import { replaceTags } from '$lib/replaceTags';
	import { getContext } from 'svelte';
	import { response_data } from '../../services/store';
	import Modal from './Modal.svelte';

	/**@type {string}*/
	export let tenant;
	/**@type {string}*/
	export let bgColor;
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let primaryText;
	/**@type {any}*/
	export let modal;

	export let isModalOpen = false;
	let message;
	// @ts-ignore
	response_data.subscribe((value) => (message = value.message));
	/* const message = '$343434.00'; */
	if (message) {
		primaryText = replaceTags(primaryText, { message });
	}
</script>

<div {id} style="background-color:{bgColor}" class="grid p-4 grid-cols-[35px_1fr] h-fit">
	<img src={`/${tenant}/assets/icon_alert.svg`} alt="Important information" />
	<div>
		{#if containsHTML(primaryText)}
			{@html primaryText}
		{:else}
			<p> {primaryText}</p>
		{/if}
		{#if modal}
			<Modal on:close={() => (isModalOpen = false)} {...modal} {isModalOpen} {tenant} />
			<button id={'modal-title'} on:click={() => (isModalOpen = true)}> {modal.modalTitle} </button>
		{/if}
	</div>
</div>
