<script>
	import { page } from '$app/stores';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';
	import Languages from '$lib/components/Algorithms/Languages/Index.svelte';
	import update from '$lib/functions/debounce';
	import { user } from '$lib/stores/user';

	let algo = null;
	onMount(() => {
		getAlgo();
		getProgress();
	});

	async function getAlgo() {
		const response = await Api.get('/algorithms/' + $page.params.id + '.json');
		algo = response;
	}

	let progress = [];
	async function getProgress() {
		if (!$user) return;
		progress = await Api.get(
			'/users/' + $user.id + '/algorithms/' + $page.params.id + '/attempts.json'
		);
		console.log(progress);
	}
</script>

{#if algo}
	<div class="jumbotron">
		<h1>{algo.title}</h1>
	</div>

	{#if $user && $user.admin}
		<input
			type="text"
			class="form-control"
			placeholder="Expected..."
			bind:value={algo.title}
			on:change={async () => {
				console.log('Updating');
				algo = await update('/algorithms/' + algo.id + '.json', {
					title: algo.title
				});
				console.log('gotten:', algo);
			}}
		/>
		<input
			type="text"
			class="form-control"
			placeholder="Expected..."
			bind:value={algo.expected}
			on:change={async () => {
				console.log('Updating');
				algo = await update('/algorithms/' + algo.id + '.json', {
					expected: algo.expected
				});
				console.log('gotten:', algo);
			}}
		/>
	{/if}

	<Languages algorithm={algo} {progress} />
{/if}

<style>
	.jumbotron {
		padding: 24px;
		/* background-color: rgb(235, 235, 235); */
		background-color: rgb(255 255 255);
	}
</style>
