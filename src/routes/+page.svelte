<script>
	import {selectedSkill, selectedWonder} from "$lib/stores/main.js";
	import Skill from "$lib/pages/Skill/Skill.svelte"
	import Wonder from "$lib/pages/Wonder/Wonder.svelte"

	let skill;
	selectedSkill.subscribe(value => {
		console.log(value)
		skill = value;
	})

	let wonder;
	selectedWonder.subscribe(value => {
		console.log(value)
		wonder = value;
	})

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Yasbahoon" />
</svelte:head>

{#if skill !== null }
	<Skill skill={skill}></Skill>
{/if}

{#if wonder !== null }
	<Wonder wonder={wonder}></Wonder>
{/if}

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		/* position: absolute; */
		margin: 0 auto;
		max-width: 350px;
		top: 0;
		display: block;
	}
</style>
