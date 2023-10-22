<script>
	import API from '$lib/api/api';
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import FullGallery from './FullGallery.svelte';
	import BySkills from './BySkills.svelte';
	import { page } from '$app/stores';
	import { openModal } from 'svelte-modals';
	import SubmitterModal from '$lib/modals/projects/submitter.svelte';
	import EditModal from './Avatar/EditModal.svelte';
	let proofs = [];
	let projects = [];

	const tabs = ['Full Gallery', 'By Skills'];
	let selectedTab = tabs[0];
	let pageUser;

	onMount(async () => {
		findUser();
		const res = await API.post('/proofs/find', {
			username: $page.params.username
		});
		console.log({ res });
		proofs = res.proofs.filter((p) => p.challenge);
		projects = res.projects;
	});

	function removeProof(id) {
		console.log('hiii', id);
		console.log({ proofs });
		proofs = proofs.filter((p) => p.id !== id);
	}

	function removeProject(id) {
		projects = projects.filter((p) => p.id !== id);
	}

	async function findUser() {
		pageUser = await API.post('/users/find_by_username', {
			username: $page.params.username
		});
	}

	// $: skills = proofs
	// 	.map((item) => item.challenge?.challengeable?.title)
	// 	.concat(projects.map((project) => project.skills.map((skill) => skill.title)));
	// $: displayName = $user ? $user.username : '';
	// let editable = false;
</script>

<svelte:head>
	<title>@{$page.params.username}</title>
	<meta name="description" content="commandfeel" />
</svelte:head>

{#if pageUser}
	<div class="portfolio">
		<div class="avatar" style="position:relative; width:max-content">
			<img style="width: 150px" src={pageUser.avatar_cropped_url} alt="" class="avatar" />
			{#if $user && $page.params.username === $user.username}
				<i
					class="fa fa-pen"
					on:click={() => {
						openModal(EditModal, {});
					}}
					style="position: absolute; top: 0px; right: -10px; background-color: #fff; padding:10px; border-radius: 100%; text-align: center;"
				/>
			{/if}
		</div>
		<h1 class="username">@{$page.params.username}</h1>

		<!-- <hr />
		<div class="skills clean-list">
			{#each skills as skill}
				<li>{skill}</li>
			{/each}
		</div>
		<hr /> -->

		<div class="portfolio-top-nav">
			{#each tabs as tab}
				<span class:activeTab={tab === selectedTab} on:click={() => (selectedTab = tab)}>{tab}</span
				>
			{/each}
		</div>

		{#if $user && $page.params.username === $user.username}
			<div
				class="btn btn-outline-warning"
				on:click={() => {
					openModal(SubmitterModal, {});
				}}
			>
				Add Project
			</div>
		{/if}

		{#if selectedTab === 'Full Gallery'}
			<FullGallery {proofs} {projects} {removeProof} />
		{/if}

		{#if selectedTab === 'By Skills'}
			<BySkills {proofs} {projects} {removeProof} />
		{/if}
		<br />
	</div>
{/if}

<style>
	.portfolio-top-nav {
		margin: 50px;
		text-align: center;
		margin-top: 24px;
	}
	.activeTab {
		background-color: #f2f272;
	}

	.portfolio-top-nav .activeTab {
		border-bottom: 1px dashed #eefe70;
	}
	.portfolio-top-nav span {
		padding: 10px;
	}
	.username {
		color: #1866e9;
		text-align: center;
		padding-top: 20px;
		margin-bottom: 0px;
	}
	.skills {
		max-width: 350px;
		margin: 4px auto;
	}
	.skills li {
		display: inline;
		font-size: 24px;
		margin: 8px;
		padding: 12px;
		/* background-color: rgb(255, 232, 193); */
		border-radius: 10px;

		color: #fff;
		background-color: rgb(45 103 111);
	}

	.portfolio {
		color: #191818;
		background: #fff;
		padding: 30px;
		border-radius: 10px;
		margin-bottom: 1em;
	}

	.avatar {
		border-radius: 100%;
		margin: 0 auto;
		display: block;
	}

	@media (max-width: 480px) {
		.portfolio {
			padding: 10px;
			margin: 10px;
		}
	}
</style>
