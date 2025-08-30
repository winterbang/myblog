---
title: TypeScript 常用的类型声明工具和关键字
tags: 
  - TypeScript
description:
---
TypeScript 提供了丰富的类型声明方法和关键字，以下是最常用和实用的：

## 基础类型关键字

```typescript
// 基本类型
let name: string = "张三";
let age: number = 25;
let isActive: boolean = true;
let data: any = "任意类型";
let value: unknown = "未知类型";
let nothing: void = undefined;
let never: never; // 永远不会有值
```

## 联合类型和交叉类型

```typescript
// 联合类型 (Union Types)
type Status = "pending" | "success" | "error";
type ID = string | number;

// 交叉类型 (Intersection Types)
type User = { name: string } & { age: number };
```

## 数组和元组类型

```typescript
// 数组类型
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// 元组类型
let tuple: [string, number, boolean] = ["hello", 42, true];
```

## 实用工具类型 (Utility Types)

### 1. Partial - 将所有属性变为可选

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>; // 所有属性都变成可选
```

### 2. Required - 将所有属性变为必需

```typescript
interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>; // 所有属性都变成必需
```

### 3. Pick - 选择指定属性

```typescript
type UserBasic = Pick<User, "name" | "age">; // 只包含 name 和 age
```

### 4. Omit - 排除指定属性

```typescript
type UserWithoutEmail = Omit<User, "email">; // 排除 email 属性
```

### 5. Record - 创建键值对类型

```typescript
type Roles = "admin" | "user" | "guest";
type Permissions = Record<Roles, string[]>;
```

## 条件类型和映射类型

### 条件类型 (Conditional Types)

```typescript
type IsArray<T> = T extends any[] ? true : false;
type Result1 = IsArray<string[]>; // true
type Result2 = IsArray<string>;   // false
```

### 映射类型 (Mapped Types)

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};
```

## 泛型 (Generics)

```typescript
// 基础泛型
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface Container<T> {
  value: T;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

## 字面量类型和模板字面量类型

```typescript
// 字面量类型
type Theme = "light" | "dark";
type Size = "small" | "medium" | "large";

// 模板字面量类型 (TS 4.1+)
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"
```

## keyof 和 typeof

```typescript
interface Person {
  name: string;
  age: number;
}

// keyof 获取键的联合类型
type PersonKeys = keyof Person; // "name" | "age"

// typeof 获取值的类型
const config = {
  host: "localhost",
  port: 3000
};

type Config = typeof config; // { host: string; port: number }
```

## 索引签名和映射

```typescript
// 索引签名
interface StringDictionary {
  [key: string]: string;
}

interface NumberDictionary {
  [index: number]: string;
}

// 计算属性名
const ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts'
} as const;

type EndpointKeys = keyof typeof ENDPOINTS; // "USERS" | "POSTS"
```

## 类型断言和类型守卫

```typescript
// 类型断言
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// 类型守卫
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// 判别联合类型
interface Cat {
  type: "cat";
  meow: () => void;
}

interface Dog {
  type: "dog";
  bark: () => void;
}

type Animal = Cat | Dog;

function makeSound(animal: Animal) {
  switch (animal.type) {
    case "cat":
      animal.meow(); // TypeScript 知道这是 Cat
      break;
    case "dog":
      animal.bark(); // TypeScript 知道这是 Dog
      break;
  }
}
```

## 常用装饰器类型

```typescript
// 方法装饰器
type MethodDecorator = <T>(
  target: any,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

// 属性装饰器
type PropertyDecorator = (target: any, propertyKey: string | symbol) => void;
```

## 最佳实践建议

1. **优先使用接口**而不是类型别名来定义对象形状
2. **善用工具类型**如 `Partial`、`Pick`、`Omit` 等
3. **使用 `const` 断言**保持字面量类型：`as const`
4. **利用泛型**提高代码复用性
5. **使用类型守卫**进行安全的类型检查
6. **合理使用 `unknown`** 而不是 `any`

这些类型声明方法可以帮助我们写出更安全、更灵活的 TypeScript 代码。