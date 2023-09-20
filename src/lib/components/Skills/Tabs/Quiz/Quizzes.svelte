<script>
	export let skill;

	import { user } from '$lib/stores/user';
	import Api from '$lib/api/api.js';

	import Quiz from './Quiz.svelte';

	const addQuiz = async () => {
		const response = await Api.post('/quizzes.json', {
			quizable_id: skill.id,
			quizable_type: 'Skill'
		});

		skill.quizzes = [...skill.quizzes, response];
	};

	const destroy = async (id) => {
		const response = await Api.delete('/quizzes/' + id + '.json');
		skill.quizzes = skill.quizzes.filter((q) => q.id !== id);
	};

	const hideQuiz = async (quiz) => {
		const id = quiz.id;
		skill.quizzes = skill.quizzes.filter((q) => q.id !== id);
	};

	const generateQuiz = async (category = null) => {
		const response = await Api.post('/skills/generate_quiz.json', {
			id: skill.id,
			category: category
		});

		skill.quizzes = [...skill.quizzes, response];
	};
</script>

<div class="quizzes">
	{#each skill.quizzes || [] as quiz}
		<Quiz {quiz} user={$user} {skill} {destroy} {hideQuiz} />
	{/each}

	{#if $user && $user.admin}
		<div class="adder">
			<div class="add-quiz btn btn-outline-warning" on:click={addQuiz}>+</div>
			<div class="btn btn-warning generate-quiz" on:click={generateQuiz}>
				<i class="fa fa-bolt" /> QA
			</div>
			<div class="btn btn-warning generate-quiz" on:click={() => generateQuiz('jeopardy')}>
				<i class="fa fa-bolt" /> Jeopardy
			</div>
		</div>
	{/if}
</div>

<style>
	.adder {
		font-size: 22px;
		color: #ffd67f;
		display: flex;
	}

	.adder > div {
		flex: 1;
		text-align: center;
		margin: 1px;
	}

	.add-quiz {
		font-size: 24px;
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
