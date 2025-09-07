// 统一的玻璃态卡片样式
export const glassCardStyles = {
  // 基础玻璃卡片
  base: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10",
  
  // 高亮玻璃卡片 (用于重要内容)
  highlight: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl shadow-fuchsia-500/10",
  
  // 悬浮效果玻璃卡片
  hover: "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300",
  
  // 内容区域
  content: "backdrop-blur-sm",
  
  // 字体颜色系统
  text: {
    primary: "text-slate-100", // 主要文字 - 最亮
    secondary: "text-slate-200", // 次要文字 - 稍暗
    muted: "text-slate-300", // 辅助文字 - 中等
    subtle: "text-slate-400", // 微妙文字 - 较暗
    accent: "text-fuchsia-200", // 强调文字 - 品牌色浅色
  }
}

// 特殊场景的玻璃效果
export const specialGlassStyles = {
  // 等候名单卡片
  waitlist: "bg-gradient-to-r from-fuchsia-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/15",
  
  // CTA卡片
  cta: "bg-gradient-to-r from-fuchsia-600/15 to-cyan-600/15 backdrop-blur-xl border border-white/20",
  
  // 手机预览卡片
  mockup: "bg-gradient-to-b from-slate-800/60 to-slate-900/40 backdrop-blur-xl border border-white/10",
  
  // 价格卡片高亮版
  pricing: "bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl shadow-fuchsia-500/10"
}
