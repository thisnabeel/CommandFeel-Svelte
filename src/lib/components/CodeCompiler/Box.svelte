<script>
	import Editor from '@monaco-editor/react';
	import { onMount } from 'svelte';
	import Api from '$lib/api/api';
	import Swal from 'sweetalert2';
	import { user } from '$lib/stores/user';
	import Block from './Block.svelte';
	import API from '$lib/api/api';

	export let language;
	export let updateCode;
	export let trait;
	export let runnable = false;

	export let algorithm;

	export let pass;

	let fetched = false;
	export let fetched_trait = null;
	let result = null;
	let code = '';

	let error = null;

	$: body = fetched_trait ? fetched_trait.body : null;

	async function test() {
		const response = await Api.post(`/execute_code`, {
			code: fullCode,
			algorithm_id: algorithm.id,
			programming_language_id: language.id,
			user_id: $user ? $user.id : null
		});

		console.log(response);
		result = response;

		error = null;

		if (response.passing.passing) {
			pass(response.passing);
			setTimeout(function () {
				Swal.fire('Perfect!', 'You Passed This Challenge in ' + language.title, 'success');
			}, 750);
		} else {
			error = response.output;
		}

		// let output = response.output.replace(/[\r\n]+/g, '');
		// if (output === algorithm.expected_with_type) {
		// 	setTimeout(function () {
		// 		Swal.fire('Perfect!', 'You Passed This Challenge in ' + language.title, 'success');
		// 	}, 750);
		// } else {
		// 	error = response.output;
		// }
	}

	onMount(async () => {
		if (algorithm) {
			const starter = await Api.get(
				`/language_algorithm_starters/finder/${language.id}/${algorithm.id}.json`
			);
			if (starter) {
				blocks = starter.code_lines;
			}
		} else {
			if (!trait) return;
			if (fetched_trait) return;
			console.log('Happen');
			fetched_trait = await Api.get(
				'/programming_languages/' + language.id + '/traits/' + trait.id + '.json'
			);
			console.log(fetched_trait);
			fetched = true;
		}
	});

	let editorRef = null;

	let lineCount = 1;
	function handleEditorDidMount(editor, monaco) {
		// here is the editor instance
		// you can store it in `useRef` for further usage
		editorRef = editor;
		lineCount = editorRef.getModel().getLineCount();
		editorRef.updateOptions({ scrollBeyondLastLine: false });

		if (!$user) {
			editorRef.updateOptions({ readOnly: true });
		}
	}

	function handleEditorChange(value, event) {
		if (updateCode) {
			updateCode(value, language);
		} else {
			code = value;
		}

		lineCount = editorRef.getModel().getLineCount();
	}

	function updateHeight() {
		console.log('hiii');
	}

	let blocks = [];
	// console.log({ blocks });
	$: fullCode = blocks.map((b) => b.code).join('\n');
	$: console.log({ fullCode });

	function uuid() {
		const min = 100; // Minimum 3-digit number
		const max = 999; // Maximum 3-digit number

		let randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
		while (blocks.map((b) => b.id).includes(randomCode)) {
			randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
		}
		return randomCode;
	}

	function addBlock() {
		blocks = [
			...blocks,
			{
				code: '',
				id: uuid(),
				disabled: false
			}
		];
	}

	async function saveBlocks() {
		const response = await API.post('/language_algorithm_starters.json', {
			programming_language_id: language.id,
			algorithm_id: algorithm.id,
			code_lines: blocks
		});
		console.log({ response });
	}
</script>

{#if (!algorithm && trait) || (!algorithm && fetched_trait)}
	{#if fetched_trait}
		<div class="holder">
			<react:Editor
				height={lineCount * 18 + 18 + 'px'}
				defaultLanguage={language.editor_slug}
				onChange={handleEditorChange}
				defaultValue={fetched_trait.body}
				onMount={handleEditorDidMount}
				wordWrap={'on'}
				scrollBeyondLastLine={false}
				options={{
					minimap: { enabled: false }
				}}
			/>
		</div>
	{:else}
		<div class="holder">
			<react:Editor
				height={lineCount * 18 + 18 + 'px'}
				defaultLanguage={language.editor_slug}
				onChange={handleEditorChange}
				defaultValue={''}
				onMount={handleEditorDidMount}
				wordWrap={'on'}
				scrollBeyondLastLine={false}
				options={{
					minimap: { enabled: false }
				}}
			/>
		</div>
	{/if}
{:else if algorithm}
	<div class="holder">
		{#each blocks as block}
			<Block
				editable={1}
				{language}
				{block}
				update={(payload) => {
					// code = payload;
					console.log({ payload });
					console.log({ blocks });
					blocks = blocks.map((b, idx) => {
						if (b.id === block.id) {
							b.code = payload.code;
							b.disabled = payload.disabled;
						}
						return b;
					});
				}}
				removeCode={(payload) => {
					blocks = blocks.filter((b) => b.id !== payload.id);
				}}
			/>
		{/each}
	</div>

	{#if $user && $user.admin}
		<div class="btn btn-primary" on:click={addBlock}><i class="fa fa-plus" /></div>
		<div class="btn btn-outline-warning" on:click={saveBlocks}><i class="fa fa-save" /></div>
	{/if}
{/if}

{#if runnable}
	<div class="btn btn-info btn-block btn-lg" style="display:block;" on:click={test}>Run</div>

	{#if result}
		<div class="result">
			{@html result.output}
		</div>
	{/if}

	{#if error}
		<div class="error">
			Expecting: {algorithm.expected_with_type}
		</div>
	{/if}
{/if}

<style>
	.holder {
		padding: 12px;
		background: #fff;
	}
	.result {
		padding: 10px;
		font-size: 24px;
		background: purple;
		color: #fff;
	}

	.error {
		padding: 10px;
		font-size: 24px;
		background: rgb(190, 5, 5);
		color: #fff;
	}

	.result {
		padding: 10px;
		font-size: 24px;
		background: purple;
		color: #fff;
	}
</style>
