<script>
	import { skills, selectSkill, wonders, selectWonder } from '$lib/stores/main';
	import { goto } from '$app/navigation';
	import { algorithmStore } from '$lib/stores/algorithms/mapper';
	import { traitStore } from '$lib/stores/traits';

	let input;

	let showResults = false;

	let items;
	let results;
	let query = '';
	let select;

	export let type;

	if (type === 'Skills') {
		skills.subscribe((value) => {
			items = value.filter((item) => item.abstractions.length != 0 && item.skill_id != null);
		});
		select = selectSkill;
	} else if (type === 'Wonders') {
		wonders.subscribe((value) => {
			items = value.filter((item) => item.wonder_items != 0 && item.wonder_id != null);
		});
		select = selectWonder;
	} else if (type === 'Algorithms') {
		algorithmStore.subscribe((value) => {
			items = value.filter((a) => a.expected_with_type !== null);
		});
	} else if (type === 'Traits') {
		traitStore.subscribe((value) => {
			items = value;
		});
	}

	const handleInputClick = () => {
		if (query.length > 0) return;

		// console.log({ items });
		if (!items || items.length < 1) return;
		const min = Math.min(items.length + 1, 6);
		// console.log(min);
		// return;
		let randomItems = [];
		const uniqueItems = new Set();

		while (randomItems.length < min && uniqueItems.size < items.length) {
			const randomIndex = Math.floor(Math.random() * items.length);
			const randomElement = items[randomIndex];

			if (!uniqueItems.has(randomElement)) {
				randomItems.push(randomElement);
				uniqueItems.add(randomElement);
			}
		}

		showResults = true;
		results = Array.from(uniqueItems);
	};

	const search = (query) => {
		if (query.length > 0 && query.length < 2) {
			showResults = false;
		} else if (query.length > 1) {
			showResults = true;
			results = items.filter((item) => item.title.toUpperCase().indexOf(query.toUpperCase()) > -1);
			// if (results.length === 0) results = [{title: "Nothing Found!"}];
		}
	};

	const handleSelect = (item) => {
		goto(`/${type}/${item.slug}.json`);
	};

	$: {
		search(query);
	}
</script>

<div class="wrapper {type}">
	<input
		type="text"
		on:click={() => handleInputClick()}
		bind:value={query}
		on:blur={() =>
			setTimeout(function () {
				showResults = false;
			}, 50)}
		placeholder="Search {type}..."
	/>
	{#if results && showResults}
		<!-- <h1>PRESENT!</h1> -->
		<ul>
			{#each results as item}
				<li id={item.id}>
					<a href="/{type.toLowerCase()}/{item.slug || item.id}">{item.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
	}

	ul {
		padding: 10px;
		background: #fff;
		font-size: 22px;
		position: absolute;
		top: 78px;
		width: 100%;
		border: 2px solid #5f4a4a;
		z-index: 999;
		list-style: none;
	}

	@media (max-width: 480px) {
		ul {
			width: 95vw;
		}

		.Wonders ul {
			position: absolute;
			left: -12px;
		}

		.Skills ul {
			position: absolute;
			right: -12px;
		}
	}

	ul li {
		padding: 10px;
		border-bottom: 1px solid #ccc;
		position: relative;
	}

	ul li:hover {
		background-color: #ffffc7;
	}

	input {
		padding: 20px;
		font-size: 24px;
		border: 1px solid #e9e1e2;
		margin-bottom: 10px;
		background: #efefef;
		width: 100%;
		font-family: 'GreycliffCF-Bold';
	}

	input:hover {
		background: #eaf7ff;
	}
</style>
