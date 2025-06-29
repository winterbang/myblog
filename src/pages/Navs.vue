<template>
  <div class="flex flex-row gap-4 items-start mt-4">
    <div class="sidebar card">
      <Tag
        v-for="(tag, index) in tags"
        :key="tag"
        @click="onTagClick()"
        :name="tag"
        :color="['primary', 'brown', 'green', 'yellow', 'red', 'blue'][index % 6]"
        :checked="index < 3"
      ></Tag>
    </div>
    <div class="navs-container card_light bokurano-border">
      <div v-for="nav in navs" :key="nav.href" class="nav-box">
        <a :href="nav.href" target="_blank" class="flex flex-col items-center gap-2">
          <img :src="nav.iconSrc" class="site-icon" :alt="nav.title" />
          <span>{{ nav.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";

const navs = ref([]);
fetch(`./data/navs.json`)
  .then((resp) => resp.json())
  .then((data) => {
    navs.value = data;
  });

const tags = computed(() => {
  const tgs = navs.value.reduce((result, item) => {
    result.push(...(item.tags || []));
    return result;
  }, []);
  return [...new Set(tgs)];
});

function onTagClick() {
  console.log("tag clicked");
}
</script>
<style scoped>
@reference "tailwindcss";
@config "../../tailwind.config.js";

.sidebar {
  @apply flex gap-2 flex-wrap w-1/4;
  .tag {
    @apply px-2 py-1 border rounded text-bookly-ink-300 border-bookly-primary-400;
  }
}
.navs-container {
  @apply flex flex-wrap gap-2 items-start w-3/4 p-4;

  .nav-box {
    max-width: 120px;
    @apply border border-slate-200 p-4 rounded-md inline-block;
    .site-icon {
      @apply w-8 h-8;
      & + span {
        @apply w-full text-sm text-ellipsis overflow-hidden text-nowrap;
      }
    }
  }
}
</style>
