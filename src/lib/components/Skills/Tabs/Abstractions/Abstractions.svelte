<script>
	export let skill;
	export let user;

	import Abstraction from './Abstraction.svelte';
	import Api from '$lib/api/api';
	async function handleRemoveAbstraction(payload) {
		console.log({ payload });
		await Api.delete('/abstractions/' + payload.id + '.json');
		skill.abstractions = skill.abstractions.filter((s) => s.id !== payload.id);
	}

	const addAbstraction = async () => {
		const response = await Api.post('/abstractions.json', {
			abstractable_id: skill.id,
			abstractable_type: 'Skill'
		});
		console.log(response);
		skill.abstractions = [...skill.abstractions, response];
		// console.log('fetch skill', skill);
		// fetchSkill(skill.id);
	};

	const generateAbstraction = async () => {
		const response = await Api.post('/skills/generate_abstraction.json', {
			id: skill.id
		});

		skill.abstractions = [...skill.abstractions, response];
	};
</script>

<ul class="abstractions">
	<div class="adder">
		<div class="add-abstraction" on:click={addAbstraction}>+</div>
		<div class="btn btn-warning generate-abstraction" on:click={generateAbstraction}>
			<i class="fa fa-bolt" />
		</div>
	</div>
	{#each skill.abstractions as abstraction}
		<li>
			<Abstraction {skill} {abstraction} {user} removeAbstraction={handleRemoveAbstraction} />
		</li>
	{/each}
</ul>

<style>
	.adder {
		font-size: 72px;
		position: absolute;
		left: 35%;
		/* display: inline; */
		height: 0px;
		color: #ffd67f;
		width: 0px;
		bottom: 60px;
		display: -webkit-inline-box;
	}
	/* 
	.add-abstraction {
		font-size: 72px;
		position: absolute;
		right: 50%;
		display: inline;
		height: 0px;
		color: #ffd67f;
		width: 0px;
		bottom: 60px;
	} */

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
		.abstractions {
			width: 100%;
		}
	}
</style>
