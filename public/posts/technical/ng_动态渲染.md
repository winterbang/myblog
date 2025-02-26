---
title: ngContainer + ngTemplateOutlet｜ngComponentOutlet 实现动态渲染
slug: home
tags: 
  - Angular
description:
---

在 Angular 中，`ngTemplateOutlet` 和 `ngComponentOutlet` 是用于动态渲染模板和组件的指令。它们的使用方式如下：

### 1. `ngTemplateOutlet`
`ngTemplateOutlet` 用于动态渲染一个模板（`<ng-template>`）。你可以通过传递一个模板引用和上下文对象来控制模板的渲染。

#### 使用方式：
```html
<ng-container *ngTemplateOutlet="templateRef; context: contextObject"></ng-container>
```

- `templateRef`：是一个 `TemplateRef` 类型的引用，通常通过 `@ViewChild` 或 `@ContentChild` 获取。
- `context`：是一个对象，用于向模板传递数据。模板中可以通过 `let-` 语法访问这些数据。

#### 示例：
```html
<ng-template #myTemplate let-name="name">
  <p>Hello, {{ name }}!</p>
</ng-template>

<ng-container *ngTemplateOutlet="myTemplate; context: { name: 'World' }"></ng-container>
```

在这个例子中，`myTemplate` 是一个模板引用，`context` 对象传递了一个 `name` 属性，模板中使用 `let-name` 来接收这个属性并显示。

### 2. `ngComponentOutlet`
`ngComponentOutlet` 用于动态渲染一个组件。你可以通过传递一个组件类来动态创建和插入组件。

#### 使用方式：
```html
<ng-container *ngComponentOutlet="componentClass; inputs: inputsObject"></ng-container>
```

- `componentClass`：是一个组件类的引用。
- `inputs`：是一个对象，用于向组件传递输入属性。

#### 示例：
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  template: `<p>Dynamic Component Loaded!</p>`
})
export class DynamicComponent {}

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngComponentOutlet="dynamicComponent; inputs: { inputProp: 'Hello' }"></ng-container>
  `
})
export class AppComponent {
  dynamicComponent = DynamicComponent;
}
```

在这个例子中，`DynamicComponent` 是一个动态加载的组件，`inputs` 对象传递了一个 `inputProp` 属性给组件。

### 总结
- `ngTemplateOutlet` 用于动态渲染模板，适合需要根据条件或数据动态生成视图的场景。
- `ngComponentOutlet` 用于动态渲染组件，适合需要动态加载不同组件的场景。

两者都可以通过传递上下文或输入属性来控制渲染内容，提供了灵活的视图管理方式。