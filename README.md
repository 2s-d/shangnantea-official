# 商南茶城官网

商南茶文化推广与销售平台的官方展示网站。

## 项目简介

这是商南茶城的官方网站，用于展示公司信息、茶叶产品、茶文化文章、新闻动态等内容。

## 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **后端**: Strapi CMS (Headless CMS)
- **数据库**: SQLite (开发) / PostgreSQL (生产)

## 本地开发

### 前置要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd frontend && npm install

# 安装后端依赖
cd backend && npm install
```

### 启动开发服务器

```bash
# 在根目录执行，同时启动前后端
npm run dev
```

或者分别启动：

```bash
# 启动后端 (Strapi CMS)
cd backend
npm run develop

# 启动前端 (Next.js)
cd frontend
npm run dev
```

- 前端地址: http://localhost:3000
- 后端管理面板: http://localhost:1337/admin

## 项目结构

```
shangnantea-official/
├── frontend/          # Next.js 前端
├── backend/           # Strapi CMS 后端
├── package.json       # 根目录配置
└── README.md
```

## 部署

待定

## 许可证

MIT
