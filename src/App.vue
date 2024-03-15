<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" style="max-height: 10rem" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="foo__bar">Home</RouterLink>
        <RouterLink to="/about" class="foo">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <SiteFooter/>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import {defineComponent} from "vue";
  import SiteFooter from "@/components/SiteFooter.vue";

  export default {
    name: "App",
    components: {SiteFooter}
  }
</script>
