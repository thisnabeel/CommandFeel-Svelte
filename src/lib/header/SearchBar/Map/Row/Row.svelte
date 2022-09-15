
<script>
    import {onMount} from "svelte";
    import axios from "axios";
    import { mapShown, selectedSkill } from "$lib/stores/main";

    export let skill;


    const handleSkillClick = async (id) => {
        const response = await axios.get("https://www.yasbahoon.com/skills/"+id+".json");
        selectedSkill.set(response.data);
        mapShown.set(false);
    }
</script>

<li abstra-count={skill.abstractions.length}>
    {#if skill.skill_id != null}
        <span on:click|once={handleSkillClick(skill.id)}>{skill.title}</span>
    {/if}
    {#each skill.skills as skill }
        <svelte:self skill={skill}/>
    {/each}
</li>

<style>
    li {
        margin-left: 10px;
        border-left: 6px solid #ffeaa7;
        font-size: 18px;
        /* border-bottom: 6px solid #f9ecc2; */
        margin-bottom: 0;
        padding-left: 12px;
        cursor: pointer;
    }

    li:hover {
        border-left: 6px #416FFF solid;
    }

    [abstra-count="0"] {
        color: #ccc;
    }
</style>