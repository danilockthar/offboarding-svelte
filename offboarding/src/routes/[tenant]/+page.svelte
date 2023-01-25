<script>
	/**@type {{ tenant:string }}*/
	export let data;
</script>

<h1 class="text-3xl font-bold underline">Hello {data.tenant?? 'Partner'}</h1>

<style lang="postcss">
	:global(html) {
		background-color: whitesmoke;
		min-height: 100vh;
	}
</style>
