<script>
    import { skillsMap, wondersMap } from "$lib/stores/main";
    import { get } from "svelte/store";
    import Row  from "./Row/Row.svelte";
    import { onMount } from "svelte";

    let storedSkillsMap;
    skillsMap.subscribe(value => {
        // console.log("skillsMap", value)
        storedSkillsMap = value;
    });
    
    let storedWondersMap;
    wondersMap.subscribe(value => {
        console.log("wondersMap", value)
        storedWondersMap = value;
    });
    
    let show = "skills";

    const handleToggleView = (target) => {
        show = target;
    }

    $: console.log(show)
</script>


{#if show === "skills"}
    <button on:click={() => handleToggleView("wonders")}>Show Wonders?</button>
    {#each storedSkillsMap as skill }
        <ul>
            <Row item={skill} type="skill"></Row>
        </ul>
    {/each}
{/if}

{#if show === "wonders"}
    <button on:click={() => handleToggleView("skills")}>Show Skills?</button>
    {#each storedWondersMap as wonder }
        <!-- {console.log("selectedWonder", wonder)} -->
        <ul>
            <Row item={wonder} type="wonder"></Row>
        </ul>
    {/each}
{/if}

<style>
    ul {
        list-style: none;
    }
</style> 