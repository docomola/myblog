---
title: "Docker 入门"
order: 1
---

## 什么是 Docker

Docker 是一个容器化平台，让应用和环境一起打包和分发。

## 安装

```bash
# Windows
winget install Docker.DockerDesktop

# macOS
brew install --cask docker
```

## 常用命令

```bash
# 查看容器
docker ps

# 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 8080:80 my-app
```

## 优势

- 环境一致性
- 快速部署
- 资源隔离
- 微服务架构基础
