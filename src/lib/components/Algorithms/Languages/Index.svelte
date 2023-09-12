<script>
	import Api from '$lib/api/api';
	import Language from './Language.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';

	export let algorithm;
	export let progress;
	let languages = [];
	onMount(async () => {
		languages = await Api.get('/programming_languages.json');
	});

	$: filteredLanguages =
		$user && $user.admin
			? languages
			: languages.filter((l) =>
					algorithm.language_algorithm_starters.map((s) => s.programming_language_id).includes(l.id)
			  );
</script>

{#if languages}
	<ul class="clean-list languages">
		{#each filteredLanguages as language}
			<Language {language} {algorithm} {progress} />
		{/each}
	</ul>
{/if}

<style>
</style>
