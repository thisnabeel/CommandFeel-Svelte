<script>
	import { goto } from '$app/navigation';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';

	let title = '';

	let traits = [];
	async function addTrait() {
		if (title.length < 1) return;
		const response = await Api.post('/traits', {
			title: title
		});

		console.log(response);
		traits = [...traits, response];

		title = '';
		editor_slug = '';
	}

	onMount(() => {
		getTraits();
	});

	async function getTraits() {
		const response = await Api.get('/traits.json');
		traits = response;
	}
</script>

<h1>Traits</h1>
<hr />
<input type="text" class="form-control" placeholder="Title" bind:value={title} />
<div class="btn btn-info" on:click={addTrait}>Add</div>

<hr />

{#each traits as trait}
	<li on:click={() => goto('/traits/' + trait.id)}>{trait.title}</li>
{/each}
