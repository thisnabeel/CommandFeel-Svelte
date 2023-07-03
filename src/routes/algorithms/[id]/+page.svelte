<script>
	import { page } from '$app/stores';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';
	import Languages from '$lib/components/Algorithms/Languages/Index.svelte';

	let algo = null;
	onMount(() => {
		getAlgo();
	});

	async function getAlgo() {
		const response = await Api.get('/algorithms/' + $page.params.id + '.json');
		algo = response;
	}
</script>

{#if algo}
	<div class="jumbotron">
		<h1>{algo.title}</h1>
	</div>

	<Languages />
{/if}

<style>
	.jumbotron {
		padding: 24px;
		background-color: rgb(235, 235, 235);
	}
</style>
