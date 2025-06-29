---
title: 服务注册（Service Registration）和服务注入（Service Injection）所有方式
slug: home
tags: 
  - Angular
description: Angular 中所有服务注册（Service Registration）和服务注入（Service Injection）方式
---

下面是 **Angular 中所有服务注册（Service Registration）和服务注入（Service Injection）方式的完整整理**，分别从两个维度清晰分类：

---

# 🧩 一、服务注册方式（Service Registration）

注册就是把一个服务（类、值、函数等）告诉 Angular 的 DI 系统，让它知道在需要时如何提供实例。

---

## ✅ A. 使用 `@Injectable({ providedIn })` 装饰器注册

```other
@Injectable({ providedIn: 'root' }) // 应用级单例
export class MyService {}
```

| **providedIn 值** | **说明**                      |
| ---------------- | --------------------------- |
| `'root'`         | 根注入器，应用级单例 ✅ 推荐             |
| `'platform'`     | 平台级单例，跨多个 Angular 应用共享      |
| `'any'`          | 每个注入器层级一个实例（适用于懒加载模块）       |
| `'self'`         | 仅在当前注入器中可用                  |
| 省略               | 不自动注册，需要在 `providers` 中手动声明 |

---

## ✅ B. 在 NgModule 中注册（`providers`）

```other
@NgModule({
  providers: [MyService]
})
export class SomeModule {}
```

- 在 **懒加载模块**中，服务是模块级单例
- 在 **非懒加载模块**中，服务提升为全局单例

---

## ✅ C. 在组件或指令中注册（`providers`）

```other
@Component({
  providers: [MyService]
})
export class MyComponent {}
```

- 作用域限定在组件实例及其子组件中
- 每个组件会有自己的服务实例（非单例）

---

## ✅ D. 使用 `InjectionToken` 注册值、接口、工厂

```other
export const CONFIG = new InjectionToken<Config>('AppConfig');

@NgModule({
  providers: [
    {
      provide: CONFIG,
      useValue: { retry: 3, timeout: 5000 }
    }
  ]
})
```

也可使用 factory：

```other
export const NOW = new InjectionToken<Date>('Now', {
  providedIn: 'root',
  factory: () => new Date()
});
```

---

## ✅ E. 使用 `multi: true` 注册多个提供者（插件、多值）

```other
export const PLUGINS = new InjectionToken<Plugin>('PLUGINS');

@NgModule({
  providers: [
    { provide: PLUGINS, useValue: pluginA, multi: true },
    { provide: PLUGINS, useValue: pluginB, multi: true }
  ]
})
```

---

## ✅ F. 使用自定义注入器 `Injector.create()`

适用于插件系统、手动控制生命周期：

```other
const injector = Injector.create({
  providers: [{ provide: MyService, useClass: MyService }]
});
const service = injector.get(MyService);
```

---

# 💉 二、服务注入方式（Service Injection）

注入就是在使用场景中告诉 Angular：「我需要这个服务」，Angular 会根据注册方式找到合适的实例注入进来。

---

## ✅ A. 构造函数注入（最常用）

```other
constructor(private myService: MyService) {}
```

- 自动注入已注册服务
- 支持类型检查和自动补全 ✅ 推荐

---

## ✅ B. 使用 `inject()` 函数注入（Angular 14+）

```other
const myService = inject(MyService); // 顶层或类属性中使用

@Injectable()
export class MyService {
  private http = inject(HttpClient); // 属性注入
}
```

- 适用于类字段、组合函数、类外逻辑
- 不适用于构造函数之外的生命周期钩子中（需注意上下文）

---

## ✅ C. 使用 `@Inject(Token)` 明确 token

```other
constructor(@Inject(API_URL) private apiUrl: string) {}
```

- 必须在使用 InjectionToken 或自定义 Provider 时指定
- 可与 `@Optional()`、`@Self()`、`@Host()`、`@SkipSelf()` 配合使用

---

## ✅ D. 使用 `Injector.get()` 动态注入

```other
constructor(private injector: Injector) {}

ngOnInit() {
  const myService = this.injector.get(MyService);
}
```

- 动态获取依赖
- 可用于运行时注入、插件系统、动态模块等

---

## ✅ E. 注入父组件或指令实例

```other
constructor(@Optional() @Host() @SkipSelf() private parent: ParentComponent) {}
```

- 用于子组件访问父组件
- 或者注入结构型指令如 `FormGroupDirective`, `NgForm`

---

## ✅ F. 注入自定义提供的接口或值（InjectionToken）

```other
constructor(@Inject(CONFIG) private config: Config) {}
```

- 用于类型接口、配置对象等非类依赖

---

## ✅ G. 非类方式：直接创建实例（非 DI）

```other
const service = new MyService(); // 不推荐
```

- 不受 Angular DI 控制
- 无法注入依赖

---

# ✅ 总结对照表

| **类别** | **方法/方式**                                    | **特点与适用场景**        |
| ------ | -------------------------------------------- | ------------------ |
| 注册     | `@Injectable({ providedIn })`                | 应用、平台、模块、局部注册 ✅ 推荐 |
|        | `NgModule.providers`                         | 模块级注册（懒加载时独立）      |
|        | `Component.providers`                        | 组件级别隔离服务实例         |
|        | `InjectionToken` + `useValue` / `useFactory` | 注入非类（如值、接口、函数）     |
|        | `multi: true`                                | 多重提供者（插件系统等）       |
|        | `Injector.create()`                          | 动态注入器，手动控制         |
| 注入     | 构造函数注入                                       | 最常用 ✅              |
|        | `inject()`                                   | 类字段/外部函数，组合 API    |
|        | `@Inject(token)`                             | 明确 token 注入        |
|        | `Injector.get()`                             | 动态运行时注入            |
|        | 父组件实例注入                                      | 父子通信               |
|        | `InjectionToken` 注入值/配置                      | 非类依赖               |
|        | `new MyService()`                            | 非 Angular DI（不推荐）  |

---


