<script>
	import { goto } from '$app/navigation';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';

	let title = '';
	let editor_slug = '';

	let algos = [];
	async function addAlgo() {
		if (title.length < 1) return;
		if (editor_slug.length < 1) return;
		const response = await Api.post('/programming_languages', {
			title: title,
			editor_slug: editor_slug
		});

		console.log(response);
		algos = [...algos, response];

		title = '';
		editor_slug = '';
	}

	onMount(() => {
		getAlgos();
	});

	async function getAlgos() {
		const response = await Api.get('/programming_languages.json');
		algos = response;
	}
</script>

<h1>Programming Languages</h1>
<hr />
<input type="text" class="form-control" placeholder="Title" bind:value={title} />
<input type="text" class="form-control" placeholder="Editor Slug" bind:value={editor_slug} />
<div class="btn btn-info" on:click={addAlgo}>Add</div>

<hr />

{#each algos as algo}
	<li on:click={() => goto('/programming_languages/' + algo.id)}>{algo.title}</li>
{/each}
