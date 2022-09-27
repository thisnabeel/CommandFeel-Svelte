<script>
    import {onMount, beforeUpdate} from "svelte";    

    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';
    import Api from "$lib/api/api.js";

    import Skill from "$lib/pages/Skill.svelte";
    // import { navigating } from '$app/stores';

    let skill;
    let changedSlug;

    onMount(async function(){
        skill = await Api.get("/skills/"+$page.params.slug+".json");
    });

    afterNavigate(async function(){
        fetchSkill($page.params.slug)
    });

    const fetchSkill = async (slug) => {
        skill = await Api.get("/skills/"+slug+".json");
        console.log('gotten', skill)
    }
</script>

{#if skill}
    <Skill skill={skill}></Skill>
{/if}