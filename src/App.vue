<template>
  <SiteNav/>

  <RouterView />

  <SiteFooter/>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import {defineComponent} from "vue";
  import SiteFooter from "@/components/SiteFooter.vue";
  import SiteNav from "@/components/SiteNav.vue";

  export default {
    name: "App",
    components: {SiteNav, SiteFooter}
  }
</script>
