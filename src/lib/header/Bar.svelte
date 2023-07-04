<script>
	import SkillsBar from './SkillsBar/SkillsBar.svelte';
	import LanguagesBar from './LanguagesBar/LanguagesBar.svelte';
	import Bar from './Bar.svelte';
	let view = 'Skills';

	function switchBar() {
		view === 'Languages' ? (view = 'Skills') : (view = 'Languages');
	}
</script>

<div class="bar">
	<span class="switcher" on:click={switchBar}>Switch</span>

	<div class:hidden={view !== 'Skills'}>
		<SkillsBar />
	</div>
	<div class:hidden={view !== 'Languages'}>
		<LanguagesBar />
	</div>
</div>

<style>
	.bar {
		position: relative;
	}
	.switcher {
		position: absolute;
		right: 40px;
		top: -30px;
	}
</style>
