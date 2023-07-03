<script>
	import Api from '$lib/api/api';
	import Language from './Language.svelte';
	import { onMount } from 'svelte';

	let languages = [];
	onMount(async () => {
		languages = await Api.get('/programming_languages.json');
	});
</script>

{#if languages}
	<ul class="clean-list languages">
		{#each languages as language}
			<Language {language} />
		{/each}
	</ul>
{/if}

<style>
</style>
