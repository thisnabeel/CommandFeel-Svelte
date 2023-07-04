<script>
	import Editor from '$lib/components/CodeCompiler/Box.svelte';
	import Api from '$lib/api/api.js';
	import { selectSkill } from '$lib/stores/main';
	export let language;
	import CodeBox from '$lib/components/CodeCompiler/Box.svelte';

	export let algorithm;
	let open = false;

	let showHelper = false;

	let traits = [];

	function toggleHelper() {
		showHelper = !showHelper;
		if (showHelper) {
			fetchTraits();
		} else {
			selectedHelperTrait = null;
		}
	}

	async function fetchTraits() {
		traits = await Api.get('/programming_languages/' + language.id + '/traits.json');
		console.log(traits);
	}

	let selectedHelperTrait = null;
</script>

<li class="language" class:open>
	<span class="head" on:click={() => (open = !open)}>{language.title}</span>
	{#if open}
		<div class="challenge">
			<span class="challenge-pre"><i class="fa fa-flask" /></span>
			{algorithm.title}
		</div>
	{/if}
	<span class="help" on:click={toggleHelper}><i class="fa fa-question" /></span>

	{#if showHelper}
		<div class="helper">
			<div class="header">
				<div class="flex">
					<div>
						<h1>Traits:</h1>
					</div>
					<div>
						<input type="text" class="form-control" placeholder="Search..." />
					</div>
				</div>
			</div>
			<ul>
				{#each traits as obj}
					<li>
						<div
							class="trait-head"
							on:click={() =>
								selectedHelperTrait ? (selectedHelperTrait = null) : (selectedHelperTrait = obj)}
						>
							{obj.trait.title}
						</div>
						{#if selectedHelperTrait && selectedHelperTrait.id === obj.id}
							<CodeBox fetched_trait={selectedHelperTrait} {language} />
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if open}
		<CodeBox {language} runnable={true} {algorithm} />
	{/if}
</li>

<style>
	.challenge {
		padding: 20px;
		color: #faffb1;
		background: #5d0c5d;
	}

	.challenge-pre {
		/* font-size: 24px; */
	}
	.helper .header {
		text-align: left;
		padding: 12px;
	}

	.helper {
		z-index: 99999;
		padding: 14px;
	}
	.header h1 {
		text-align: left;
	}

	.header .flex {
		display: flex;
	}

	.header .flex > div:nth-child(2) {
		/* flex: 1 1 0; */
		width: 100%;
		padding: 10px;
		padding-bottom: 0;
	}
	.language {
		position: relative;
	}
	.help {
		height: 40px;
		width: 40px;
		padding: 3px;
		background: #e1e1ff;
		color: #9d9dd8;
		text-align: center;
		border-radius: 100%;
		right: -49px;
		top: 27px;
		font-size: 22px;
		position: absolute;
		opacity: 25%;
	}

	.helper {
		width: 70%;
		display: block;
		position: absolute;
		right: 0;
		background: #fff;
		top: 0px;
		border-radius: 6px;
		border: 8px solid #000;
	}

	.help:hover {
		background: #e1e1ff;
		color: #000;
		opacity: 100%;
	}

	.language .head {
		padding: 22px;
		font-size: 32px;
		display: block;
	}

	.language.open .head {
		background: #000;
		color: #fff;
	}
	.language {
		margin: 10px 0;
		border: 4px solid rgb(22, 22, 22);
	}
</style>
