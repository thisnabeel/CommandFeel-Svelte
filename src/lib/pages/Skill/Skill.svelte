<script>
    import {onMount} from "svelte";

    
    export let skill;
        
</script>

<section class="wrapper">
    <h1>{skill.title}</h1>

    <ul class="abstractions">
        {#each skill.abstractions as abstraction}
            <li>
                {abstraction.body}
            </li>
        {/each}
    </ul>
</section>

<style>

    .wrapper {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
    }

    .abstractions {
        background-color: #ffd67f;
        padding: 30px;
        font-size: 24px;
        color: #000;
        position: relative;
        margin: 10px;
        text-align: left;
        list-style: none;
    }

</style>