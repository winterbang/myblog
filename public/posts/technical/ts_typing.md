---
title: 面向对象和面向协议两种类型系统的设计哲学
slug: home
tags: 
  - TypeScript
description: 关于TypeScript 类型系统的设计哲学
---
**TypeScript 类型系统的设计哲学**。

---

## 1️⃣ 什么是「面向对象声明类型」

* **面向对象 (Nominal Typing)**：类型和它的**名字**或**类**绑定。
* 例子（Java、C# 就是这种类型系统）：

  ```java
  class Person {
      String name;
  }

  class Animal {
      String name;
  }

  Person p = new Animal(); // ❌ 即使结构一样，也不能赋值
  ```

  在 **面向对象语言**里，只有继承关系成立，类型才兼容。

如果用 TypeScript 写面向对象式声明：

```ts
class Person {
  name: string
}

class Animal {
  name: string
}

let p: Person
p = new Animal()  // ✅ 在 TS 是可以的（这就是区别！）
```

在 TS 里，这居然能成立，因为 TS 不是真正的「面向对象」类型系统，而是 **结构化类型**。

---

## 2️⃣ 什么是「面向协议声明类型」

* **面向协议 (Structural Typing)**：只要对象的**结构**满足要求，就认为它兼容。
* 这也是 TypeScript 的默认模型。

例子：

```ts
interface Named {
  name: string
}

function greet(n: Named) {
  console.log("Hello " + n.name)
}

let user = { name: "张三", age: 20 }
greet(user)   // ✅ 可以，多余的属性不会报错
```

这里 `user` 并没有显式实现 `Named` 接口，但因为它有 `name: string`，所以被认为符合 `Named` 协议。

这就是 **面向协议（duck typing，"像鸭子就是鸭子"）**。

---

## 3️⃣ TypeScript 的选择

* TypeScript 采用的是 **结构化类型系统**（Structural Typing），即 **面向协议**。
* 它不会强制你显式继承接口，只要结构匹配即可。
* 但 TS 也保留了类（`class`）、继承、`implements` 等语法，让你可以写出面向对象风格的代码。

所以在 TS 里：

* **面向协议声明类型** = 用 `interface` / `type` 定义结构，只要“形状”相同即可赋值。
* **面向对象声明类型** = 用 `class` / `implements` 显式指定继承关系。

---

## 4️⃣ 对比总结

| 特点     | 面向对象声明类型 (Nominal)     | 面向协议声明类型 (Structural) |
| ------ | ---------------------- | --------------------- |
| 判断标准   | 类型名/继承关系               | 成员结构是否匹配              |
| 典型语言   | Java / C# / Swift      | TypeScript / Go       |
| TS 中写法 | `class` / `implements` | `interface` / `type`  |
| 优点     | 严格，清晰继承关系              | 灵活，低耦合                |
| 缺点     | 侵入性强，必须声明关系            | 可能误判（结构一样就算兼容）        |

---

## 5️⃣ 一个例子串联

```ts
// 面向协议
interface Flyer {
  fly(): void
}

class Bird {
  fly() { console.log("Bird flying") }
}

class Airplane {
  fly() { console.log("Airplane flying") }
}

// 不需要 implements，结构符合就可以赋值
let f1: Flyer = new Bird()
let f2: Flyer = new Airplane()

// 面向对象
class SuperBird extends Bird implements Flyer {
  // 显式 implements，写法更“面向对象”
}
```

---

✅ **一句话总结**：

* TS 的核心是 **面向协议的结构化类型**（duck typing）。
* 但它也支持 **面向对象的显式继承**（class/implements）。
* 你可以根据项目需求选择是“靠结构兼容”还是“靠继承关系”。

---

