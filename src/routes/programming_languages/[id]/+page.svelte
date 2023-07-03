<script>
	import { page } from '$app/stores';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';
	import Languages from '$lib/components/Algorithms/Languages/Index.svelte';

	let lang = null;
	onMount(() => {
		getAlgo();
	});

	async function getAlgo() {
		const response = await Api.get('/programming_languages/' + $page.params.id + '.json');
		lang = response;
	}
</script>

{#if lang}
	<div class="jumbotron">
		<h1>{lang.title}</h1>
	</div>

	<Languages />
{/if}

<style>
	.jumbotron {
		padding: 24px;
		background-color: rgb(235, 235, 235);
	}
</style>
