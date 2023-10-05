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
		<div class="flex">
			<img src={icon()} alt="" class="logo" />
			<div class="link">{proof_link.title || proof_link.url}</div>
		</div>
	</a>
</li>

<style>
	.flex {
		display: flex;
	}
	.link {
		overflow-wrap: break-word;
		padding-left: 10px;
	}
	a {
		display: block;
	}
	.logo {
		width: 60px;
		object-fit: cover;
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
