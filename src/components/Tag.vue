<template>
  <span
    class="tag-item px-3 py-1 rounded-full text-sm"
    :class="{ active: checked, [color]: true }"
  >
    <span v-if="checked" class="tag-check">✓</span>{{ name }}
  </span>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "primary",
  },
});
</script>

<style scoped>
@reference "tailwindcss";
@config "../../tailwind.config.js";
/* 标签样式 */
.tag-item {
  @apply cursor-pointer relative transition-all duration-250 
         border-2 border-transparent inline-flex items-center gap-1
         hover:translate-y-[-2px];
}
.tag-item.active {
  @apply border-2 border-bokurano-primary-dark font-semibold 
         shadow-[1px_1px_0px_rgba(0,0,0,0.1)];
}
.tag-check {
  @apply opacity-0 w-0 overflow-hidden transition-all duration-200;
}
.tag-item.active .tag-check {
  @apply opacity-100 w-4 -ml-1;
}

.primary {
  @apply bg-bokurano-primary text-bokurano-text-dark;
}
.brown {
  @apply bg-bokurano-tag-brown-bg text-bokurano-tag-brown-text;
}
.green {
  @apply bg-bokurano-tag-green-bg text-bokurano-tag-green-text;
}
.yellow {
  @apply bg-bokurano-tag-yellow-bg text-bokurano-tag-yellow-text;
}
.red {
  @apply bg-bokurano-tag-red-bg text-bokurano-tag-red-text;
}
.blue {
  @apply bg-bokurano-tag-blue-bg text-bokurano-tag-blue-text;
}
</style>
