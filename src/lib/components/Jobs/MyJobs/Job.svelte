<script>
	import Tester from '$lib/components/Tester/Tester.svelte';

	export let job;
	export let destroyJob;

	let isOpen = false;
	let activeTab = 0;
	let jobSkills = [];
</script>

<li class="job" class:open={isOpen}>
	<div class="head" on:click={() => (isOpen = !isOpen)}>
		{job.title} <br /><small>@ {job.company}</small>
	</div>
	<i class="fa fa-trash remove-job" on:click={() => destroyJob(job.id)} />

	{#if isOpen}
		<div class="content">
			<div class="lil-nav">
				<div on:click={() => (activeTab = 0)} class:activeTab={activeTab === 0}>
					Job Description
				</div>
				<div on:click={() => (activeTab = 1)} class:activeTab={activeTab === 1}>Test</div>
			</div>

			{#if activeTab === 0}
				<div class="jd">{@html job.jd}</div>
			{/if}

			{#if activeTab === 1}
				<Tester {jobSkills} />
				<!-- <div class="jd">{@html job.jd}</div> -->
			{/if}
		</div>
	{/if}
</li>

<style>
	.lil-nav {
		display: flex;
		margin: 1em;
	}
	.lil-nav div {
		flex: 1 1 50%;
		text-align: center;
		font-size: 32px;
		padding: 1em;
	}

	.lil-nav .activeTab {
		background-color: rgb(113, 4, 113);
		color: #fff;
	}
	.jd {
		padding: 2em;
	}
	.remove-job {
		position: absolute;
		left: -30px;
		top: 10px;
	}

	.job .head {
		padding: 22px;
		font-size: 24px;
		display: block;

		cursor: pointer;
	}

	.job .head:hover {
		background: #1be8f1;
	}

	.job.open .head {
		background: #000;
		color: #fff;
	}
	.job {
		position: relative;
		border: 4px solid rgb(22, 22, 22);
		display: block;
		margin: 0 auto;
		margin-bottom: 10px;
		max-width: 450px;
	}

	.job.open {
		max-width: 100%;
	}
</style>
