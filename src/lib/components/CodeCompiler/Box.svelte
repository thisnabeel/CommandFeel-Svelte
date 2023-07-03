<script>
	import Editor from '@monaco-editor/react';
	import { onMount } from 'svelte';
	import Api from '$lib/api/api';

	export let language;
	export let updateCode;
	export let trait;
	export let runnable = false;

	let fetched = false;
	export let fetched_trait = null;
	let result = null;
	let code = '';

	$: body = fetched_trait ? fetched_trait.body : null;

	async function test() {
		const response = await Api.post(`/execute_code`, {
			code: code,
			language: language.editor_slug
		});
		console.log(response);
		result = response;
	}

	onMount(async () => {
		if (!trait) return;
		if (fetched_trait) return;
		console.log('Happen');
		fetched_trait = await Api.get(
			'/programming_languages/' + language.id + '/traits/' + trait.id + '.json'
		);
		console.log(fetched_trait);
		fetched = true;
	});

	let editorRef = null;

	let lineCount = 1;
	function handleEditorDidMount(editor, monaco) {
		// here is the editor instance
		// you can store it in `useRef` for further usage
		editorRef = editor;
		lineCount = editorRef.getModel().getLineCount();
		editorRef.updateOptions({ scrollBeyondLastLine: false });

		if (fetched_trait) {
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
</script>

{#if fetched && trait}
	<div class="holder">
		<react:Editor
			height={lineCount * 18 + 'px'}
			defaultLanguage={language.editor_slug}
			onChange={handleEditorChange}
			defaultValue={body}
			onMount={handleEditorDidMount}
			wordWrap={'on'}
			scrollBeyondLastLine={false}
		/>
	</div>
{:else}
	<div class="holder">
		<react:Editor
			height={lineCount * 18 + 'px'}
			defaultLanguage={language.editor_slug}
			defaultValue={body}
			onChange={handleEditorChange}
			onMount={handleEditorDidMount}
			wordWrap={'on'}
			scrollBeyondLastLine={false}
		/>
	</div>
{/if}

{#if runnable}
	<div class="btn btn-info btn-block btn-lg" style="display:block;" on:click={test}>Test</div>

	{#if result}
		<div class="result">
			{@html result.output}
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

	.result {
		padding: 10px;
		font-size: 24px;
		background: purple;
		color: #fff;
	}
</style>
