<script>
	import { page } from '$app/stores';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';
	import Language from '$lib/components/Algorithms/Languages/Language.svelte';

	let lang = null;
	onMount(() => {
		getAlgo();
	});

	async function getAlgo() {
		const response = await Api.get('/programming_languages/' + $page.params.id + '.json');
		lang = response;
		console.log({ response });
	}
	let progress = [];
</script>

{#if lang}
	<div class="jumbotron">
		<h1>{lang.title}</h1>
	</div>

	<ul class="clean-list">
		{#each lang.algorithms.sort((a, b) => a.algorithm.position - b.algorithm.position) as algo, index}
			<Language language={lang} algorithm={algo.algorithm} starter={algo} {index} {progress} />
		{/each}
	</ul>
{/if}

<style>
	.jumbotron {
		padding: 24px;
		background-color: rgb(235, 235, 235);
	}
</style>
