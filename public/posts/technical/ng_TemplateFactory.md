---
title: 组件+service实现模版工厂类
slug: home
tags: 
  - Angular
description:
---

通过实现一个 **模版工厂服务**，用于提供各种 `TemplateRef`。这种服务可以集中管理模板引用（`TemplateRef`），并在需要时动态获取和使用它们。以下是实现步骤和示例代码：

---

## 实现思路

1. **创建一个服务**：用于存储和管理 `TemplateRef`。
2. **在组件中注册模板**：将 `TemplateRef` 注册到服务中。
3. **在需要的地方获取模板**：从服务中获取 `TemplateRef` 并动态渲染。

---

## 实现步骤

### 1. 创建工厂服务

创建一个服务，用于存储和提供 `TemplateRef`。

```typescript
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root', // 全局单例服务
})
export class TemplateFactoryService {
  private templates: { [key: string]: TemplateRef<any> } = {};

  // 注册模板
  registerTemplate(key: string, template: TemplateRef<any>): void {
    this.templates[key] = template;
  }

  // 获取模板
  getTemplate(key: string): TemplateRef<any> | null {
    return this.templates[key] || null;
  }
}
```

---

### 2. 在组件中注册模板

在组件中使用 `ViewChild` 获取 `TemplateRef`，并将其注册到服务中。

```typescript
import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { TemplateFactoryService } from './template-factory.service';

@Component({
  selector: 'app-template-registry',
  template: `
    <ng-template #template1>
      <p>This is Template 1</p>
    </ng-template>

    <ng-template #template2>
      <p>This is Template 2</p>
    </ng-template>
  `,
})
export class TemplateRegistryComponent implements AfterViewInit {
  @ViewChild('template1') template1!: TemplateRef<any>;
  @ViewChild('template2') template2!: TemplateRef<any>;

  constructor(private templateFactory: TemplateFactoryService) {}

  ngAfterViewInit(): void {
    // 注册模板
    this.templateFactory.registerTemplate('template1', this.template1);
    this.templateFactory.registerTemplate('template2', this.template2);
  }
}
