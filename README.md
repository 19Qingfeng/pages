# Pages [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/19Qingfeng/pages/pulls)

<img alt="Logo" align="right" src="https://i.loli.net/2021/09/23/tsDzlNFJIeZS2Ku.png" width="20%" />

基于`Webpack 5`，`TypeScript`,`React`的`MPA`多页面应用实践配置

- `react`
- `webpack`
- `typescript`
- `sass`
- `eslint`
- `prettierrc`

## Usage

```shell

git clone https://github.com/19Qingfeng/pages  克隆仓库

yarn 安装依赖

yarn dev 启动开发环境

yarn build 构建生产环境包

yarn build-all  构建所有页面生产环境包
```

推荐使用`yarn`基于项目`yarn.lock`替代`npm`进行项目环境安装

## Documentation

- `src/packages` 目录为入口文件目录，每个目录下包含`main.txs`入口文件以及`menu-list.ts`对应的菜单路由列表。
- `src/containers` 目录对应不同页面业务逻辑目录,每个`container`下分别包含:

  - `assets`静态资源目录

  - `views`不同路由页面配置

  - `styles`当前模块下的样式文件列表

  - `index.scss`当前模块下的入口`scss`文件。(当前模块所有`scss`文件都需要在此文件引入，并且该位置必须要在`container/**/index.scss`)。

- `src/layout` 目录对应公用`layout`配置
- `layout`对应的样式文件需要单独在每个模块的入口文件中引入。

= `src/styles` 存放全局公用`variable`以及`mixins`,`reset`相关公用样式。

## 快速上手

- `src/packages` 页面级别入口文件目录放置。
- `src/containers` 页面级别业务逻辑处理
- `src/components` 页面级别公用组件
- `src/styles` 页面级别`scss`工具方法
- `src/utils` 页面级别`js`工具方法

> `src`级别目录可以通过`alias`进行访问

> 比如`src/**`->`@src/**`,`src/components/**`->`@components/**`...

_原则上每个页面可以在`src/container/**`中组织不同页面各自的目录结构，但是推荐多页面目录保持一致。_

## 开发

- `yarn dev`

项目会根据`packages`中的文件夹内容动态读取页面文件夹个数提供用于使用者选择，最终生成多页应用开发环境。

## 构建

- `yarn build`

项目会根据`packages`中的文件夹内容动态读取页面文件夹个数提供用于使用者选择，最终构建生成多页应用生产包。

- `yarn build-all`

构建项目中所有应用。

## 更新日志

### 9.27

- 增加`css-loader`，针对`css`进行处理。
