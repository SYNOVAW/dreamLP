# 🌙 REMia - AI電気羊梦境伴侣

> 人とAIが、ともに夢を見る最初の時代

一个结合AI梦境分析、星座卡牌系统、数羊助眠和个性化养生指南的创新产品着陆页。

## 🎯 产品愿景

**"REMia 是一款让你晚上安心入睡，早晨带来启示的梦境伴侣 App。"**

通过AI電気羊（AI Electric Sheep）技术，将梦境转化为科学的心理调节行动，创造昼夜循环的ritual loop体验。

## ✨ 核心功能

### 🌙 晚上 - 数羊助眠
- 🐑 **AI電気羊数羊** - 交互式数羊游戏，15%概率出现稀有梦之羊
- 💤 **睡前仪式** - 数到10-20只羊自动过渡到冥想音乐
- 🌿 **养生提示** - 每5只羊随机给出养生建议
- 🎵 **Hz音乐** - 432Hz/528Hz/963Hz科学频率调节脑波

### ☀️ 早上 - 梦境抽卡
- 🎴 **星座人格卡牌** - 12星座正反两面卡牌，正面插画/反面解析
- 🔮 **每日神秘抽卡** - 基于梦境的个性化卡池，建立生活仪式感
- 📊 **Synchrony Rate (SR)** - 梦与现实的同步率测量系统
- 🧠 **心理学教育** - 弗洛伊德、荣格、现代梦境理论

### 🔄 Day/Night Ritual Loop
- 🌙 **晚上**: 帮助缓解睡眠/焦虑痛点
- ☀️ **早上**: 帮助提供动力/意义感
- 🔄 **循环**: 形成"睡前有陪伴，醒来有指引"的日活留存

## 🚀 技术栈

- **框架**: Next.js 14 + React 18 + TypeScript
- **样式**: Tailwind CSS 4.1.9 + shadcn/ui + Glassmorphism设计
- **动画**: Framer Motion (卡片翻转、滚动触发、粒子效果)
- **多语言**: 自定义i18n系统 (中文/日文/英文)
- **图标**: Lucide React + React Emoji组件
- **状态管理**: React Hooks + Context API
- **部署**: Vercel (自动部署)
- **分析**: Google Analytics (Gtag)
- **后端**: Supabase (等候名单)

## 📦 安装与运行

```bash
# 安装依赖
pnpm install

# 开发环境运行
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 🎨 设计特色

- **深色主题**: 营造梦幻神秘氛围
- **紫色渐变**: 象征潜意识与直觉
- **动态背景**: 使用着色器创造沉浸体验
- **响应式设计**: 完美适配移动端

## 📱 功能模块

### 🏠 着陆页结构
- **Hero区域** - AI電気羊标语轮播 + 动态背景
- **等候名单** - Supabase集成的邮箱收集
- **星座卡牌系统** - 12星座正反两面卡牌展示
- **数羊助眠** - 交互式数羊游戏演示
- **SR仪表盘** - Synchrony Rate可视化
- **Day/Night Ritual Loop** - 昼夜循环流程图
- **赛博养生** - 梦境处方签、虚拟温泉、赛博药膳
- **冥想音乐** - 432Hz/528Hz/963Hz试听
- **心理学教育** - 梦境理论科普
- **价格方案** - 免费版/专业版
- **FAQ** - 常见问题解答
- **CTA转化** - 最终行动号召

### ✅ 已实现功能
- [x] 多语言支持 (中文/日文/英文)
- [x] 星座卡牌翻转动画
- [x] 数羊游戏交互
- [x] SR仪表盘可视化
- [x] 等候名单Supabase集成
- [x] 响应式设计
- [x] TypeScript类型安全
- [x] 性能优化

### 🔧 待完善功能
- [ ] AI歌曲生成API集成
- [ ] AI短视频生成API集成
- [ ] 用户认证系统
- [ ] 个人数据面板
- [ ] 社交分享功能
- [ ] 推送通知

## 🌐 部署

### 本番环境
- **URL**: https://dream-eiec4jh1s-remasi.vercel.app
- **状态**: ✅ 正常运行
- **自动部署**: GitHub push触发

### Vercel部署（推荐）
1. 连接GitHub仓库到Vercel
2. 配置环境变量 (Supabase URL/Key)
3. 自动部署完成

### 环境变量配置
```bash
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
```

## 🎯 商业模式

### v0.1 MVP (当前版本)
- **免费体验**: 星座卡牌展示 + 数羊游戏演示
- **等候名单**: 邮箱收集，Beta版本优先体验

### v0.2 增强版 (计划中)
- **免费版**: 每日1次抽卡 + 基础数羊功能
- **专业版**: ¥98/月，无限抽卡 + SR仪表盘 + 完整ritual loop
- **次卡制**: ¥30/次，限定主题卡池

### v0.3 变现版 (未来)
- **单次解锁**: UR卡面/AI歌曲/Persona皮肤 (¥100-300)
- **月卡订阅**: 赛博养生包 (每日处方+Hz全解锁)
- **企业版**: B2B心理健康解决方案

## 📊 性能指标

### 当前状态
- **TypeScript**: ✅ 0个错误 (37个错误已修复)
- **构建时间**: ~23秒
- **Bundle大小**: 120kB (First Load: 250kB)
- **部署状态**: ✅ Ready

### 目标指标
- **Lighthouse评分**: 90+ (目标)
- **首屏加载**: < 2s
- **交互响应**: < 100ms
- **SEO优化**: 完整meta标签
- **多语言支持**: 中文/日文/英文

## 🤝 贡献指南

1. Fork本仓库
2. 创建功能分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送到分支: `git push origin feature/AmazingFeature`
5. 提交Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- **本番环境**: https://dream-eiec4jh1s-remasi.vercel.app
- **GitHub仓库**: https://github.com/SYNOVAW/dreamLP
- **公司官网**: https://www.synovawhisper.com
- **Twitter**: @SYNOVAWHISPER

## 🎨 设计理念

### Glassmorphism设计
- 透明玻璃质感
- 浅色字体系统
- 动态背景可见性
- 统一视觉语言

### 心理学基础
- **Synchrony Rate (SR)**: 梦与现实的同步率测量
- **Day/Night Ritual Loop**: 昼夜循环的心理仪式
- **AI電気羊**: 数羊助眠的科学化
- **星座卡牌**: 象征心理学的应用

---

**Made with 💜 by SYNOVA WHISPER**

*"人とAIが、ともに夢を見る最初の時代"*
