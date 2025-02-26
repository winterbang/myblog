---
title: ElementRef&ViewRef&TemplateRef&ViewContainerRef
slug: home
tags: 
  - Angular
description: 
---
在 Angular 中，`ElementRef`、`ViewRef`、`TemplateRef` 和 `ViewContainerRef` 是与 DOM 操作和视图管理相关的核心类。它们各自有不同的用途和功能。以下是它们的用法和区别：

---

## 1. **`ElementRef`**
`ElementRef` 是对 DOM 元素的包装，提供了对原生 DOM 元素的直接访问。

### 使用场景：
- 当你需要直接操作 DOM 元素时（例如修改样式、属性或调用 DOM API）。

### 用法：
```typescript
import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<div #myDiv>Hello World</div>`
})
export class ExampleComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // 访问原生 DOM 元素
    const nativeElement = this.el.nativeElement;
    nativeElement.querySelector('div').style.color = 'red';
  }
}
```

### 注意：
- 直接操作 DOM 可能会绕过 Angular 的变更检测机制，因此应谨慎使用。
- 在服务或指令中，可以通过依赖注入获取 `ElementRef`。

---

## 2. **`ViewRef`**
`ViewRef` 表示一个视图的抽象，可以是内嵌视图（`EmbeddedViewRef`）或宿主视图（`HostViewRef`）。

### 使用场景：
- 当你需要动态创建或销毁视图时。
- 通常与 `ViewContainerRef` 结合使用。

### 用法：
```typescript
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <ng-template #myTemplate>
      <div>Dynamic Content</div>
    </ng-template>
  `
})
export class ExampleComponent {
  @ViewChild('myTemplate', { read: TemplateRef }) myTemplate!: TemplateRef<any>;

  constructor(private vcr: ViewContainerRef) {}

  createView() {
    // 创建内嵌视图
    const viewRef = this.vcr.createEmbeddedView(this.myTemplate);
  }

  clearView() {
    // 清除视图
    this.vcr.clear();
  }
}
```

### 注意：
- `ViewRef` 是一个抽象类，具体实现是 `EmbeddedViewRef`（用于模板）或 `HostViewRef`（用于组件）。

---

## 3. **`TemplateRef`**
`TemplateRef` 表示一个 `<ng-template>` 的引用，用于定义可复用的模板片段。

### 使用场景：
- 当你需要动态渲染模板时。
- 通常与 `ViewContainerRef` 结合使用。

### 用法：
```typescript
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <ng-template #myTemplate let-name="name">
      <div>Hello, {{ name }}!</div>
    </ng-template>
  `
})
export class ExampleComponent {
  @ViewChild('myTemplate', { read: TemplateRef }) myTemplate!: TemplateRef<any>;

  constructor(private vcr: ViewContainerRef) {}

  renderTemplate() {
    // 渲染模板并传递上下文
    this.vcr.createEmbeddedView(this.myTemplate, { name: 'World' });
  }
}
```

### 注意：
- `<ng-template>` 是 Angular 中的一种特殊元素，默认不会渲染，需要通过 `TemplateRef` 动态渲染。

---

## 4. **`ViewContainerRef`**
`ViewContainerRef` 表示一个视图容器，用于动态添加、移除或管理视图。

### 使用场景：
- 当你需要动态加载组件或模板时。
- 通常与 `TemplateRef` 或 `ComponentFactoryResolver` 结合使用。

### 用法：
```typescript
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-example',
  template: `<ng-container #container></ng-container>`
})
export class ExampleComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  loadComponent() {
    // 动态加载组件
    const componentFactory = this.cfr.resolveComponentFactory(DynamicComponent);
    this.container.createComponent(componentFactory);
  }

  clearContainer() {
    // 清除容器中的内容
    this.container.clear();
  }
}
```

### 注意：
- `ViewContainerRef` 是一个强大的工具，可以动态管理视图的生命周期。

---

## 区别总结

| 类名               | 用途                                                                 | 典型使用场景                                   |
|--------------------|----------------------------------------------------------------------|-----------------------------------------------|
| **`ElementRef`**   | 提供对原生 DOM 元素的访问。                                           | 直接操作 DOM 元素（如修改样式、属性）。         |
| **`ViewRef`**      | 表示一个视图的抽象（可以是内嵌视图或宿主视图）。                       | 动态创建或销毁视图。                           |
| **`TemplateRef`**  | 表示一个 `<ng-template>` 的引用，用于定义可复用的模板片段。             | 动态渲染模板。                                 |
| **`ViewContainerRef`** | 表示一个视图容器，用于动态添加、移除或管理视图。                   | 动态加载组件或模板，管理视图的生命周期。         |

---

## 综合示例
以下是一个综合使用 `TemplateRef` 和 `ViewContainerRef` 的示例：

```typescript
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #myTemplate let-name="name">
      <div>Hello, {{ name }}!</div>
    </ng-template>
    <button (click)="renderTemplate()">Render Template</button>
    <ng-container #container></ng-container>
  `
})
export class AppComponent {
  @ViewChild('myTemplate', { read: TemplateRef }) myTemplate!: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  renderTemplate() {
    // 渲染模板并传递上下文
    this.container.createEmbeddedView(this.myTemplate, { name: 'World' });
  }
}
```

---

## 总结
- `ElementRef` 用于直接操作 DOM 元素。
- `TemplateRef` 用于定义和渲染模板。
- `ViewRef` 表示视图的抽象。
- `ViewContainerRef` 用于动态管理视图容器中的内容。

这些类在 Angular 的动态视图管理和 DOM 操作中扮演着重要角色，理解它们的用法和区别有助于更好地开发复杂的 Angular 应用。