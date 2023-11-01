<script>
	import { user } from '$lib/stores/user';
	import Editor from '@monaco-editor/react';

	export let language;
	export let test_case;
	export let update;
	export let executions = null;

	let editorRef = null;
	let lineCount = 1;

	$: console.log({ executions });
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
		test_case.code = value;
		update(test_case);
		lineCount = editorRef.getModel().getLineCount();
	}

	$: console.log(test_case.code);
</script>

<div class="test_case_expanded">
	<label for="">Code:</label>
	<react:Editor
		height={lineCount * 18 + 'px'}
		defaultLanguage={language.editor_slug}
		wordWrap={'on'}
		scrollBeyondLastLine={false}
		automaticLayout={false}
		defaultValue={test_case.code}
		lineNumbers={'off'}
		onMount={handleEditorDidMount}
		onChange={handleEditorChange}
		options={{
			minimap: { enabled: false }
		}}
	/>

	<hr />

	<label for="">Expectation:</label>
	<input
		disabled={!$user || !$user.admin}
		type="text"
		class="form-control"
		bind:value={test_case.expectation}
		on:keyup={() => update(test_case)}
	/>

	{#if executions && executions[test_case.id]}
		<br />
		<li class="result">{@html executions[test_case.id].output}</li>
	{/if}
</div>

<style>
	.test_case_expanded {
		padding: 18px;
		display: block;
	}

	.result {
		padding: 18px 24px;
		background: #000;
		color: #fff;
		border-radius: 10px;
		font-size: 28px;
	}
</style>
