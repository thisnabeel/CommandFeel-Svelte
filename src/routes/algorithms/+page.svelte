<script>
	import { goto } from '$app/navigation';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';

	let title = '';

	let algos = [];
	async function addAlgo() {
		if (title.length < 1) return;
		const response = await Api.post('/algorithms', {
			title: title
		});

		console.log(response);
		algos = [...algos, response];

		title = '';
	}

	onMount(() => {
		getAlgos();
	});

	async function getAlgos() {
		const response = await Api.get('/algorithms.json');
		algos = response;
	}
</script>

<h1>Algorithms</h1>
<hr />
<input type="text" class="form-control" bind:value={title} />
<div class="btn btn-info" on:click={addAlgo}>Add</div>

<hr />

{#each algos as algo}
	<li on:click={() => goto('/algorithms/' + algo.id)}>{algo.title}</li>
{/each}
