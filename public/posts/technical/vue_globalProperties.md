---
title: Vue 组件中优雅的获取全局属性
tags: 
  - Javascript
  - Vue
description: 在Vue组件中优雅的获取全局属性的实践方法
---

### ✅ 方案 1：封装一个 useGlobal 辅助函数
```typescript
// useGlobal.ts
import { getCurrentInstance } from "vue";

export function useGlobal<T = any>(key?: string): T | Record<string, any> {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useGlobal() must be called within setup().");
  }
  const global = instance.appContext.config.globalProperties;

  // 如果传 key，返回对应属性；否则返回整个 globalProperties
  return key ? global[key] : global;
}
```
使用：

```typescript
import { useGlobal } from "@/composables/useGlobal";

export default {
  setup() {
    const api = useGlobal("$api");   // 直接拿到 globalProperties.$api
    const all = useGlobal();         // 拿到整个 globalProperties
    console.log(api, all);
  }
}
```
### ✅ 方案 2：结合 provide/inject
既然是全局共享，可以在创建 app 时就 provide，这样在任何组件里 inject 会比手动 get 更优雅：

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.$api = { getUser: () => {/*...*/} };
app.provide("api", app.config.globalProperties.$api); // 提供一次

app.mount("#app");
```
然后在组件里：

```typescript
import { inject } from "vue";

export default {
  setup() {
    const api = inject<any>("api");
    api.getUser();
  }
}
```
优点：不用依赖 getCurrentInstance()，TS 类型提示也更好。

### ✅ 方案 3：使用 TypeScript 全局声明 + 简化访问
你也可以在 env.d.ts 里给 ComponentCustomProperties 扩展类型，然后直接通过 this.$xxx 或 getCurrentInstance().proxy.$xxx 获取，不必层层写 appContext.config。

```typescript
// env.d.ts
import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $api: { getUser: () => void };
  }
}
```
使用时：

```typescript
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance()!;
proxy.$api.getUser();
```
✨ 推荐组合：

封装一个 useGlobal hook（方案1）：适合快速访问，简单直观。

搭配 provide/inject（方案2）：更符合 Vue3 设计哲学，可读性和可维护性好。