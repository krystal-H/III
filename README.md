# 开放平台5.0版本

## 项目开发
   国际惯例，先写这个···
```js
    // 安装依赖
    npm run install
    // 启动项目
    npm run dev
```

## 项目打包/发布

### 打包

此工程为源码目录，项目发布时，打包生成文件

```js
    // dll目录下无文件，或者修改了dll配置后
    npm run dll
    // 打包
    npm run pro
```

### 发布

开发环境(https://dp.clife.net/)
测试环境(https://itest.clife.net/)
生产环境(https://cms.clife.cn/，https://open.clife.cn/)

： dp  和 itest 环境的发布是打包提交到coding上后，对应构建计划里点击构建  即可完成发布；
生产环境在构建计划构建后 生成对应的 制品库，再将制品库相关信息发给开发发布负责人（汪超）代为发布。

####  制品信息模板

制品地址：
https://clife-devops-generic.pkg.coding.net/clifeiot/web-publish-package/wcloud-open.zip?version=c571876820b5246ac34348581dcc4e3851ad98d3
发布目录：wcloudopen
制品名称：wcloud-open.zip
发布内容：OTA升级

（发布目录 默认是cms域名下的fault，若是open下则需要添加域名 比如： open/wCloud/v4  这样）


## mock数据

目前使用的是 `mocker-api` 插件进行数据模拟。 文档 ： https://github.com/jaywcjlove/mocker-api

```js
    // mock模式启动项目
    npm run dev:mock
```

mock数据在 `src/mock` 下, `index.js`文件中加入需要模拟的接口，接口数据较多时，请放入`data`目录中，按照模块创建子目录。

可以准备一份较全的接口数据，在开发环境崩溃时，你会觉得很有用···

## 公共资源记录

此部分用于记录公共的方法和组件，避免重复开发

### 数据请求
    
数据请求使用`@src/api/request.js`，是在`axios`的基础上根据项目特点进行了简单的封装，提供了一些便利配置
所有请求的路径在`@src/api/path.js`中进行管理

### 组件

#### MyIcon 自定义图标组件
此控件是对`antd/Icon`组件的补充，在Icon控件图标库没有合适的情况下使用
自定义图标库路径为：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1356493

### NoSourceWarn 无资源提示组件
此控件用于数据为空时的提示，比如列表/表格数据为空时

## 开发建议

1、公共样式以“comm-”开头命名写在 common.scss 里； 
    元素加class时，comm样式在前  自定义其他样式名在后  例如 " <div className='comm-shadowbox menubox'> "
2、不用@装饰器；







