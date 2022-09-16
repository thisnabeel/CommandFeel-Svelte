<script>
    import {onMount} from "svelte";


    $: console.log(wonder);
    export let wonder;

    // https://yasbahoon.com/wonder_items/60.json

    let skills;

        
</script>

<section class="wrapper">
    <h1 class="title">{wonder.title}</h1>

    <ul class="skills">
        {#each wonder.wonder_items.filter((item) => item.wonderable_type === "Skill") as skill}
            <!-- {skill.id} -->
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

</style>