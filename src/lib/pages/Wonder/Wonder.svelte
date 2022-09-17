<script>
    import {onMount} from "svelte";
    import {api} from "$lib/stores/main.js";
    import axios from "axios";
    
    export let wonder;
    
    let prefix;
    api.subscribe(value => prefix = value);
    let skills = [];
    let wonders;


    const fetchWonder = async (wonder) => {

        skills = [];
        const response = await axios.get(prefix+"/wonders/"+wonder.id+".json");
        let data = response.data;


        skills = data.wonder_items.filter(item => item.wonderable_type == "Skill");
        console.log("skills", skills)
        // wonders = data.wonder_items.filter(item => item.wonderable_type == "Wonder");


    }
    onMount(async function(){
        fetchWonder(wonder);
    })
    


    $: {
        fetchWonder(wonder);
    }

    

    // https://yasbahoon.com/wonder_items/60.json


        
</script>

<section class="wrapper">
    <h1 class="title">{wonder.title}</h1>

    <section class="nested">
        <ul class="skills">
            <div class="nested-head">Skills</div>

            {#each skills as skill}
                <li>
                    <div class="title">{skill.wonderable.title}</div>
                    {#each skill.abstractions as applied}
                        <div class="abstraction">{applied.body}</div>
                    {/each}
                </li>
            {/each}
        </ul>
    </section>
</section>

<style>

    .title {
        /* padding: 40px 0px; */
    }
    .wrapper {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        
    }
    
    .nested {
        max-width: 350px;
        margin: 0 auto;
    }

    .nested .title {
        font-size: 32px;
    }

    .nested .abstraction {
        padding: 30px;
        border: 10px solid #E9ECEF;
        position: relative;
    }

    .nested-head {
        color: #ff78db;
        padding-bottom: 10px;
        border-bottom: 8px solid #fff1fb;
        text-align: center;
        font-size: 1.75rem;
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

    .nested > ul {
        list-style: none;
    }
    .abstractions > li {
        padding: 30px;
    }

</style>