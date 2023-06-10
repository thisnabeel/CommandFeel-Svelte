<script>
	export let skill;
	export let user;
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
</script>

<div class="quizzes">
	<div class="add-quiz" on:click={addQuiz}>+</div>

	{#each skill.quizzes || [] as quiz}
		<Quiz {quiz} {user} {skill} {destroy} />
	{/each}
</div>

<style>
	.add-quiz {
		font-size: 72px;
		position: absolute;
		right: 50%;
		display: inline;
		height: 0px;
		color: #ffd67f;
		width: 0px;
		bottom: 60px;
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
</style>
