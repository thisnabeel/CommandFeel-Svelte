<script>
	import sticky from '$lib/functions/sticky.js';

	export let stickToTop = true;

	let isStuck = false;

	function handleStuck(e) {
		isStuck = e.detail.isStuck;
	}
</script>

<section>
	<h2
		class="sticky"
		class:isStuck
		data-position={stickToTop ? 'top' : 'bottom'}
		use:sticky={{ stickToTop }}
		on:stuck={handleStuck}
	>
		I use position: sticky! (currently
		{isStuck ? 'sticking' : 'not sticking'})
	</h2>

	{#if stickToTop}
		<slot />
	{/if}
</section>

<style>
	h2 {
		margin: 0;
	}

	.sticky {
		position: sticky;
		padding: 1rem;
		background: mistyrose;
		transition: all 0.3s;
	}

	.sticky[data-position='top'] {
		top: 1rem;
	}

	.sticky[data-position='bottom'] {
		bottom: 1rem;
	}

	.sticky.isStuck {
		background: mintcream;
		box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2), 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
	}

	section {
		border: 1px solid lightskyblue;
		border-radius: 5px;
		padding: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
