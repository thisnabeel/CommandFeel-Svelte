<script>
	import SkillsBar from './SkillsBar/SkillsBar.svelte';
	import LanguagesBar from './LanguagesBar/LanguagesBar.svelte';
	import Bar from './Bar.svelte';
	import { globalViewCategory } from '$lib/stores/view';

	function switchBar() {
		$globalViewCategory === 'Languages'
			? globalViewCategory.set('Skills')
			: globalViewCategory.set('Languages');
	}
</script>

<div class="bar">
	<span class="switcher" on:click={switchBar}>
		<div
			class="btn"
			class:btn-warning={$globalViewCategory === 'Skills'}
			class:btn-outline-warning={$globalViewCategory !== 'Skills'}
		>
			Architecture
		</div>
		<div
			class="btn"
			class:btn-primary={$globalViewCategory === 'Languages'}
			class:btn-outline-warning={$globalViewCategory !== 'Languages'}
		>
			Programming
		</div>
	</span>

	<div class:hidden={$globalViewCategory !== 'Skills'}>
		<SkillsBar />
	</div>
	<div class:hidden={$globalViewCategory !== 'Languages'}>
		<LanguagesBar />
	</div>
</div>

<style>
	.bar {
		position: relative;
	}
	.switcher {
		position: absolute;
		right: 15px;
		top: -45px;
	}

	@media (max-width: 480px) {
		.switcher {
			position: absolute;
			right: 0;
			left: 18%;
			top: -65px;
		}
	}
</style>
