# Flutter 学习大纲

## 目录

- [Flutter 基础](#flutter-基础)
- [Dart 语言基础](#dart-语言基础)
- [项目结构](#项目结构)
- [Widget 基础](#widget-基础)
- [布局](#布局)
- [样式与主题](#样式与主题)
- [状态管理](#状态管理)
- [路由与导航](#路由与导航)
- [网络请求](#网络请求)
- [数据存储](#数据存储)
- [异步编程](#异步编程)
- [动画](#动画)
- [手势与事件](#手势与事件)
- [列表与滚动](#列表与滚动)
- [表单](#表单)
- [图片与资源](#图片与资源)
- [平台交互](#平台交互)
- [性能优化](#性能优化)
- [调试与测试](#调试与测试)
- [打包与发布](#打包与发布)
- [实战项目](#实战项目)
- [面试重点](#面试重点)

## Flutter 基础

### Flutter 是什么

- Google 开源的跨平台 UI 框架
- 使用 Dart 语言开发
- 一套代码可构建 Android、iOS、Web、桌面端应用
- 核心思想：一切皆 Widget

### Flutter 特点

- 跨平台
- 高性能渲染
- 热重载 Hot Reload
- 丰富的组件体系
- 接近原生的体验

### Flutter 与其他方案对比

- Flutter 与原生开发
- Flutter 与 React Native
- Flutter 与 WebView 混合开发
- Flutter 的优势和适用场景

## Dart 语言基础

### 基础语法

- 变量声明：`var`、`final`、`const`
- 基础类型：`int`、`double`、`num`、`String`、`bool`
- 集合类型：`List`、`Set`、`Map`
- 运算符
- 条件语句
- 循环语句

### 函数

- 普通函数
- 箭头函数
- 可选参数
- 命名参数
- 默认参数
- 匿名函数

### 面向对象

- 类和对象
- 构造函数
- 命名构造函数
- 继承
- 抽象类
- 接口
- mixin

### 空安全

- 可空类型：`String?`
- 非空类型：`String`
- 非空断言：`!`
- 空合并运算符：`??`
- 空安全访问：`?.`

## 项目结构

### 常见目录

- `lib`：主要业务代码
- `main.dart`：应用入口
- `assets`：静态资源
- `test`：测试代码
- `android`：Android 原生工程
- `ios`：iOS 原生工程
- `pubspec.yaml`：项目配置和依赖管理

### 应用入口

```dart
void main() {
  runApp(const MyApp());
}
```

### pubspec.yaml

- 配置项目名称
- 配置依赖
- 配置图片、字体等资源
- 配置版本号

## Widget 基础

### Widget 分类

- StatelessWidget
- StatefulWidget
- InheritedWidget
- RenderObjectWidget

### StatelessWidget

- 无状态组件
- 适合展示固定 UI
- 通过 `build` 方法描述界面

### StatefulWidget

- 有状态组件
- 使用 `State` 保存状态
- 通过 `setState` 触发界面更新

### 生命周期

- `initState`
- `didChangeDependencies`
- `build`
- `didUpdateWidget`
- `deactivate`
- `dispose`

## 布局

### 基础布局组件

- `Container`
- `Row`
- `Column`
- `Stack`
- `Positioned`
- `Expanded`
- `Flexible`
- `SizedBox`
- `Padding`
- `Align`
- `Center`

### 约束机制

- 父组件传递约束
- 子组件决定尺寸
- 父组件决定位置
- 理解 constraints

### Row 和 Column

- 主轴和交叉轴
- `mainAxisAlignment`
- `crossAxisAlignment`
- `mainAxisSize`
- `Expanded` 和 `Flexible`

### Stack 布局

- 层叠布局
- `Positioned`
- `Align`
- 适合浮层、角标、遮罩

## 样式与主题

### 常见样式

- `TextStyle`
- `BoxDecoration`
- `Border`
- `BorderRadius`
- `BoxShadow`
- `Gradient`

### Theme

- `ThemeData`
- 明暗主题
- 全局颜色
- 字体样式
- 组件默认样式

### Material 与 Cupertino

- Material Design 风格组件
- Cupertino iOS 风格组件
- 跨平台 UI 风格选择

## 状态管理

### 基础状态管理

- `setState`
- `InheritedWidget`
- `ValueNotifier`
- `ChangeNotifier`

### 常见状态管理方案

- Provider
- Riverpod
- Bloc
- GetX
- MobX

### 状态管理关注点

- 局部状态和全局状态
- 状态更新范围
- 业务逻辑拆分
- 数据缓存
- 页面刷新策略

## 路由与导航

### 基础路由

- `Navigator.push`
- `Navigator.pop`
- 页面传参
- 页面返回值

### 命名路由

- `routes`
- `initialRoute`
- `onGenerateRoute`
- 路由拦截

### 高级路由

- Navigator 2.0
- go_router
- 嵌套路由
- 底部 Tab 导航
- 登录态路由控制

## 网络请求

### HTTP 请求

- `http` 包
- Dio
- GET 请求
- POST 请求
- 请求参数
- 响应处理

### Dio 常用能力

- 拦截器
- 统一错误处理
- Token 注入
- 请求取消
- 文件上传
- 文件下载

### 数据解析

- JSON 解析
- Model 类
- `fromJson`
- `toJson`
- json_serializable

## 数据存储

### 本地存储

- shared_preferences
- flutter_secure_storage
- 文件存储
- SQLite
- Hive

### 缓存设计

- 用户信息缓存
- Token 缓存
- 接口数据缓存
- 图片缓存
- 缓存过期策略

## 异步编程

### Future

- `Future`
- `then`
- `catchError`
- `whenComplete`
- `async / await`

### Stream

- 单订阅流
- 广播流
- StreamController
- StreamBuilder

### Isolate

- Dart 单线程模型
- Isolate 的作用
- 适合 CPU 密集型任务
- compute

## 动画

### 隐式动画

- `AnimatedContainer`
- `AnimatedOpacity`
- `AnimatedPositioned`
- `AnimatedSwitcher`

### 显式动画

- `AnimationController`
- `Tween`
- `CurvedAnimation`
- `AnimatedBuilder`

### Hero 动画

- 页面共享元素动画
- `Hero`
- `tag`

## 手势与事件

### 手势组件

- `GestureDetector`
- `InkWell`
- `Listener`
- `Draggable`

### 常见事件

- 点击
- 双击
- 长按
- 滑动
- 拖拽
- 缩放

## 列表与滚动

### 列表组件

- `ListView`
- `GridView`
- `PageView`
- `SingleChildScrollView`
- `CustomScrollView`

### Sliver

- `SliverAppBar`
- `SliverList`
- `SliverGrid`
- `SliverToBoxAdapter`
- 吸顶效果

### 列表优化

- 使用 builder 构造
- 分页加载
- 下拉刷新
- 上拉加载
- 避免一次渲染大量组件

## 表单

### 表单组件

- `Form`
- `TextField`
- `TextFormField`
- `Checkbox`
- `Radio`
- `Switch`
- `DropdownButton`

### 表单处理

- 输入控制器 `TextEditingController`
- 表单校验
- 获取表单值
- 键盘类型
- 输入格式限制

## 图片与资源

### 图片

- 本地图片
- 网络图片
- 圆角图片
- 占位图
- 加载失败处理

### 资源管理

- assets 配置
- 字体配置
- 多分辨率图片
- 图标字体

## 平台交互

### Platform Channel

- MethodChannel
- EventChannel
- BasicMessageChannel
- Flutter 调用原生
- 原生调用 Flutter

### 原生能力

- 相机
- 相册
- 定位
- 推送
- 支付
- 分享

## 性能优化

### 构建优化

- 减少不必要的 build
- 合理拆分 Widget
- 使用 `const` 构造
- 使用 `RepaintBoundary`
- 避免在 build 中执行耗时逻辑

### 渲染优化

- 避免复杂嵌套布局
- 避免大面积重绘
- 图片尺寸优化
- 列表懒加载
- 动画帧率优化

### 包体积优化

- 删除无用资源
- 压缩图片
- 按需引入依赖
- 分析构建产物

## 调试与测试

### 调试工具

- Flutter DevTools
- Widget Inspector
- Performance View
- Network View
- Logging View

### 测试

- 单元测试
- Widget 测试
- 集成测试
- Mock 数据

## 打包与发布

### Android

- 配置应用图标
- 配置应用名称
- 配置签名
- 构建 APK
- 构建 App Bundle

### iOS

- 配置 Bundle Identifier
- 配置证书
- 配置描述文件
- 构建 ipa
- TestFlight 发布

### 多环境配置

- 开发环境
- 测试环境
- 生产环境
- 环境变量
- Flavor

## 实战项目

### 入门项目

- 计数器
- Todo List
- 天气应用
- 登录注册页面
- 新闻列表

### 进阶项目

- 电商应用
- 记账应用
- 聊天应用
- 音视频播放应用
- 后台管理移动端

### 实战关注点

- 项目目录规划
- 网络层封装
- 状态管理选型
- 路由管理
- 错误处理
- 主题适配
- 打包发布

## 面试重点

### 高频问题

- Flutter 为什么性能好
- Flutter 的渲染原理是什么
- Widget、Element、RenderObject 的关系
- StatelessWidget 和 StatefulWidget 的区别
- setState 的执行流程
- Flutter 生命周期有哪些
- Flutter 的布局约束机制是什么
- Key 的作用是什么
- Provider、Bloc、GetX 的区别
- Future 和 Stream 的区别
- Isolate 是什么
- Flutter 如何和原生通信
- Flutter 如何做性能优化
- Flutter 如何减小包体积
- Flutter 热重载和热重启的区别

### 复习建议

- 先掌握 Dart 语法和 Widget 基础
- 再重点学习布局、状态管理、路由和网络请求
- 用小项目练习页面搭建和数据流转
- 深入理解渲染流程、生命周期、性能优化
- 准备 1 到 2 个完整项目经验用于面试表达
