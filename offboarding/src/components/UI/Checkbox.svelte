<script>
	import { agree_checkbox, store } from "../../services/store";


    /**@type {boolean}*/
    export let value;
    /**@type {string}*/
    export let key;
    store.update(values => {
        return {
            [key]:value,
            ...values
        }
        })
    /**@type {string}*/
    export let text;

	/**@type {string}*/
    export let id;

    const handleChange = () => store.update(values => {
        return {
            ...values,
            [key]:value,
        }
        })
</script>

<label {id}>
	<input id={`${id}-input`} type=checkbox bind:checked={value} on:change={handleChange}>
	<p id={`${id}-text-value`}>{@html text}</p>
</label>

