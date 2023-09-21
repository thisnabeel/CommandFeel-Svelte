<script>
	import API from '$lib/api/api';
	import { user } from '$lib/stores/user';

	import { onMount } from 'svelte';
	import Quiz from '$lib/components/Skills/Tabs/Quiz/Quiz.svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let quizzes = { 1: [], 2: [], 3: [] };

	user.subscribe((u) => {
		getQuizzes();
	});

	let category = 1;

	async function getQuizzes() {
		if (!$user) return;
		quizzes = await API.get(`/users/${$user.id}/user_quiz_statuses.json`);
		console.log({ quizzes });
	}
	function selectCategory(category) {
		console.log({ category });
	}

	function hideQuiz(quiz) {
		console.log({ quiz });
		console.log(quizzes[category]);
		const id = quiz.id;
		// let copy = { ...quizzes };
		quizzes[category] = quizzes[category].filter((q) => q.quiz_id !== id);
		// quizzes = copy;
	}
</script>

<h1>My Study List:</h1>

<div class="row categories">
	<hr />
	<div class="col-lg-4 col-md-4 col-sm-4">
		<div class="btn" class:active={category === 1} on:click={() => (category = 1)}>Easy</div>
	</div>
	<div class="col-lg-4 col-md-4 col-sm-4">
		<div class="btn" class:active={category === 2} on:click={() => (category = 2)}>
			Inarticulate
		</div>
	</div>
	<div class="col-lg-4 col-md-4 col-sm-4">
		<div class="btn" class:active={category === 3} on:click={() => (category = 3)}>No Idea</div>
	</div>
</div>

{#if !$user}
	<br />
	<div class="cta">
		<h1>You are not signed in!</h1>
		<br />

		<div class="requested text-center" />
	</div>
{:else}{/if}
<hr />
<div class="quizzes">
	{#each quizzes[category] || [] as obj (obj)}
		<div animate:flip={{ delay: 250, duration: 250, easing: quintOut }}>
			<Quiz quiz={obj.quiz} skill={obj.quiz.skill} editable={false} linkable={true} {hideQuiz} />
		</div>
	{/each}
</div>

<style>
	.cta {
		background: rgb(207, 41, 41);
		color: #fff;
		display: block;
		padding: 3em;
		border-radius: 8px;
	}

	.cta .btn {
		display: block;
		font-size: 22px;
	}

	.cta h1 {
		color: #fff;
	}

	.categories {
		width: 100%;

		margin: 0;
	}

	.categories > div {
		padding: 0;
		margin: 0;
	}

	.categories .btn {
		display: block;
		font-size: 32px;
		width: 100%;
	}

	.active {
		background-color: #000;
		color: #fff;
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
