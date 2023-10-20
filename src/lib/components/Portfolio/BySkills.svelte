<script>
	export let proofs;
	export let projects;
	import Proof from '$lib/components/Proof/Proof.svelte';
	import Project from '$lib/components/Proof/Project/Project.svelte';

	let selectedSkill = null;
	let searchInput = '';
	let filteredSkills = [];

	// $: skills = proofs.map((item) => item.challenge?.challengeable?.title);
	$: skills = Array.from(
		new Set(
			proofs
				.map((item) => item.challenge?.challengeable?.title)
				.concat(projects.flatMap((project) => project.skills.map((skill) => skill.title)))
		)
	);

	// Filter selected proofs based on the selected skill
	$: selectedProofs = proofs.filter((p) => p.challenge?.challengeable?.title === selectedSkill);

	// Find projects that have the selected skill
	$: selectedProjects = projects.filter((project) =>
		project.skills.some((skill) => skill.title === selectedSkill)
	);

	$: filteredSkills = skills.filter((s) => s.toLowerCase().includes(searchInput.toLowerCase()));
</script>

<h3 class="text-center has-ability">knows:</h3>
<input
	type="text"
	class="form-control search-abilities"
	bind:value={searchInput}
	placeholder="Search..."
/>

<ul class="by-skills-list clean-list">
	{#each filteredSkills || [] as skill}
		<li style="display: block;">
			<span
				class:selectedSkill={selectedSkill === skill}
				class="rendered_skill_description"
				on:click={() => {
					if (selectedSkill) {
						if (selectedSkill === skill) {
							selectedSkill = null;
							return;
						} else {
							selectedSkill = skill;
							return;
						}
					}
					selectedSkill = skill;
				}}>{skill}</span
			>
			{#if selectedSkill === skill}
				<section class="dp_box">
					{#each selectedProofs as proof}
						<Proof {proof} />
					{/each}

					{#each selectedProjects as project}
						<Project {project} />
					{/each}
				</section>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.selectedSkill {
		background-color: #000;
		color: #fff !important;
	}
	.has-ability {
		color: #768fd9;
	}
	.search-abilities {
		max-width: 30vw;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.by-skills-list .rendered_skill_description {
		display: block;
		padding: 11px;
		border: 1px solid #e2e2e2;
		max-width: 30vw;
		margin: 0 auto;
	}

	.by-skills-list .rendered_skill_description:hover {
		border: 1px solid #000;
	}

	.rendered_skill_description {
		display: block;

		color: #7e31d1;
		padding: 0px;
		font-size: 20px;
	}

	@media (max-width: 480px) {
		.by-skills-list li,
		.search-abilities {
			max-width: 100%;
		}

		.rendered_skill_description {
			max-width: 100% !important;
		}
	}
</style>
