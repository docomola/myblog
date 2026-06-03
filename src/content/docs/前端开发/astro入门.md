---
title: "Astro 入门指南"
description: "Astro 现代静态站点生成器入门教程"
order: 1
---

Astro 是一个现代静态站点生成器，默认输出零 JS，最适合内容型网站。

## 介绍

Astro 最适合以下场景：
- 博客和个人网站
- 技术文档站点
- 营销页面和落地页

## 快速安装

```bash
# npm
npm create astro@latest

# pnpm
pnpm create astro@latest
```

## 项目结构

```
src/
├── pages/      # 页面路由
├── components/ # 组件
├── layouts/    # 布局
└── content/    # 文档内容
public/         # 静态资源
```

## 核心特性

- **零 JS 默认** — 不加载不必要的 JS
- **多框架** — React/Vue/Svelte 混用
- **内容集合** — 类型安全的 Markdown 管理
- **岛屿架构** — 按需加载交互组件
