<template>
  <div class="sticky top-0 z-10 mb-3" style="margin-top: 2px; z-index: 100">
    <header
      class="p-4 bokurano-border rounded-2xl flex justify-between items-center bg-bokurano-card"
      style="container-type: inline-size; container-name: hd-content"
    >
      <div
        class="text-xl font-bold text-bokurano-text-secondary flex items-center space-x-2"
      >
        <span>🍥</span>
        <a class="text-2xl font-courgette whitespace-nowrap" href="/">Blog By Winter</a>
      </div>
      <span :class="{ menu: true, open: menuOpen }" @click="menuOpen = !menuOpen">X</span>
      <!-- Desktop nav -->
      <ul class="flex space-x-4 text-base font-medium text-bokurano-text-primary">
        <li v-for="nav in navs" :key="nav.title">
          <router-link
            :to="nav.path"
            class="relative px-3 py-2 rounded-lg transition-all duration-200"
            :class="
              route.path === nav.path
                ? 'font-semibold bg-bokurano-accent text-bokurano-text-dark shadow-inner'
                : 'hover:bg-bokurano-primary-hover hover:shadow'
            "
          >
            {{ nav.title }}
            <span
              v-if="route.path === nav.path"
              class="absolute left-1/2 bottom-0 -translate-x-1/2 h-1 w-6 bg-bokurano-primary-dark rounded-full"
            ></span>
          </router-link>
        </li>
      </ul>
    </header>
  </div>
  <main class="main-container flex flex-col pb-5">
    <div class="max-w px-5 pb-8 grow-1">
      <router-view />
    </div>

    <Footer></Footer>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Footer from "./partials/Footer.vue";
import config from "./config";
const route = useRoute();
const navs = ref(config.navs);
const menuOpen = ref(false);
</script>

<style scoped lang="scss">
@reference "tailwindcss";
@config "../tailwind.config.js";

header {
  @apply mx-4;
  .hd-content {
    @apply h-[var(--hd-h)] px-4 flex justify-between items-center;
  }
}

nav {
  @apply flex gap-4 text-bookly-ink-200;
}

.min-h {
  display: flow-root;
  @apply min-h-[calc(100vh-75px-48px)];
}
.active {
  @apply text-bookly-accent-400 text-base font-black;
}

.menu {
  @apply text-2xl font-bold text-bokurano-text-secondary cursor-pointer;
  display: none;
}

@container hd-content (max-width: 746px) {
  .open + ul {
    display: flex;
  }
  ul {
    display: none;
    flex-direction: column;
    position: absolute;
    right: 16px;
    top: calc(100% - 8px);
    @apply gap-4 bg-bokurano-card rounded-lg shadow-lg text-bokurano-text-primary p-4 w-38;
    z-index: 10;
    li {
      @apply w-full;
      a {
        @apply inline-block w-full text-center;
      }
    }
  }
  .menu {
    display: block;
  }
}
</style>
