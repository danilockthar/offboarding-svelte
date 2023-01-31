<script>
	import ImportantInfo from "../../../components/UI/ImportantInfo.svelte";
	import Text from "../../../components/UI/Text.svelte";

	let mapper = {
		"Text": Text
	}

	/**@type {{ tenant:string, token:string }}*/
	export let data;
	
	/**@type {any}*/
	export const config = import(`../../../tenants/${data.tenant}.json`)
	
</script>

{#await config then json}
{#each json.default["pending-deposit"] as component}
	{#if component.component === "Text"}
	<Text {...component}/>
	{/if}
	{#if component.component === "ImportantInfo"}
	<ImportantInfo {...component} tenant={data.tenant}/>
	{/if}
{/each}

{/await}

