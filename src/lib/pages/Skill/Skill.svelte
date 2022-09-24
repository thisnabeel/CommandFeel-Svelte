<script>
    import {onMount} from "svelte";    
    export let skill;
    import { openModal } from 'svelte-modals';
    import SkillModal from "$lib/modals/videos/skill.svelte";

    function openSkillVideo(skill, abstraction){
        openModal(SkillModal, { skill: skill, abstraction: abstraction});
    }
</script>

<section class="wrapper">
    <h1 class="title">{skill.title}</h1>

    <ul class="abstractions">
        {#each skill.abstractions as abstraction}
            <li>
                <span>{abstraction.body}</span>
                <div class="abstra-play" on:click={openSkillVideo(skill, abstraction)} >
                    <img class="abstra-preview" src="{abstraction.preview}" />
                </div>
            </li>
        {/each}
    </ul>
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

</style>