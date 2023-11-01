<script>
	import API from '$lib/api/api';
	import debounce from '$lib/functions/debounce';
	import { set, test } from 'ramda';
	import Tab from './Tab.svelte';

	export let language;
	export let starter;
	export let testNow;

	export let blocks;

	import Expanded from './Expanded.svelte';
	import { writable } from 'svelte/store';
	import { user } from '$lib/stores/user';

	// Create a writable store for testing array
	const testing = writable([]);

	let execution = {};

	async function addTestCase() {
		if (!starter) return;
		const res = await API.post('/test_cases', {
			language_algorithm_starter_id: starter.id,
			code: '',
			expectation: '',
			position: starter.test_cases.length + 1
		});
		starter.test_cases = [...starter.test_cases, res];
	}

	let activeTestCase = -1;

	async function handleUpdate(payload) {
		console.log({ payload });
		const res = await debounce(`/test_cases/${payload.id}`, payload);

		starter.test_cases = starter.test_cases.map((t) => {
			if (t.id === res.id) {
				t = res;
			}
			return t;
		});

		console.log(starter.test_cases);
	}

	async function beginTest() {
		console.log('Starting', $testing);
		testing.set([...starter.test_cases]);

		// return;
		while ($testing.length > 0) {
			await testCase($testing[0]); // Use the first element
			// Update the store to trigger reactivity
			$testing.shift(); // Remove the first element
			testing.set([...$testing]);
		}

		console.log('DONE', $testing);
	}

	function fullCode(test_case) {
		return blocks
			.map((b) => {
				if (b.prefix_test) {
					return [test_case.code, b.code].join('\n');
				} else {
					return b.code;
				}
			})
			.join('\n');
	}

	async function testCase(test_case) {
		try {
			const res = await API.post(`/test_cases/${test_case.id}/execute.json`, {
				code: fullCode(test_case)
			});

			// Handle the response here if needed
			// console.log({ res });

			// Update the state
			execution[test_case.id] = res;
			execution = execution;
			console.log({ execution });

			// Await closeExecution to ensure it's complete before moving on
			// await closeExecution(test_case);
		} catch (error) {
			console.error('Error executing test case:', error);
		}
	}

	function closeExecution(test_case) {
		console.log(`Test Case ${test_case.id} Executed`);
		const index = testing.findIndex((t) => t.id === test_case.id);

		if (index !== -1) {
			testing.splice(index, 1);
		}

		console.log({ testing });

		// Returning a resolved promise to ensure it can be awaited
		return Promise.resolve();
	}

	$: if (testNow && testNow > 0) {
		beginTest();
	}
</script>

{#if starter && starter.test_cases}
	{#each starter.test_cases as test_case, index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->

		<Tab
			{test_case}
			{activeTestCase}
			executing={$testing}
			index={index + 1}
			select={() => {
				activeTestCase = test_case.id;
			}}
			executions={execution}
		/>
	{/each}
	{#if $user && $user.admin}
		<div class="btn btn-outline-primary" on:click={addTestCase}><i class="fa fa-plus" /></div>
	{/if}

	{#if activeTestCase > -1}
		{#key activeTestCase}
			<Expanded
				test_case={starter.test_cases.find((t) => t.id === activeTestCase)}
				{language}
				update={handleUpdate}
				executions={execution}
			/>
		{/key}
	{/if}
{/if}

<style>
	.test_case_expanded {
		padding: 18px;
		display: block;
	}
</style>
