<script lang="ts">
  import Settings from "./lib/settings.svelte";
  import { active } from "./store.js";
  import Navigation from "./lib/navigation.svelte";
  import Main from "./lib/main.svelte";
</script>

<main>
  <Navigation />
  <div class="grid no-space responsive no-margin">
    {#if $active}
      {#if $active === "settings"}
        <Settings />
      {/if}
      {#if $active === "movies"}
       <Main/>
      {/if}
    {/if}
  </div>
</main>

<style>
  main {
    height: 100vh;
  }
</style>
