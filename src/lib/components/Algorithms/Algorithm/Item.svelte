<script>
	export let algorithm;
	import { goto } from '$app/navigation';
	export let move;

	import { user } from '$lib/stores/user';
</script>

<li class="algo">
	{#if $user && $user.admin}
		<span class="controls">
			<i class="fa fa-arrow-up" on:click={() => move(algorithm, 'up')} />
			<i class="fa fa-arrow-down" on:click={() => move(algorithm, 'down')} />
		</span>
	{/if}
	<span on:click={() => goto('/algorithms/' + algorithm.id)}>
		<span class="difficulty difficulty-1">Easy</span>
		<span class="title">{algorithm.title}</span>
	</span>
</li>

<style>
	.difficulty {
		background-color: rgb(255, 255, 255);
		padding: 4px 10px;
		border-radius: 10px;
	}

	.algo {
		list-style: none;
		font-size: 24px;
		border-bottom: 1px solid #ccc;
		padding-top: 8px;
		padding-bottom: 8px;
	}
</style>
