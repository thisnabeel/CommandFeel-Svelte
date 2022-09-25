<script>
    export let icon;
    export let bg = "#fff";
    export let img = null;
    export let href = "#";

    console.log("img", img)
</script>

    <a class="user-avatar nav-circle hvr-grow cursor clean-a" href="{href}" style="background: {bg}">
        {#if icon}
            <div class="fa {icon}" aria-hidden="true"></div>
        {:else if img}
            <img src="{img}" alt="">
        {/if}
    </a>

<style>
    .user-avatar .fa {
        top: 25%;
        left: 30%;
        font-size: 20px;
        color: #97b1ff;
        position: absolute;
    }

    img {
        position: absolute;
    }

    .nav-circle {
        position: fixed;
        border-radius: 100%;
        height: 50px;
        width: 50px;
    }

    .hvr-grow {
        display: inline-block;
        vertical-align: middle;
        transform: perspective(1px) translateZ(0);
        box-shadow: 0 0 1px rgb(0 0 0 / 0%);
        transition-duration: 0.3s;
        transition-property: transform;
    }
</style>