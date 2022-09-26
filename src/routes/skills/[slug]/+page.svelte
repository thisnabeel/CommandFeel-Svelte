<script>
    import {onMount} from "svelte";    
    
    import { openModal } from 'svelte-modals';
    import SkillModal from "$lib/modals/videos/skill.svelte";
    import {skills} from "$lib/stores/main";

    import { page } from '$app/stores';
    import { navigating, updated } from '$app/stores';

    import {user} from "$lib/stores/user";

    let skill;
    let slug;

    $: slug = $page.params.slug;
    $: skill = $skills.filter(item => item.slug === slug)[0];


    function openSkillVideo(skill, abstraction){
        openModal(SkillModal, { skill: skill, abstraction: abstraction});
    }

    let html;
    $: console.log(html);

    $: console.log($user);
</script>

<section class="wrapper">
    {#if skill}
        <h1 class="title">{skill.title}</h1>

        <ul class="abstractions">
            {#each skill.abstractions as abstraction}
                <li>
                    {#if $user.admin === true}
                        <span contenteditable bind:innerHTML={html}>{abstraction.body}</span>
                    {:else}
                        <span>{abstraction.body}</span>
                    {/if}
                    <div class="abstra-play" on:click={openSkillVideo(skill, abstraction)} >
                        <img class="abstra-preview" src="{abstraction.preview}" />
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</section>

<style>

    .title {
        padding: 40px 0px;
    }
    .wrapper {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        position: relative;
    }

    .abstractions {
        background-color: #ffd67f;
        font-size: 24px;
        color: #000;
        position: relative;
        margin: 10px;
        text-align: left;
        list-style: none;
        width: 70%;
        margin: 0 auto;
        padding: 20px 0;
    }

    .abstractions > li {
        padding: 30px;
    }

    .abstra-play {
        position: absolute;
        right: -82px;
        top: 25%;
        cursor: pointer;
        width: 130px;
    }   

    .abstra-play img {
        max-width: 100%;
    }

    .abstra-preview {
        position: absolute;
        top: 17%;
        max-width: 200px;
        z-index: 100;
    }

    @media (max-width: 480px) {
		.abstra-play {
            position: absolute;
            right: 0;
            left: 0;
            margin: 0 auto;
            top: -5%;
            cursor: pointer;
            width: 130px;
        }

        .abstractions {
            width: 100%;
        }

        .abstractions > li { 
            padding-top: 55px;
        }
	}

</style>