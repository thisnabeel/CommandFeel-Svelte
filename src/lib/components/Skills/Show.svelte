<script>
	import { openModal } from 'svelte-modals';
	import SkillModal from '$lib/modals/videos/skill.svelte';
	import { skills } from '$lib/stores/main';

	import { page } from '$app/stores';
	import { navigating, updated } from '$app/stores';
	import Api from '$lib/api/api.js';

	import { user } from '$lib/stores/user';

	import Abstractions from './Tabs/Abstractions/Abstractions.svelte';
	import Challenges from './Tabs/Challenges/Challenges.svelte';
	import Quizzes from './Tabs/Quiz/Quizzes.svelte';
	import Quests from './Tabs/Quests/Quests.svelte';

	export let skill;
	let tabs = ['Abstractions', 'Quiz', 'Challenges', 'Quests'];
	let activeTab = 'Abstractions';

	$: if (skill && (!$user || !$user.admin)) {
		if (skill.quiz_sets.length < 1) {
			tabs = tabs.filter((t) => t !== 'Quiz');
		}

		if (skill.challenges.length < 1) {
			tabs = tabs.filter((t) => t !== 'Challenges');
		}
	}

	const fetchSkill = async (slug) => {
		skill = await Api.get('/skills/' + slug + '.json');
		console.log('gotten', skill);
	};

	function openSkillVideo(skill, abstraction) {
		openModal(SkillModal, { skill: skill, abstraction: abstraction });
	}

	// $: console.log($user);
</script>

<section class="wrapper">
	<h1 class="title">{skill.title}</h1>

	<div class="flex">
		{#each tabs as tab}
			<div class="tab" class:active={activeTab === tab} on:click={() => (activeTab = tab)}>
				{tab}
			</div>
		{/each}
	</div>

	{#if activeTab === 'Abstractions'}
		<Abstractions {skill} user={$user} />
	{/if}

	{#if activeTab === 'Challenges'}
		<Challenges {skill} user={$user} />
	{/if}

	{#if activeTab === 'Quiz'}
		<Quizzes {skill} user={$user} />
	{/if}

	{#if activeTab === 'Quests'}
		<Quests {skill} user={$user} />
	{/if}
</section>
<br />

<style>
	.tab {
		padding: 14px;
	}
	.tab.active {
		background-color: #000;
		color: #fff;
	}
	.flex {
		display: flex;
	}

	.flex > div {
		flex: 1 1 33%;
		text-align: center;
	}

	.title {
		padding: 40px 0px;
	}
	.wrapper {
		background: #fff;
		padding: 30px;
		border-radius: 10px;
		position: relative;
	}

	.abstractions {
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
		.wrapper {
			padding: 4px;
		}

		.title {
			padding: 40px 20px;
			font-size: 24px;
		}
		.abstractions {
			width: 100%;
		}

		.abstractions > li {
			padding-top: 55px;
		}
	}
</style>
