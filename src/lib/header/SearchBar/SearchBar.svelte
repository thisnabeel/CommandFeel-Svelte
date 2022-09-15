<script>
  import Fa from 'svelte-fa'
  import { faMap } from '@fortawesome/free-solid-svg-icons'

  import { onMount } from "svelte";
  import axios from "axios";

  import Map from "./Map/Map.svelte";
  
  import {skills, skillsMap, mapShown} from "$lib/stores/main"
  
  const endpoint = "https://www.yasbahoon.com/cached_skills";
  
  let mapToggle;
  mapShown.subscribe(value => {
    mapToggle = value;
  })

  const toggleMap = () => {
    console.log("ms", mapToggle)
    mapShown.set(!mapToggle);
  }

  onMount(async function () {
    const response = await axios.get(endpoint);

    let json = response.data;

    skills.set(json);

    let parents = json.filter((obj) => {
        return obj.skill_id === null;
    });

    parents.map((skill, index) => {
        // Connect each Child to Parent
        connectChildToParent(skill);
    });

    function connectChildToParent(skill) {
        let children = json.filter((obj) => {
        return obj.skill_id === skill.id;
        });
        skill["skills"] = children;
        skill["skills"].map((skill, index) => {
        // Connect each Child to Parent
        console.log(skill.title);
        });

        skill["skills"].map((skill, index) => {
        // Connect each Child to Parent
        connectChildToParent(skill);
        });
    }
    
    skillsMap.set(parents);
  });

</script>

    <div class="row">
      <div class="searcher">
        <div class="cta-search">
          <u>Applied</u> phenomenons
        </div>
        <input type="text" placeholder="Search Wonders..." />
      </div>
        <div
          class="show-whole-map maps-btn hvr-bob-anyways"
           on:click={toggleMap}
        >
          <Fa icon={faMap} />
        </div>

      <div class="searcher">
        <div class="cta-search">
          <u>Raw</u> phenomenons
        </div>
        <input type="text" placeholder="Search Skills..." />
      </div>

    </div>

    {#if mapToggle}
      <Map></Map>
    {/if}

<style>
input {
  padding: 20px;
  font-size: 24px;
  border: 1px solid #e9e1e2;
  margin-bottom: 10px;
  background: #efefef;
  width: 100%;
  font-family: "GreycliffCF-Bold";
}

.row {
  display: flex;
}
.row .searcher {
  flex: 1 1 35%;
  padding-right: 15px;
  padding-left: 15px;
}

.row .show-whole-map {
    flex: 0 0 16.6666666667%;
  max-width: 16.6666666667%;
}

input:hover {
  background: #eaf7ff;
}

.cta-search {
  position: absolute;
  top: -21px;
  /* left: 30px; */
  margin: 0 auto;
  font-size: 14px;
  color: #e54745;
  font-family: "sf";
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.searcher {
  position: relative;
}

.show-whole-map {
  zoom: 1;
  padding: 2px 0px;
  height: 49px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  /* font: bold 13px arial, helvetica, sans-serif; */
  text-decoration: none;
  white-space: nowrap;
  text-align: center;
  font-size: 34px;
  color: #416fff;
  background-color: #ddd;

  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  border-radius: 6px;
  box-shadow: 0 1px 0 rgb(0 0 0 / 30%), 0 2px 2px -1px rgb(0 0 0 / 50%),
    0 1px 0 rgb(255 255 255 / 30%) inset;
  text-shadow: 0 1px 0 rgb(255 255 255 / 90%);

  transition: background-color 0.2s ease-out;
  background-clip: padding-box;
  
}

</style>