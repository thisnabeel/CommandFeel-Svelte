<script>
	import { user } from '$lib/stores/user';
	import ProofLink from './ProofLink/ProofLink.svelte';
	export let proof;
	let editable = false;
	let editing = false;

	user.subscribe((value) => {
		if (!value) return;
		if (value.id === proof.user_id) editable = true;
	});

	function deleteProof() {
		console.log('delete');
	}
</script>

<li class="proof">
	<div class="skill">{proof.challenge.challengeable.title}</div>
	<br /><br />
	{#if editable}
		<div class="fa fa-cog editable" on:click={() => (editing = !editing)} />
	{/if}

	{#if editable && editing}
		<div class="fa fa-trash delete-proof" on:click={deleteProof} />
	{/if}
	<div>
		<h1 style="text-align:left; display:inline;">
			{proof.title}
		</h1>
		<div class="description">
			{@html proof.description}
		</div>
	</div>
	<div class="more">
		<ul class="proof_links clean-list">
			{#each proof.proof_links as proof_link}
				<ProofLink {proof_link} {editable} />
			{/each}
		</ul>

		{#if editable && editing}
			<div class="btn btn-warning">Add Link</div>
		{/if}
	</div>
</li>

<style>
	.description {
		color: #89600d;
	}
	.skill {
		display: inline-block;
		padding: 8px 14px;
		background: #ffeaff;
		border-radius: 8px;
	}
	.proof_links {
		margin-top: 10px;
	}
	.proof {
		margin-top: 8px;
		background: #fbfcf9;
		padding: 2em 2em 0 2em;
		position: relative;
	}

	.more {
		padding: 1em 0;
	}

	.proof .head {
		font-size: 24px;
		/* background: #f2f2ff; */
	}

	.editable {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 24px;
	}

	.delete-proof {
		position: absolute;
		top: 10px;
		right: 40px;
	}
</style>
