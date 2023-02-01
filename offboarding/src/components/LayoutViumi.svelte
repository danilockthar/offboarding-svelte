<script>
	import '../tenants/viumi/s.css';
	/**@type {string}*/
	export let tenant;
</script>

<div class="min-h-screen">
	<div class="bg-viumi-primary max-w-full pb-4 pt-4 pl-8 pr-8 h-32 lg:grid hidden grid-cols-2 ">
		<img src="/{tenant}/assets/logo.svg" alt="This is the logo of the website" />
		<p class="justify-self-end text-white mt-1 mb-1 ml-0 mr-0">Baja de cuenta viüMi</p>
	</div>
	<div class="relative max-w-full grid justify-center">
		<div
			id="paper-box-viumi"
			class="grid auto-rows-min gap-y-5 bg-white shadow-md min-h-screen lg:min-h-fit w-full lg:relative py-8 px-4 lg:p-8 top-[-30px] lg:rounded-lg"
		>
			<slot />
		</div>
	</div>
</div>
