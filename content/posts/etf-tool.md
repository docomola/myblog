+++
date = '2026-05-18T10:00:00+08:00'
draft = false
title = 'ETF 投资工具开发笔记'
description = '记录开发 ETF 排序工具的过程，修复溢价率显示为0的 bug'
tags = ["投资", "ETF", "工具"]
categories = ["技术"]
image = "images/investing.jpeg"
+++

# ETF 投资工具开发笔记

最近在开发一个 **ETF 排序工具**，帮助快速筛选溢价率合理的 ETF 产品。

## 功能特性

- 📊 实时排序（按溢价率、成交量、规模）
- 🔍 关键词搜索
- 📈 溢价率实时显示（修复了显示为0的 bug）
- 💾 数据导出

## 技术实现

使用纯前端实现，数据来源于公开 API：

```javascript
async function fetchETFData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.filter(etf => etf.premiumRate !== 0);
}
```

## 下一步

- 添加历史溢价率走势图
- 支持自定义筛选条件
- 移动端适配

> 投资有风险，本文仅供参考。
