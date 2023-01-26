<script>
	/**@type {string}*/
	export let tenant;
</script>

<div class="min-h-screen">
	<div class="bg-viumi-primary max-w-full pb-4 pt-4 pl-8 pr-8 h-32 lg:grid hidden grid-cols-2 ">
		<img src="/{tenant}/assets/logo.svg" alt="This is the logo of the website" />
		<p class="justify-self-end text-white mt-1 mb-1 ml-0 mr-0">Baja de cuenta viüMi</p>
	</div>
	<div class="relative">
		<slot />
	</div>
</div>
