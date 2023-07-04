<script>
	import { goto } from '$app/navigation';

	import Algorithm from './Algorithm/Item.svelte';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';

	import { user } from '$lib/stores/user';

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

	function handleMove(algo, move) {
		console.log(move);
	}
</script>

<h1>Algorithms</h1>
<hr />
{#if $user && $user.admin}
	<input type="text" class="form-control" bind:value={title} />
	<div class="btn btn-info" on:click={addAlgo}>Add</div>
	<hr />
{/if}

{#each algos as algo}
	<Algorithm algorithm={algo} move={handleMove} />
{/each}

<br />
