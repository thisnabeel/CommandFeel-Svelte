<script>
	import Api from '$lib/api/api';
	import { openModal } from 'svelte-modals';
	import SkillModal from '$lib/modals/videos/skill.svelte';
	import { goto } from '$app/navigation';
	import EditAnswer from './EditAnswers/EditAnswer.svelte';

	export let user;
	export let refresh = () => {};
	export let skill;
	export let quiz;
	export let destroy;
	export let editable = true;
	export let linkable = false;

	let input;
	let html;
	let timer;

	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			const response = await Api.put('/quizzes/' + quiz.id + '.json', {
				question: v,
				method: '_post'
			});
			// let response = await Api.get("/quizzes/"+quiz.id+".json")
			console.log('response', response);
		}, 1000);
	};

	let showChoices = false;

	//
</script>

<li class="quiz" class:has_video={quiz && quiz.preview}>
	{#if user && user.admin === true}
		<span contenteditable on:keyup={(e) => debounce(event.target.innerHTML)}
			>{@html quiz.question}</span
		>

		{#if editable}
			<span class="fa fa-trash" on:click={() => destroy(quiz.id)} />
		{/if}

		{#if editable}
			<hr />
			<EditAnswer {quiz} />
		{/if}
	{:else}
		<div>
			<div on:click={() => (showChoices = !showChoices)}>{@html quiz.question}</div>

			{#if showChoices}
				{#if quiz.choices.length === 0}
					<hr />
					<span class="choice">{quiz.skill.title}</span>
				{/if}

				{#if quiz.choices.length === 1}
					<hr />
					<span class="choice">{@html quiz.choices[0].body}</span>
				{/if}
			{/if}
		</div>
	{/if}
	{#if linkable}
		<span class="fa fa-link link" on:click={() => goto('/skills/' + quiz.quizable_id)} />
	{/if}
</li>

<style>
	.choice {
		margin: 20px;
		display: block;
		font-size: 20px;
		font-family: 'GreyCliffCF-Light';
	}
	.link {
		position: absolute;
		left: -40px;
		top: 20px;
	}
	.hidden {
		display: none;
	}

	li {
		list-style: none;
		padding: 30px;
		position: relative;

		/* margin-bottom: 10px; */
		/* background: #e6d2ff; */

		margin-bottom: 10px;
		background: #ffffff;
		border-radius: 8px;
		box-shadow: 1px 1px 5px 3px #ccc;
	}

	.fa-trash {
		position: absolute;
		left: -7%;
		top: 39%;
	}

	.abstra-play {
		position: absolute;
		right: -122px;
		top: 14%;
		cursor: pointer;
		width: 130px;
		background: #ffd67f;
		padding: 50px;
		border-radius: 10px;
	}

	/* .abstra-play img {
        max-width: 100%;
    } */

	.abstra-preview {
		position: absolute;
		top: 12%;
		left: -6%;
		border-radius: 10px;
		max-width: 100%;
		z-index: 100;
	}

	@media (max-width: 480px) {
		.abstra-play {
			position: absolute;
			right: 0;
			left: 0;
			margin: 0 auto;
			top: -83px;
			cursor: pointer;
			padding: 55px;
			width: 7.5em;
		}

		.abstra-preview {
			position: absolute;
			top: 9px;
			left: 5px;
			border-radius: 10px;
			/* max-width: 100%; */
			max-width: 170px;
		}

		.quizzes {
			width: 95%;
		}

		.quizzes .has_video {
			padding-top: 55px;
		}

		.choice {
			margin: 0;
		}
	}
</style>
