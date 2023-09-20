<script>
	import { goto } from '$app/navigation';

	import Algorithm from './Algorithm/Item.svelte';
	import SortableList from 'svelte-sortable-list';

	import { algorithmStore } from '$lib/stores/algorithms';

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
		algorithmStore.set(algos);
	}

	function handleMove(algo, move) {
		console.log(move);
	}

	const sortList = (ev) => {
		algos = ev.detail.map((a, i) => {
			a.position = i + 1;
			return a;
		});
		saveOrder(algos);
	};

	async function saveOrder(list) {
		const response = await Api.post('/algorithms/order.json', {
			list: algos
		});
		console.log(response);
	}
</script>

<h1>Algorithms</h1>
<hr />
{#if $user && $user.admin}
	<input type="text" class="form-control" bind:value={title} />
	<div class="btn btn-info" on:click={addAlgo}>Add</div>
	<hr />
{/if}

{#if $user && $user.admin}
	<SortableList list={algos} key="id" on:sort={sortList} let:item={algo}>
		<Algorithm algorithm={algo} index={algos.indexOf(algo)} />
	</SortableList>
{:else}
	{#each algos.filter((algo) => algo.expected_with_type !== null) as algo, index}
		<Algorithm algorithm={algo} {index} />
	{/each}
{/if}

<br />
