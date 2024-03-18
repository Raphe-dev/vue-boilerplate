<template>
  <nav class="nav">
    <div>
      <RouterLink to="/" class="foo__bar">Home</RouterLink>
      <RouterLink to="/about" class="foo">About</RouterLink>
    </div>

    <div @click="menuOpen = !menuOpen">
      |||
    </div>
  </nav>

  <div class="nav-menu" :class="{'-open': menuOpen}">
    <div class="nav-menu__content">
      <span>Menu</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "SiteNav",
  data() {
    return {
      menuOpen: false,
      sticky: false
    }
  }
}

</script>
