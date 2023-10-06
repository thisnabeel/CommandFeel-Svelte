<script>
	export let proofs;
	import Proof from '$lib/components/Proof/Proof.svelte';

	let selectedSkill = null;
	$: skills = proofs.map((item) => item.challenge?.challengeable?.title);
	$: selectedProofs = proofs.filter((p) => p.challenge?.challengeable?.title === selectedSkill);
</script>

<h3 class="text-center has-ability">knows:</h3>
<input type="text" class="form-control search-abilities" placeholder="Search..." />

<ul class="by-skills-list clean-list">
	{#each skills as skill}
		<li style="display: block;">
			<span
				class:selectedSkill={selectedSkill === skill}
				class="rendered_skill_description"
				on:click={() => {
					if (selectedSkill) {
						selectedSkill = null;
						return;
					}
					selectedSkill = skill;
				}}>{skill}</span
			>
			<section class="dp_box">
				{#each selectedProofs as proof}
					<Proof {proof} />
				{/each}
			</section>
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
	}
</style>
