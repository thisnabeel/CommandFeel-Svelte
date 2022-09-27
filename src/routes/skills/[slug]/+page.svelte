<script>
    import {onMount} from "svelte";    
    
    import { openModal } from 'svelte-modals';
    import SkillModal from "$lib/modals/videos/skill.svelte";
    import {skills} from "$lib/stores/main";

    import { page } from '$app/stores';
    import { navigating, updated } from '$app/stores';
    import Api from "$lib/api/api.js";

    import {user} from "$lib/stores/user";

    import Abstraction from "$lib/components/Abstraction/Abstraction.svelte";

    let skill;
    let data;
    let slug;
    

    // $: slug = $page.params.slug;
    $: {
        slug = $page.params.slug;
        fetchSkill(slug);
    }


    const fetchSkill = async (slug) => {
        skill = await Api.get("/skills/"+slug+".json");
    }

    function openSkillVideo(skill, abstraction){
        openModal(SkillModal, { skill: skill, abstraction: abstraction});
    }

    const addAbstraction = async () => {
        const response = await Api.post("/abstractions.json", {
            skill_id: skill.id
        })
        console.log(response);
        fetchSkill();
    }


    // $: console.log($user);
</script>

<section class="wrapper">
    {#if skill}
        <h1 class="title">{skill.title}</h1>

        

        <ul class="abstractions">
            {#if $user && $user.admin}
                <div class="add-abstraction" on:click={addAbstraction}>+</div>
            {/if}
            {#each skill.abstractions as abstraction}
                <li>
                    <Abstraction skill={skill} user={$user} refresh={() => fetchSkill()} abstraction={abstraction}></Abstraction>
                </li>
            {/each}
        </ul>
    {/if}
</section>

<style>

    .add-abstraction {
        font-size: 72px;
        position: absolute;
        right: 50%;
        display: inline;
        height: 0px;
        color: #ffd67f;
        width: 0px;
        bottom: 22%;
    }

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
        margin-bottom: 10px;
        background: #ffd67f;
    }
    @media (max-width: 480px) {
        .abstractions {
            width: 100%;
        }

        .abstractions > li { 
            padding-top: 55px;
        }
	}

</style>