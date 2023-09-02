<script>
	import Api from '$lib/api/api';
	import Language from './Language.svelte';
	import { onMount } from 'svelte';

	export let algorithm;
	export let progress;
	let languages = [];
	onMount(async () => {
		languages = await Api.get('/programming_languages.json');
	});
</script>

{#if languages}
	<ul class="clean-list languages">
		{#each languages as language}
			<Language {language} {algorithm} {progress} />
		{/each}
	</ul>
{/if}

<style>
</style>
