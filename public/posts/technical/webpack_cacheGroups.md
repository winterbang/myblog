---
title: webpack 分包策略中常用正则
slug: home
tags: 
  - Webpack
description: 
---
### 指定某些库打包到指定chunk中

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendorCustom: {
          test: /[\\/]node_modules[\\/](lodash|moment)[\\/]/, // 指定两个库
          name: 'vendor-lodash-moment', // 打包到的 chunk 名称
          chunks: 'all',
          enforce: true, // 强制生效，避免被默认规则覆盖
        },
      },
    },
  },
};

```
如果你想用 **函数形式**的 test，写法类似：
```javascript
test(module) {
  return (
    module.resource &&
    (
      module.resource.includes('node_modules/lodash') ||
      module.resource.includes('node_modules/moment')
    )
  );
},

```

### 某个chunk中不包含某个库
#### 1️⃣ 用正则的 负向匹配 或者函数判断：
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test(module) {
            return (
              module.resource &&
              /[\\/]node_modules[\\/]/.test(module.resource) &&
              !/[\\/]node_modules[\\/]lodash[\\/]/.test(module.resource) // ❌ 排除 lodash
            );
          },
          name: 'vendors',
          chunks: 'all',
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: 'vendor-lodash',
          chunks: 'all',
        },
      },
    },
  },
};

```
这样 lodash 就会被单独打到 vendor-lodash.js，其他依赖进 vendors.js。

#### 2️⃣ 或者用函数 test 动态控制
如果有多个库要打到 main，可以写一个“排除列表”：
```javascript
const keepInMain = ['lodash', 'moment'];

splitChunks: {
  cacheGroups: {
    vendors: {
      test(module) {
        if (!module.resource) return false;
        if (/node_modules/.test(module.resource)) {
          return !keepInMain.some(pkg => module.resource.includes(`${pkg}`));
        }
        return false;
      },
      name: 'vendors',
      chunks: 'all',
    },
  },
},
```
这样，keepInMain 列表里的包都不会被抽出去，直接打到 main。