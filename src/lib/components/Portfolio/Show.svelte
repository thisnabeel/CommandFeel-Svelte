<script>
	import API from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import Proof from '$lib/components/Proof/Proof.svelte';

	let proofs = [];
	onMount(async () => {
		const res = await API.post('/proofs/find', {
			user_id: $user.id
		});
		console.log({ res });
		proofs = res;
	});

	$: skills = proofs.map((item) => item.challenge?.challengeable?.title);
</script>

{#if $user}
	<h1>@{$user.username}</h1>

	<hr />
	<div class="skills clean-list">
		{#each skills as skill}
			<li>{skill}</li>
		{/each}
	</div>
	<hr />

	<div class="proofs clean-list">
		{#each proofs as proof}
			<Proof {proof} />
		{/each}
	</div>
	<br />
{/if}

<style>
	.skills {
		max-width: 350px;
		margin: 4px auto;
	}
	.skills li {
		display: inline;
		font-size: 24px;
		margin: 8px;
		padding: 12px;
		/* background-color: rgb(255, 232, 193); */
		border-radius: 10px;

		color: #fff;
		background-color: rgb(45 103 111);
	}
</style>
