<script>
	import { onMount, beforeUpdate } from 'svelte';

	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import Api from '$lib/api/api.js';

	import Chapter from '$lib/components/Chapters/Show.svelte';
	import { mapShown, selectChapter, selectedChapter } from '$lib/components/Chapters/store';
	// import { navigating } from '$app/stores';
	import { globalViewCategory } from '$lib/stores/view';

	let chapter;
	let changedSlug;

	onMount(async function () {
		globalViewCategory.set('Chapters');
		chapter = await Api.get('/chapters/' + $page.params.slug + '.json');
		console.log('SKILL FIND', chapter);
	});

	afterNavigate(async function () {
		fetchChapter($page.params.slug);
		globalViewCategory.set('Chapters');
	});

	const fetchChapter = async (slug) => {
		chapter = await Api.get('/chapters/' + slug + '.json');
		mapShown.set(false);
		selectChapter(chapter);
		console.log('gotten', chapter);
	};
</script>

{#if chapter}
	<Chapter {chapter} />
{/if}
