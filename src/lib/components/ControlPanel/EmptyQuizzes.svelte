<script>
	import API from '$lib/api/api';

	import { onMount } from 'svelte';

	let quizzes = [];
	onMount(async () => {
		API.get('/control_panel/empty_quizzes.json');
	});
</script>

<div class="wrapper">
	<h1>Empty Quizzes:</h1>
</div>

<style>
</style>
