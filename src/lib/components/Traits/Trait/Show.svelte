<script>
	import Api from '$lib/api/api';
	import Language from '$lib/components/Languages/Language.svelte';
	import { onMount } from 'svelte';
	import CodeCompiler from '$lib/components/CodeCompiler/Box.svelte';
	export let trait;

	let languages = [];
	onMount(async () => {
		languages = await Api.get('/programming_languages.json');
	});

	async function updateCode(value, language) {
		console.log(value);
		const response = await Api.post('/programming_language_traits.json', {
			programming_language_id: language.id,
			trait_id: trait.id,
			body: value
		});
		console.log(response);
	}
</script>

{#if languages}
	<div class="jumbotron">
		<h1>{trait.title}</h1>
	</div>

	<ul class="clean-list languages">
		{#each languages as language}
			<Language {language}>
				<CodeCompiler {language} {updateCode} {trait} />
			</Language>
		{/each}
	</ul>
{/if}

<style>
	.jumbotron {
		padding: 24px;
		background-color: rgb(235, 235, 235);
	}
</style>
