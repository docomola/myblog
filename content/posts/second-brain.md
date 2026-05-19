+++
date = '2026-05-10T09:00:00+08:00'
draft = false
title = '我的第二大脑：Obsidian + Hugo 自动化发布'
description = '用 Obsidian 写笔记，自动发布到 Hugo 博客的完整工作流'
tags = ["Obsidian", "第二大脑", "自动化"]
categories = ["技术"]
image = "images/second-brain.png"
+++

# 我的第二大脑：Obsidian + Hugo 自动化发布

搭建了一套从 **Obsidian 笔记** 到 **Hugo 博客发布** 的自动化流水线。

## 工作流架构

```mermaid
graph LR
    A[Obsidian 写作] --> B[Git 提交]
    B --> C[GitHub Actions]
    C --> D[Hugo 构建]
    D --> E[GitHub Pages 部署]
```

## 核心配置

### 1. Obsidian Git 插件

自动将笔记同步到 GitHub 仓库：

- 设置自动提交间隔：每 5 分钟
- 配置忽略文件：`.obsidian/`、`node_modules/`

### 2. GitHub Actions 自动部署

```yaml
name: Deploy Hugo
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-hugo@v2
```

## 效果

现在只需在 Obsidian 里写完笔记，push 到 GitHub，几分钟后博客自动更新 ✨

> 这就是我的「第二大脑」—— 思考在 Obsidian，分享在 Hugo。
