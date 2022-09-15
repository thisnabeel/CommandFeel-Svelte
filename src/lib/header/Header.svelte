<script>
	import SearchBar from './SearchBar/SearchBar.svelte';
</script>

<header>
	<picture class="logo">
		<img src="logo-light.png" alt="Yasbahoon Logo" />
	</picture>

	<SearchBar></SearchBar>
</header>

<style>
	.logo {
		max-width: 320px;
		margin: 0 auto;
		display: block;
		padding: 4em;
	}

	.logo img {
		width: 100%;
		margin-top: 10px;
	}

</style>
