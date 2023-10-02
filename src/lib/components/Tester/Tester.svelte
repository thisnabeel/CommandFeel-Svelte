<script>
	import API from '$lib/api/api';
	import Quiz from '$lib/components/Skills/Tabs/Quiz/Quiz.svelte';

	import { skills } from '$lib/stores/main';
	import { globalViewCategory } from '$lib/stores/view';
	import { onMount } from 'svelte';

	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	export let jobSkills = null;
	onMount(() => {
		globalViewCategory.set('Skills');
	});
	let topic = '';
	let allSkills = null;
	let topics = [];
	skills.subscribe((value) => {
		console.log('skillsMap', value);
		allSkills = value;

		topics = allSkills.filter((s) => s.title === 'SOLID Principles' || s.title === 'DevOps');
		// test();
	});

	let initiated = false;

	let results = [];
	let showResults;

	function search() {
		if (topic.length < 2) {
			results = [];
			return;
		}
		results = allSkills.filter((s) => s.title.toLowerCase().includes(topic.toLocaleLowerCase()));
		console.log(results);
		showResults = true;
	}

	function addToTest(result) {
		if (topics.filter((o) => o.id === result.id).length > 0) {
			showResults = false;
			return;
		}
		topics = [...topics, result];
		showResults = false;
	}

	function hideResults() {
		showResults = false;
	}

	let quizzes = [];
	let loading = false;
	async function test() {
		initiated = true;
		loading = true;
		quizzes = await API.post('/quizzes/batch_test.json', {
			skills: topics
		});
		loading = false;
		console.log(quizzes);
	}

	function hideQuiz(quiz) {
		const id = quiz.id;
		quizzes = quizzes.filter((q) => q.id !== id);
	}

	function removeTopic(item) {
		topics = topics.filter((topic) => item.id !== topic.id);
	}
	let hoveringResults = false;
</script>

<div class="input-wrapper">
	{#if !jobSkills}
		<input
			type="text"
			class="form-control tester"
			placeholder="Search from {allSkills.length} Skills to Test..."
			bind:value={topic}
			on:keyup={search}
			on:mouseenter={() => (showResults = true)}
			on:mouseleave={() => {
				setTimeout(function () {
					if (!hoveringResults) {
						hideResults();
					}
				}, 50);
			}}
		/>
	{/if}
	{#if results.length > 0 && showResults}
		<div
			class="results clean-list"
			on:mouseenter={() => {
				showResults = true;
				hoveringResults = true;
			}}
			on:mouseleave={() => {
				hideResults();
				hoveringResults = false;
			}}
		>
			{#each results as result}
				<li
					class="result"
					class:present={topics.filter((t) => t.id === result.id).length > 0}
					on:click={() => addToTest(result)}
				>
					{result.title}
				</li>
			{/each}
		</div>
	{/if}
</div>

{#if topics.length > 0}
	<div class="topics clean-list">
		{#each topics as item}
			<li class="topic" on:click={() => removeTopic(item)}>{item.title}</li>
		{/each}
	</div>

	<br />
	{#if loading}
		<div class="btn btn-lg btn-blocked btn-block">Loading...</div>
	{:else}
		<div class="btn btn-lg btn-primary btn-block" on:click={test}>
			{#if initiated}
				Test Topics
			{:else}
				Click To Test Topics
			{/if}
		</div>
	{/if}
{/if}

<div class="quizzes">
	{#each quizzes as quiz (quiz)}
		<div animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
			<Quiz {quiz} skill={quiz.skill} editable={false} linkable={true} {hideQuiz} />
		</div>
	{/each}
</div>

<style>
	.present {
		background-color: purple;
		color: #fff;
	}

	.input-wrapper {
		position: relative;
	}
	.topic {
		display: inline;
		margin: 10px;
		font-size: 24px;
		background-color: purple;
		color: #fff;
		padding: 10px;
		border-radius: 10px;
	}

	.btn-blocked {
		background-color: gray;
		color: #fff;
	}
	.tester {
		font-size: 44px;
	}
	.result {
		padding: 16px;
	}

	.result:hover,
	.present:hover {
		background: rgb(255, 255, 180);
		color: #000;
	}

	.results {
		padding: 10px;
		background: #fff;
		font-size: 22px;
		/* display: none; */
		/* position: absolute; */
		top: 80px;
		width: 100%;
		border: 2px solid #5f4a4a;
		z-index: 999;
		position: absolute;
	}

	.quizzes {
		font-size: 24px;
		color: #000;
		position: relative;
		margin: 10px;
		text-align: left;
		list-style: none;
		width: 70%;
		margin: 0 auto;
		padding: 20px 0;
	}

	@media (max-width: 480px) {
		.quizzes {
			width: 95%;
		}
	}
</style>
