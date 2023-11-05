<script>
	import { page } from '$app/stores';

	import Api from '$lib/api/api';
	import { onMount } from 'svelte';
	import Languages from '$lib/components/Algorithms/Languages/Index.svelte';
	import update from '$lib/functions/debounce';
	import { user } from '$lib/stores/user';
	import { afterNavigate } from '$app/navigation';
	import TestCases from '$lib/components/Algorithms/Algorithm/TestCases/TestCases.svelte';

	let algo = null;
	onMount(() => {
		getAlgo();
		getProgress();
	});

	async function getAlgo() {
		const response = await Api.get('/algorithms/' + $page.params.id + '.json');
		algo = response;
		console.log(algo.language_algorithm_starters);
	}

	afterNavigate(async function () {
		getAlgo();
	});

	// const fetchSkill = async (slug) => {
	// 	skill = await Api.get('/skills/' + slug + '.json');
	// 	mapShown.set(false);
	// 	selectSkill(skill);
	// 	console.log('gotten', skill);
	// };

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
		<span class="challenge-head">Coding Challenge:</span><br />
		<h1>{algo.title}</h1>
	</div>

	{#if $user && $user.admin}
		<TestCases algorithm={algo} />
	{/if}

	<Languages algorithm={algo} {progress} />
{/if}

<style>
	.jumbotron {
		padding: 24px;
		/* background-color: rgb(235, 235, 235); */
		background-color: #3effec82;
	}

	.jumbotron h1 {
		text-shadow: 1px 3px 2px #ffca2d87;
	}

	.challenge-head {
		display: table;
		margin: 0px auto;
		border: 2px dashed #ffca2d87;
		border-radius: 20px;
		padding: 10px;
	}
</style>
