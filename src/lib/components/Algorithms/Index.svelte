<script>
	import { goto } from '$app/navigation';

	import Algorithm from './Algorithm/Item.svelte';
	import SortableList from 'svelte-sortable-list';

	import { algorithmStore } from '$lib/stores/algorithms';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';

	import { user } from '$lib/stores/user';
	import { loomifiedView, showGuide } from '$lib/stores/view';
	import { openModal } from 'svelte-modals';
	import GuideModal from '$lib/modals/guide/Modal.svelte';

	let title = '';

	let algos = [];

	let userLevel = -1;

	async function addAlgo() {
		if (title.length < 1) return;
		const response = await Api.post('/algorithms', {
			title: title
		});

		console.log(response);
		algos = [...algos, response];

		title = '';
	}

	onMount(() => {});

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

{#if $showGuide && !$loomifiedView && userLevel < 0}
	<h3 class="text-center">Select your Level:</h3>
	<div class="flex">
		<div
			class="btn btn-lg btn-danger"
			on:click={() => {
				// openModal(GuideModal, { slug: 'algorithm page: never programmed before' });
			}}
		>
			I have never programmed before!
		</div>
		<div
			class="btn btn-lg btn-info"
			on:click={() => {
				getAlgos();
				userLevel = 1;
				// openModal(GuideModal, { slug: 'algorithm page: can program, new to commandfeel' });
			}}
		>
			I can program, show me the algorithms!
		</div>
	</div>
{/if}

{#if userLevel === 1}
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
{/if}

<br />

<style>
	.flex {
		display: flex;
	}

	.flex > div {
		flex: 1 1 50%;
		padding: 2em 0;
	}
</style>
