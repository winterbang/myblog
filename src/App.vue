<template>
  <header>
    <a class="text-2xl" href="/">Winter</a>
    <nav>
      <router-link
        v-for="nav in navs"
        :key="nav"
        :to="nav.path"
        :class="{ active: route.path === nav.path }"
      >
        {{ nav.title }}
      </router-link>
    </nav>
  </header>
  <main class="max-w">
    <router-view />
  </main>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import config from "./config";
const route = useRoute();

console.log(route);
const navs = ref(config.navs);
</script>

<style scoped>
header {
  @apply h-12 px-6 bg-orange-400 text-white text-center flex justify-between items-center;
}

nav {
  @apply flex gap-4;
}

.active {
  @apply text-cyan-300 text-base font-black;
}
</style>
