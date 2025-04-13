---
title: 代码优化手段
tags: 
  - Javascript
description:
---

1、惰性函数，避免重复的判断计算

```javascript
function copyText() {
    if(support) {
    copyText = () => {
        xxxxx
    }
    } {
    copyText = () => {
        yyyyy
    }
    }
}
copyText()
```


2、函数重载

	函数重载（Function Overloading）是面向对象编程中的一个概念，指在同一个作用域内定义多个同名函数，但这些函数具有不同的参数类型或参数数量。当调用函数时，编译器或解释器会根据传入的参数类型和数量来决定调用哪一个函数。

## 	函数重载解决的问题


	函数重载主要解决以下问题：


	1. 增强代码的可读性和表达能力，使函数名称能够清晰地表达其功能
	2. 简化调用方式，让开发者不必记住多个不同名称的函数
	3. 允许同一个操作根据不同的参数类型执行不同的逻辑

```bash
function addMethod(object, name, fn) {
    const old = object[name];
    object[name] = function() {
    if (fn.length === arguments.length) {
        return fn.apply(this, arguments);
    } else if (typeof old === 'function') {
        return old.apply(this, arguments);
    }
    };
}

const methods = {};

addMethod(methods, 'calculate', function() {
    return 0;
});

addMethod(methods, 'calculate', function(a) {
    return a;
});

addMethod(methods, 'calculate', function(a, b) {
    return a + b;
});

console.log(methods.calculate());      // 输出: 0
console.log(methods.calculate(10));    // 输出: 10
console.log(methods.calculate(10, 5)); // 输出: 15
```


```bash
function createOverload() {
    const fnMap = new Map();
    function overload(...args) {
    const key = args.map((it) => typeof it).join(',');
    const fn = fnMap.get(key);
    if(!fn) {
        throw new TypeError('没有找到对应的实现')
    }
    return fn.apply(this, args)
    }

    overload.addImpl = function(...args) {
    const fn = args.pop()
    if(typeof fn !== 'function') {
        throw new TypeError('最后一个参数必须函数')
    }
    const key = args.join(',');
    fnMap.set(key, fn);
    }
    return overload
}
const getUsers = createOverload();
const getUsers.addImpl(() => {
    ...
})

getUsers.addImpl('number', () => {
    ...
})
```


3、函数柯里化


	1.参数复用，具有相同部分参数的函数可以调同一个函数
	2.根据不同参数，创建函数

```bash
function curry(fn, args) {
    const length = fn.length;
    const args = args || [];
    return function() {
    let newArgs = args.concact(Array.proptotype.slice.call(arguments))
    if(newArgs.length < length) {
        return curry.call(this, fn, newArgs)
    } else {
        return fn.apply(this, newArgs)
    }
    }
}
```


4、参数归一化

参数归一化（Parameter normalization）是一种处理函数参数的技术，主要用于将不同形式的输入统一转化为标准格式，从而简化函数内部的处理逻辑。

## 	参数归一化解决的问题


	参数归一化主要解决以下问题：


	1. **简化函数内部逻辑**：通过统一参数格式，避免函数内部处理各种不同形式的输入
	2. **提高代码可维护性**：减少条件分支，使代码更加清晰
	3. **增强函数的灵活性**：允许函数接受多种形式的输入，同时保持内部实现的简单性
	4. **改善用户体验**：使API更加友好，允许用户以不同方式调用函数

## 	参数归一化的常见场景

	1. **多种参数格式支持**：例如，一个函数可以接受单个值、数组或对象作为参数
	2. **选项对象标准化**：将用户提供的不完整选项对象与默认值合并
	3. **类型转换**：自动将字符串转换为数字，或其他类型转换
	4. **参数重排序**：适应不同的调用模式

```bash
// 参数归一化示例：允许多种参数形式
function createElement(type, options, children) {
  // 参数归一化
  if (arguments.length === 2 && !Array.isArray(options) && typeof options === 'object') {
    // 形式1: createElement('div', { id: 'example' })
    children = [];
  } else if (arguments.length === 2) {
    // 形式2: createElement('div', ['子元素1', '子元素2'])
    children = options;
    options = {};
  } else if (arguments.length === 1) {
    // 形式3: createElement('div')
    children = [];
    options = {};
  }
  
  // 确保children总是数组
  if (!Array.isArray(children)) {
    children = [children];
  }
  
  // 函数的主要逻辑，现在可以假设参数都是标准化的格式
  console.log(`创建元素: ${type}`);
  console.log(`选项: ${JSON.stringify(options)}`);
  console.log(`子元素: ${children.length}个`);
}

// 不同形式的调用
createElement('div', { id: 'test' }, ['文本1', '文本2']);  // 标准形式
createElement('div', { id: 'test' });                    // 没有子元素
createElement('div', ['文本1', '文本2']);                  // 没有选项
createElement('div');                                    // 最简单形式
```
参数归一化技术与函数重载有一定的关联，但侧重点不同。函数重载强调的是根据不同参数执行不同的功能逻辑，而参数归一化则是将各种形式的输入转换为统一的标准格式，使函数内部逻辑更加简单和一致。在JavaScript这类动态语言中，参数归一化是一种非常实用的技术，能够大大增强函数的灵活性和易用性。
