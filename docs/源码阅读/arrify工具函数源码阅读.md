---
title: arrify 工具函数源码阅读
date: 2022-06-10
tags: 
	- 源码阅读
---


## 🔖  使用示例 

一个由 `sindresorhus` 开发的数组转换工具`arrify` , 可以将任意值转换为数组.

```javascript
import arrify from 'arrify';

// string
arrify('🦄');
//=> ['🦄']

// array
arrify(['🦄']);
//=> ['🦄']

// iterable objects
arrify(new Set(['🦄']));
//=> ['🦄']

// null
arrify(null);
//=> []

// null
arrify(undefined);
//=> []
```

## 📖 源码解读

```javascript
export default function arrify<ValueType>(
	value: ValueType
): ValueType extends (null | undefined)
	? [] // eslint-disable-line  @typescript-eslint/ban-types
	: ValueType extends string
		? [string]
		: ValueType extends readonly unknown[]
			? ValueType
			: ValueType extends Iterable<infer T>
				? T[]
				: [ValueType];
```

[TS](https://zhuanlan.zhihu.com/p/149767010)

```javascript
export default function arrify(value) {
	// 1.如果传入参数是 null 或 undefined 返回 []
	if (value === null || value === undefined) {
		return [];
	}
  // 2.如果传入参数是 数组,直接返回数组本身(数组的引用),没有这一步的话进入到4只会返回值相等的数组
	if (Array.isArray(value)) {
		return value;
	}
  // 3.如果传入参数是 string类型, 则返回 [value], 字符串类型也有Symbol.iterator属性，所以需要单独判断，也是第4步的特例
	if (typeof value === 'string') {
		return [value];
	}
  // 4.有Symbol.iterator属性是一个无返回函数就是可迭代对象，配合扩展运算符转变为数组
	if (typeof value[Symbol.iterator] === 'function') {
		return [...value];
	}
  // 5.其他像boolean、number等返回首项为传入值的数组
	return [value];
}
```

## 🍻 总结

主要值得学习的是[迭代器](https://blog.csdn.net/m0_46525076/article/details/118632890)`[Symbol.iterator]`这个内置属性。

- 一个无参数的函数，其返回值为一个符合[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#迭代器协议)的对象。
- 该迭代器可以被 for...of 循环使用。
-  为每一个对象定义了默认的迭代器。

![img](https://cdn.nlark.com/yuque/0/2022/png/235388/1654702306355-198ba940-e5d7-4559-80a5-58e0383e9fbb.png)

另外

- 函数的 arguments
- NodeList对象

可以看到 **array、string** 类型都是有内置迭代器的，源码里把这两个数据类型单独处理是因为:

**输入数组时期待返回原数组，不必解构增加消耗。**

输入字符串时，期待`arrify('abc') => ['abc']`，而非`arrify('abc') => ['a', 'b', 'c']`

备注：对象本身默认是不可迭代的

## 💡 JavaScript对象怎么实现迭代(iterator)功能？

```javascript
let SimpleClass = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}

for (const val of SimpleClass) {
  console.log(val)   //'1' '2' '3' '4' '5'
}
      
class SimpleClass {
  constructor(data) {
    this.data = data
  }
  
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}

const simple = new SimpleClass([1, 2, 3, 4, 5])

for (const val of simple) {
  console.log(val)   //'1' '2' '3' '4' '5'
}
```

💡 能否自定义一个迭代器来实现以上的效果呢？

```javascript
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

arrify(myIterable)
// output: [1, 2, 3]
```