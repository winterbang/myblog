<template>
  <div class="grid grid-cols-3 gap-4 px-4">
    <div
      v-for="i in 8"
      :key="i"
      class="flex flex-col gap-2 py-2 px-4 rounded-lg border border-slate-100"
      style=""
    >
      <a class="text-base">今天做了什么</a>
      <span class="text-sm"
        >主要说明angular是如何使用的，学习下angular的使用方法等等</span
      >
      <span class="flex gap-2 text-sm">
        <span v-for="i in 3" :key="i" class="px-2 border rounded">tag1</span>
      </span>
      <span class="text-slate-300 text-xs text-right">最近更新：2025/01/26</span>
    </div>
  </div>
</template>

<script setup>
fetch("/data/directoryStructure.json")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });
</script>

<style></style>
