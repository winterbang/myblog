<template>
  <b-nav :items="tags" v-model="activeTag"></b-nav>

  <div class="posts-wrraper">
    <div v-for="post in displayPosts" :key="post.file_name" class="post-box">
      <router-link
        :to="`/${dir}/${post.file_name}`"
        class="text-base break-words text-bokurano-text-dark"
      >
        {{ post.meta.title }}
      </router-link>
      <span
        class="text-sm text-bokurano-text-secondary py-2"
        v-if="post.meta.description"
      >
        {{ post.meta.description }}
      </span>
      <span class="flex gap-2 text-sm">
        <span v-for="tag in post.meta.tags" :key="tag" class="px-2 border rounded">
          {{ tag }}
        </span>
      </span>
      <span
        class="text-bokurano-text-secondary text-xs text-right"
        style="margin-top: auto"
      >
        最近更新：{{ post.updatedAt }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const posts = ref([]);
const activeTag = ref("");

const dir = route.name.toLowerCase();
fetch(`./data/${route.name.toLowerCase()}.json`)
  .then((resp) => resp.json())
  .then((data) => {
    posts.value = data;
  });

const tags = computed(() => {
  const tgs = posts.value.reduce((result, item) => {
    result.push(...(item.meta.tags || []));
    return result;
  }, []);
  return [...new Set(tgs)];
});

watch(tags, (newVal) => {
  activeTag.value = newVal[1];
});

const displayPosts = computed(() => {
  return posts.value.filter((item) => {
    return item.meta.tags?.includes(activeTag.value);
  });
});
</script>

<style scoped>
@reference "tailwindcss";
@config "../../tailwind.config.js";

.tags-wrraper {
  @apply flex gap-2 py-2 px-4 my-2 border-2 rounded-xl;
}

.posts-wrraper {
  --grid-cols: repeat(auto-fit, minmax(256px, 1fr));
  @apply grid grid-cols-(--grid-cols) gap-4 px-4 flex-wrap;
  .post-box {
    @apply flex flex-col py-2 px-4 rounded-lg border border-slate-300;
  }
}
</style>
>
