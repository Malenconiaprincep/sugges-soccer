# Strapi Cloud 配置指南

## 概述

此项目已配置为使用 Strapi Cloud 服务。以下是配置步骤：

## 1. 获取 Strapi Cloud 实例信息

1. 登录到 [Strapi Cloud](https://cloud.strapi.io/)
2. 创建新项目或选择现有项目
3. 获取您的项目 URL 和 API Token

## 2. 配置环境变量

创建 `.env` 文件（基于 `env.example`）：

```bash
# 复制示例文件
cp env.example .env
```

编辑 `.env` 文件，填入您的 Strapi Cloud 信息：

```env
# Strapi Cloud 实例 URL
REACT_APP_STRAPI_URL=https://your-project-name.strapi.cloud

# Strapi Cloud API Token
REACT_APP_STRAPI_TOKEN=your-strapi-cloud-token-here
```

## 3. 获取 API Token

1. 在 Strapi Cloud 控制台中，进入您的项目
2. 转到 "Settings" > "API Tokens"
3. 创建新的 API Token，选择适当的权限
4. 复制生成的 token 到您的 `.env` 文件

## 4. 验证配置

启动项目以验证配置：

```bash
npm start
```

## 注意事项

- 确保您的 Strapi Cloud 实例已正确配置内容类型
- 检查 API Token 的权限设置
- 如果遇到 CORS 问题，请在 Strapi Cloud 设置中配置允许的域名

## 故障排除

如果遇到连接问题：

1. 检查 URL 是否正确
2. 验证 API Token 是否有效
3. 确认 Strapi Cloud 实例是否正在运行
4. 检查网络连接和防火墙设置
