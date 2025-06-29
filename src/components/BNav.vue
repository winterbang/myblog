<template>
  <div class="mb-6 w-full">
    <!-- 滑块导航容器 - 使用Tailwind类 -->
    <div
      id="slider-container"
      class="p-1 bg-bokurano-light/90 rounded-xl border-[3px] border-bokurano-border relative w-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.07)] overflow-hidden"
    >
      <!-- 增加内部暗边框效果 -->
      <div
        class="absolute inset-[1px] rounded-lg border border-bokurano-border/50 pointer-events-none z-20"
      ></div>

      <!-- 可滚动区域 -->
      <div class="slider-scroll overflow-x-auto relative z-10">
        <!-- 内部包装 -->
        <div class="slider-box">
          <!-- 滑动背景指示器 -->
          <div
            ref="indicator"
            id="slider-indicator"
            class="indicator"
            :style="{ '--left-position': leftPosition }"
          ></div>

          <!-- 滑块导航项 -->
          <div
            :class="{
              'slider-item relative group z-10': true,
              active: item === model,
            }"
            :ref="setRefs"
            v-for="item in items"
            :key="item"
            @click="onClick(item)"
          >
            <a
              class="w-16 h-8 flex items-center justify-center gap-1 rounded-lg cursor-pointer transition-all group-hover:scale-105"
            >
              <span class="text-xs text-bokurano-text-dark">{{ item }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- 渐变遮罩 -->
      <div
        class="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-bokurano-light/90 to-transparent pointer-events-none z-10"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUpdate, ref, useTemplateRef, watch, nextTick, watchEffect } from "vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  active: {
    type: Number,
    default: 0,
  },
});
const model = defineModel();
const indicator = useTemplateRef("indicator");
const sliderItems = ref([]);
const leftPosition = ref("auto");
function setRefs(el) {
  if (el) {
    sliderItems.value.push(el);
  }
}
function onClick(item) {
  model.value = item;
}

function moveSlider() {
  if (sliderItems.value.length === 0) {
    console.warn("Slider box or items not ready yet.");
    return;
  }
  // 移动滑块到当前项
  const idx = props.items.indexOf(model.value);
  const item = sliderItems.value[idx];
  // 获取当前项的位置
  leftPosition.value = `${item.offsetLeft}px`;

  // 添加缩放动画效果
  indicator.value.animate([{ transform: "scale(0.90)" }, { transform: "scale(1)" }], {
    duration: 200,
  });
}

watch(
  [model, sliderItems],
  () => {
    moveSlider();
  },
  { deep: true, once: false, flush: "post" }
);

onBeforeUpdate(() => {
  sliderItems.value = [];
});
// 设置滑块位置的函数
// function moveSlider(index) {
//   const item = sliderItems[index];
//   // 获取当前项的位置
//   const leftPosition = item.offsetLeft;

//   // 设置指示器位置
//   indicator.style.left = `${leftPosition}px`;

//   // 检查是否需要滚动以确保项目可见
//   const containerWidth = sliderScroll.clientWidth;
//   const isVisible =
//     leftPosition >= sliderScroll.scrollLeft &&
//     leftPosition + item.offsetWidth <= sliderScroll.scrollLeft + containerWidth;

//   if (!isVisible) {
//     // 计算滚动位置，使项目居中
//     const scrollPosition = leftPosition - containerWidth / 2 + item.offsetWidth / 2;
//     sliderScroll.scrollTo({
//       left: Math.max(0, scrollPosition),
//       behavior: "smooth",
//     });
//   }
// }
</script>
<style scoped>
@reference "tailwindcss";
@config "../../tailwind.config.js";

.slider-box {
  @apply flex gap-2 min-w-full relative pl-1 pr-10;
  .indicator {
    @apply absolute h-8 w-16 bg-bokurano-primary rounded-lg shadow-[0_0_8px_rgba(244,210,141,0.6),inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-300 ease-in-out z-0;
    left: var(--left-position, auto);
  }
  .active {
    @apply font-bold;
  }
}
</style>
