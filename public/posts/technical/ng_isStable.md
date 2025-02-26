---
title: 如何判断应用是否处于稳定状态
slug: home
tags: 
  - Angular
description:
---

在 Angular 中，`ApplicationRef.isStable` 是一个用于判断应用是否处于稳定状态（Stable State）的属性。当应用完成初始加载、所有异步任务（如 HTTP 请求、定时器等）都已完成时，应用会进入稳定状态。

如果你想在 Angular 组件中判断应用是否稳定，可以通过注入 `ApplicationRef` 并监听其 `isStable` 属性来实现。

---

### **1. 使用 `ApplicationRef.isStable`**
以下是一个示例，展示如何在组件中判断应用是否稳定：

#### **示例代码**
```typescript
import { Component, OnInit } from '@angular/core';
import { ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular App</h1>
    <p>Application is stable: {{ isStable }}</p>
  `,
})
export class AppComponent implements OnInit {
  isStable: boolean = false;

  constructor(private appRef: ApplicationRef) {}

  ngOnInit() {
    this.appRef.isStable.subscribe((stable) => {
      this.isStable = stable;
      if (stable) {
        console.log('Application is now stable.');
      } else {
        console.log('Application is not stable.');
      }
    });
  }
}
```

#### **代码说明**
1. **注入 `ApplicationRef`**：
   - 通过依赖注入获取 `ApplicationRef` 实例。
2. **订阅 `isStable`**：
   - `isStable` 是一个 `Observable<boolean>`，当应用状态变化时会发出值。
   - 当应用稳定时，`isStable` 会发出 `true`；否则发出 `false`。
3. **更新组件状态**：
   - 在订阅中更新组件的 `isStable` 属性，并在模板中显示。

---

### **2. 应用场景**
`ApplicationRef.isStable` 的常见使用场景包括：
1. **性能监控**：
   - 在应用稳定后记录性能数据，例如页面加载时间。
2. **预渲染**：
   - 在服务器端渲染（SSR）中，等待应用稳定后再生成 HTML。
3. **测试**：
   - 在端到端测试中，等待应用稳定后再执行断言。

---

### **3. 注意事项**
- **异步任务**：
  - `isStable` 只有在所有异步任务（如 HTTP 请求、定时器、微任务等）完成后才会变为 `true`。
- **多次触发**：
  - `isStable` 可能会多次触发。例如，当新的异步任务开始时，它会变为 `false`；任务完成后，又会变为 `true`。
