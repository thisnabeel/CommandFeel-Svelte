<script>
    import Button from "./Button.svelte"
    import MediaQuery from "$lib/MediaQuery/MediaQuery.svelte"
</script>

<MediaQuery query="(min-width: 400px)" let:matches>
    {#if matches}
    <aside class="user">
        <Button icon="fa-user" href="/sign_in">
            
        </Button>
    </aside>

    <aside class="book">
        <Button icon="fa-book"></Button>
    </aside>

    <aside class="news">
        <Button icon="fa-newspaper"></Button>
    </aside>

    <aside class="garage">
        <Button img="icons/garage.png" bg="#e53935"></Button>
    </aside>
    {/if}
</MediaQuery>

<style>
    aside {
        cursor: pointer;
        position: absolute;
    }
    .user {
        top: 40px;
        right: 145px;
    }

    .book {
        top: 40px;
        right: 80px;
    }

    .news {
        top: 40px;
        left: 28px;
    }

    .garage {
        bottom: 80px;
        left: 28px;
    }

    .garage :global(img) {
        width: 30px;
        top: 13px;
        left: 10px;
    }
</style>