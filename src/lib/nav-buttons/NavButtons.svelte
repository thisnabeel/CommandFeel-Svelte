<script>
	import Button from './Button.svelte';
	import MediaQuery from '$lib/MediaQuery/MediaQuery.svelte';
	import { garage } from '$lib/stores/pop-ups';
	import User from './User.svelte';
	import { loomifiedView } from '$lib/stores/view';

	const openGaragePopUp = () => {
		garage.set(true);
	};
</script>

<!-- {#if matches} -->
{#if !$loomifiedView}
	<User />
{/if}

<!-- <aside class="book">
			<Button icon="fa-book" />
		</aside>

		<aside class="news">
			<Button icon="fa-newspaper" />
		</aside> -->

<!-- <aside class="garage" on:click={openGaragePopUp}>
        <Button img="/icons/garage.png" href={null} bg="#e53935"></Button>
    </aside> -->

<!-- {/if} -->
<style>
	aside {
		cursor: pointer;
		position: absolute;
	}
	.user {
		top: 40px;
		right: 145px;
	}

	.book {
		top: 40px;
		right: 80px;
	}

	.news {
		top: 40px;
		left: 28px;
	}

	.garage {
		bottom: 80px;
		left: 28px;
	}

	.garage :global(img) {
		width: 30px;
		top: 13px;
		left: 10px;
	}
</style>
