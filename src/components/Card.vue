<template>
  <div
    class="max-w-sm mx-auto bg-bokurano-card rounded-2xl shadow-inner p-6 text-bokurano-text-dark space-y-4 border border-bokurano-border"
  >
    <div class="flex items-center justify-between">
      <slot name="header">
        <h2 class="text-lg font-bold">🍮 卜克力小卡片</h2>
        <span
          class="bg-bokurano-accent text-bokurano-text-dark px-3 py-1 text-sm rounded-full shadow-sm"
          >NEW</span
        >
      </slot>
    </div>
    <slot name="content">
      <p class="text-sm leading-relaxed text-bokurano-text-primary">
        这是一张温柔又可爱的卡片，适合展示内容摘要、用户信息或通知提示。
      </p>
    </slot>
    <!-- 底部插槽 -->
    <slot name="footer">
      <button
        class="px-4 py-2 bg-bokurano-secondary hover:bg-bokurano-secondary-hover text-bokurano-text-dark rounded-xl font-semibold transition shadow"
      >
        了解更多
      </button>
    </slot>
  </div>
</template>
<script setup></script>
