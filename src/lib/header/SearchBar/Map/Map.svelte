<script>
    import { skillsMap } from "$lib/stores/main";
    import { get } from "svelte/store";
    import Row  from "./Row/Row.svelte";
    import { onMount } from "svelte";

    let storedSkillsMap;
    skillsMap.subscribe(value => {
        console.log("skillsMap", value)
        storedSkillsMap = value;
	});
</script>

{#each storedSkillsMap as skill }
    <ul>
        <Row skill={skill}></Row>
    </ul>
{/each}

<style>
    ul {
        list-style: none;
    }
</style> 