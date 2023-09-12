<script>
	import Api from '$lib/api/api';
	import Language from './Language.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { loomifiedView } from '$lib/stores/view';

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

	let loomified = -1;
	function loomify(payload) {
		if (loomified > -1) {
			loomified = -1;
			loomifiedView.set(false);
			return;
		}
		loomified = payload;
		loomifiedView.set(true);
	}
</script>

{#if languages}
	<ul class="clean-list languages" class:loomified={loomified > -1}>
		{#if loomified > -1}
			<Language
				language={languages.filter((l) => l.id === loomified)[0]}
				{algorithm}
				{progress}
				{loomify}
				{loomified}
			/>
		{:else}
			{#each filteredLanguages as language}
				<Language {language} {algorithm} {progress} {loomify} {loomified} />
			{/each}
		{/if}
	</ul>
{/if}

<style>
	.loomified {
		margin: 290px 0;
	}
</style>
