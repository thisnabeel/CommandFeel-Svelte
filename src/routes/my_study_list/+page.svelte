<script>
	import { afterNavigate } from '$app/navigation';
	import MyStudyList from '$lib/components/MyStudyList/Index.svelte';
	import { globalViewCategory } from '$lib/stores/view';
	afterNavigate(() => {
		globalViewCategory.set("Skills");
	})
</script>

<MyStudyList />

<style></style>
