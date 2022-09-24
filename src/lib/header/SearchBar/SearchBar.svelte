<script>
  import Fa from 'svelte-fa'
  import { faMap } from '@fortawesome/free-solid-svg-icons'

  import { onMount } from "svelte";
  import axios from "axios";

  import "./hover.module.css";

  import Map from "./Map/Map.svelte";
  
  import {skills, skillsMap, wonders, wondersMap, mapShown, api} from "$lib/stores/main";

  import { Col, Container, Row, Styles } from 'sveltestrap';
  import Input from './Input/Input.svelte';
  import { subscribe } from 'svelte/internal';
  
  
  let mapToggle;
  mapShown.subscribe(value => {
    mapToggle = value;
  })

  const toggleMap = () => {
    console.log("ms", mapToggle)
    mapShown.set(!mapToggle);
  }

  onMount(async function () {
    getSkills()
    getWonders()
  });

  let prefix;
  api.subscribe((value) => prefix = value)

  const getSkills = async () => {
    const endpoint = prefix+"/cached_skills.json";
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
        connectChildToParent(skill);
        });
    }
    console.log("skills", parents)
    skillsMap.set(parents);
  }

  const getWonders = async () => {
    const endpoint = prefix+"/cached_wonders.json";
    const response = await axios.get(endpoint);
    let json = response.data;
    wonders.set(json);
    let parents = json.filter((obj) => {
        return obj.wonder_id === null;
    });
    console.log("wokring", 3)
    parents.map((wonder, index) => {
        // Connect each Child to Parent
        connectChildToParent(wonder);
    });
    function connectChildToParent(wonder) {
        let children = json.filter((obj) => {
          return obj.wonder_id === wonder.id;
        });
        wonder["wonders"] = children;
        wonder["wonders"].map((wonder, index) => {
        // Connect each Child to Parent
        connectChildToParent(wonder);
        });
    }

    // console.log("wonders", parents.filter(wonder => wonder.wonders.length !== 0))
    // parents.filter(wonder => wonder.wonders.length !== 0)
    wondersMap.set(parents);
  }

</script>
<Styles />

<Container>
  <Row>
    
    <Col lg="5" style="position: relative;">
      <div class="cta-search">
        <u>Applied</u> phenomenons
      </div>
      <Input type="Wonders"/>
    </Col>
    <Col lg="2">
      <div
        class="show-whole-map maps-btn hvr-bob-anyways"
          on:click={toggleMap}
      >
        <Fa icon={faMap} />
      </div>
    </Col>
    <Col lg="5" style="position: relative;">
      <div class="cta-search">
        <u>Raw</u> phenomenons
      </div>
      <Input type="Skills"/>
    </Col>
    
  </Row>
</Container>

    {#if mapToggle}
      <Map></Map>
    {/if}

<style>
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
  height: 72%;
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