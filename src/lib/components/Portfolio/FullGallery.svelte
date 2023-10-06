<script>
	export let proofs;
	import Proof from '$lib/components/Proof/Proof.svelte';

	$: skills = proofs.map((item) => item.challenge?.challengeable?.title);
</script>

<div class="proofs clean-list">
	{#each proofs as proof}
		<Proof {proof} />
	{/each}
</div>

<style>
</style>
