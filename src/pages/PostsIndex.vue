<template>
  <div class="flex gap-2 p-2 my-2 border-2 rounded-xl">
    <span
      v-for="tag in tags"
      :key="tag"
      :class="{ 'text-indigo-700': activeTag === tag }"
      class="cursor-pointer"
      @click="activeTag = tag"
    >
      {{ tag }}
    </span>
  </div>

  <div class="grid grid-cols-3 gap-4 px-4">
    <div
      v-for="post in displayPosts"
      :key="post.file_name"
      class="flex flex-col gap-2 py-2 px-4 rounded-lg border border-slate-100"
      style=""
    >
      <router-link :to="`/${dir}/${post.file_name}`" class="text-base break-words">
        {{ post.meta.title }}
      </router-link>
      <span class="text-base">{{ post.meta.description }}</span>
      <span class="flex gap-2 text-sm">
        <span v-for="tag in post.meta.tags" :key="tag" class="px-2 border rounded">
          {{ tag }}
        </span>
      </span>
      <span class="text-slate-300 text-xs text-right">
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
  activeTag.value = newVal[0];
});

const displayPosts = computed(() => {
  return posts.value.filter((item) => {
    return item.meta.tags?.includes(activeTag.value);
  });
});
</script>

<style></style>
