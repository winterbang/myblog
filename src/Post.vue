<template>
  <div v-if="md" class="page">
    <p class="title">{{ meta.title }}</p>
    <div v-html="md" class="markdown-body"></div>
  </div>
  <div v-else>好像迷路了</div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import { parseFrontmatter } from "./utils";

const route = useRoute();

const path = route.params.post;
const md = ref("");
const meta = ref({});

fetch(`./posts/${path.join("/")}`)
  .then((resp) => {
    const contentType = resp.headers.get("Content-Type");
    return contentType.includes("text/markdown") ? resp.text() : "";
  })
  .then((data) => {
    const { frontmatter, markdown } = parseFrontmatter(data);
    const html = marked.parse(markdown);
    md.value = html;
    meta.value = frontmatter;
  });
</script>

<style scoped>
@reference "tailwindcss";

.page {
  @apply p-4 my-4 rounded-xl shadow-lg bg-slate-100;
}
.title {
  @apply text-3xl text-slate-950	font-black text-center break-all py-4;
}
</style>
