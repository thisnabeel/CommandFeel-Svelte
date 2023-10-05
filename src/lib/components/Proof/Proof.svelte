<script>
	import ProofLink from './ProofLink/ProofLink.svelte';
	export let proof;
</script>

<li class="proof">
	<div class="head">
		{proof.title}
	</div>
	<div class="more">
		<div class="description">
			{@html proof.description}
		</div>
		<ul class="proof_links clean-list">
			{#each proof.proof_links as proof_link}
				<ProofLink {proof_link} />
			{/each}
		</ul>
	</div>
</li>

<style>
	.proof_links {
		margin-top: 10px;
	}
	.proof {
		margin-top: 8px;
		background: #f2f2ff;
		padding: 2em;
	}

	.more {
		padding: 1em 0;
	}

	.proof .head {
		font-size: 24px;
		background: #f2f2ff;
	}
</style>
