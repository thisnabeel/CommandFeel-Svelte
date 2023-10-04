<script>
	export let proof_link;

	$: icon();

	function icon() {
		if (proof_link.url.includes('github')) {
			return '/github.png';
		}
	}
</script>

<li class="proof_link">
	<a href={proof_link.url} target="_blank">
		<img src={icon()} alt="" class="logo" /> {proof_link.title || proof_link.url}</a
	>
</li>

<style>
	a {
		display: block;
	}
	.logo {
		width: 60px;
	}

	.proof_link a {
		border-radius: 6px;
		border: 1px solid #ccc;
		padding: 1em;
	}

	.proof_link a:hover {
		background: #dfe3e694;
	}
</style>
