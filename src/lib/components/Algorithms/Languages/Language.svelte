<script>
	import Editor from '$lib/components/CodeCompiler/Box.svelte';
	import Api from '$lib/api/api.js';
	import { selectSkill } from '$lib/stores/main';
	export let language;
	import CodeBox from '$lib/components/CodeCompiler/Box.svelte';
	import { user } from '$lib/stores/user';
	import saver from '$lib/functions/debounce';
	import { loomifiedView } from '$lib/stores/view';
	export let progress;
	export let algorithm;
	export let loomify;
	export let loomified;

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

	async function removeTrait(obj) {
		await Api.delete('/programming_language_traits/' + obj.id + '.json');
		traits = traits.filter((o) => o.id != obj.id);
	}

	let selectedHelperTrait = null;
	// console.log('passing', progress);
	$: passing = progress.filter((p) => p.programming_language_id === language.id).length > 0;

	function handlePassed(payload) {
		progress = [...progress, payload];
		console.log({ progress });
	}

	async function handleTraitUpdate(val, lang, trait) {
		const response = saver(
			'/programming_language_traits.json',
			{
				programming_language_id: lang.id,
				trait_id: trait.id,
				body: val
			},
			'post'
		);
	}

	$: langStarter =
		algorithm.language_algorithm_starters.filter(
			(s) => s.programming_language_id === language.id
		) || null;
</script>

<li class="language" class:open>
	{#if langStarter && !open}
		{#if langStarter[0] && langStarter[0].video_url && langStarter[0].video_url.length > 0}
			<i class="fa fa-video video-cta" />
		{/if}
	{/if}

	<span class="head" on:click={() => (open = !open)}
		>{language.title}
		{#if passing}
			{#if !$loomifiedView}
				<i class="fa fa-star passed" />
			{/if}
		{/if}
	</span>
	{#if open}
		<div class="challenge">
			<span class="challenge-pre"><i class="fa fa-flask" /></span>
			{algorithm.title}
		</div>
	{/if}
	<span class="help" on:click={toggleHelper}><i class="fa fa-book" /> Docs</span>

	{#if $user && $user.admin}
		{#if !open}
			<div
				class="i fa fa-toggle-off loomify"
				class:fa-toggle-on={loomified === language.id}
				on:click={() => loomify(language.id)}
			/>
		{/if}
	{/if}

	{#if showHelper}
		<div class="helper">
			<div class="header">
				<div class="flex">
					<div>
						<h1>Traits:</h1>
					</div>

					<span class="closeDocs fa fa-times" on:click={() => (showHelper = !showHelper)} />

					<div>
						<input type="text" class="form-control" placeholder="Search..." />
					</div>
				</div>
			</div>
			<ul>
				{#each traits as obj}
					<li class="trait">
						<div
							class="trait-head"
							on:click={() => {
								selectedHelperTrait ? (selectedHelperTrait = null) : (selectedHelperTrait = obj);
								console.log(selectedHelperTrait);
							}}
						>
							{obj.trait.title}
						</div>

						{#if $user && $user.admin}
							<i class="fa fa-times remove-trait" on:click={() => removeTrait(obj)} />
						{/if}
						{#if selectedHelperTrait && selectedHelperTrait.id === obj.id}
							<CodeBox
								fetched_trait={selectedHelperTrait}
								{language}
								updateCode={(val, lang) => handleTraitUpdate(val, lang, obj.trait)}
							/>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if open}
		<CodeBox {language} runnable={true} {algorithm} pass={handlePassed} />
	{/if}
</li>

<style>
	.video-cta {
		position: absolute;
		top: 2px;
		left: 2px;
	}
	.loomify {
		position: absolute;
		left: -30px;
		top: 1px;
	}
	.passed {
		/* position: absolute;
		top: 36px;
		left: 3px; */
		position: relative;
		top: -2px;
		font-size: 18px;
		color: gold;
		-webkit-text-stroke: #000;
		-webkit-text-stroke-width: 2px;
	}
	.trait {
		position: relative;
	}
	.remove-trait {
		position: absolute;
		left: -25px;
		top: 7px;
		color: #ccc;
		font-size: 12px;
	}

	.remove-trait:hover {
		color: #000;
	}
	.closeDocs {
		position: absolute;
		right: 10px;
		top: 10px;
	}
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
		height: auto;
		width: max-content;
		padding: 7px;
		background: #e1e1ff;
		color: #65659d;
		text-align: center;
		border-radius: 10%;
		right: 10px;
		top: 27px;
		position: absolute;
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
