<script>
	import { replaceTags } from "../../lib/replaceTags";


    /**@type {string}*/
	export let tenant;
    /**@type {string}*/
    export let bgColor;
    /**@type {string}*/
    export let id;
    /**@type {string}*/
    export let primaryText;
    /**@type {Record<any,string>}*/
    export let modalTitle;

    const message = '$343434.00'
    if(message){
        primaryText = replaceTags(primaryText, { message})
    }


</script>

<div {id} style="background-color:{bgColor}" class="grid p-4 grid-cols-[35px_1fr] h-fit">
    <img src={`/${tenant}/assets/icon_alert.png`} alt="Important information"/>
    <div class="grid gap-y-4">
        <p>{primaryText} </p>
        {#if modalTitle}
            <button id={modalTitle.id}> {modalTitle.value} </button>
        {/if}
    </div>
</div>