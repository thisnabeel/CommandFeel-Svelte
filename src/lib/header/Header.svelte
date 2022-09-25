<script>
	import SearchBar from './SearchBar/SearchBar.svelte';
	import {goHome} from "$lib/stores/main.js";

</script>

<header>
	<a href="/">
	<picture class="logo" on:click={goHome}>
		<img src="logo-light.png" alt="Yasbahoon Logo" />
	</picture>
	</a>

	<SearchBar></SearchBar>
</header>

<style>
	.logo {
		max-width: 450px;
		margin: 0 auto;
		display: block;
		padding: 4em;
	}

	.logo img {
		width: 100%;
		margin-top: 10px;
	}

</style>
