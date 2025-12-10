# @pinkney/cyber-particles

> 🌌 Ultra-smooth, 60 FPS cyberpunk particle fluid engine for React & Vanilla Canvas.  
> 极速 60 FPS 物理粒子与赛博朋克流体画布引擎（黑客帝国代码雨、极光涟漪、3D樱花飘落、微光金粉）。

[![npm version](https://img.shields.io/npm/v/@pinkney/cyber-particles.svg?style=flat-square)](https://www.npmjs.com/package/@pinkney/cyber-particles)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## ✨ Features (核心特性)

- 🎨 **4 Preset Cyberpunk Scenes (四大科技视觉场景)**:
  - `matrixRain`: 经典黑客帝国十六进制字符数字雨
  - `aurora`: 正弦波极光流体星云涟漪
  - `sakuraDrift`: 带有 3D 翻转透视的微物理旋转飘落樱花瓣
  - `goldDust`: 科技微光金粉漫射
- ⚡ **60 FPS & Energy-Saving (自适应与节能省电)**:
  - 自动适配 Retina / 高分屏 DPR，边缘极致锐利；
  - 监听 `document.visibilitychange`，标签页失焦或切换后台时**自动休眠以节省电池与 CPU**；
  - 响应式 `ResizeObserver`，父容器缩放自动适配。
- 📦 **React & Vanilla JS Dual Support (React 与 原生双支持)**:
  - `<CyberParticles scene="matrixRain" />`：React 声明式组件一行引入；
  - `new ParticleEngine(canvas, options)`：Vue、Svelte、纯 HTML 随时随地挂载。

---

## 📦 Installation (安装)

```bash
npm install @pinkney/cyber-particles
# or
pnpm add @pinkney/cyber-particles
# or
yarn add @pinkney/cyber-particles
```

---

## 🚀 Quick Start (快速上手)

### 1. React Component Usage

```tsx
import React from 'react';
import { CyberParticles } from '@pinkney/cyber-particles';

export function HeroBackground() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#09090b' }}>
      {/* 粒子全屏背景 */}
      <CyberParticles
        scene="aurora"
        palette={{ accent: 'rgba(6, 182, 212, 0.4)', accentSecondary: 'rgba(168, 85, 247, 0.3)' }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: 40, color: '#fff' }}>
        <h1>Cyberpunk Future OS</h1>
      </div>
    </div>
  );
}
```

### 2. Vanilla JS / Canvas Usage (非 React 场景)

```javascript
import { ParticleEngine } from '@pinkney/cyber-particles';

const canvas = document.getElementById('my-canvas');
const engine = new ParticleEngine(canvas, {
  scene: 'matrixRain',
  palette: { accent: '#00ff41' },
});

// 动态切换场景
engine.setScene('sakuraDrift');

// 销毁
// engine.destroy();
```

---

## 🛠️ API Reference

### Props / Options

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `scene` | `'matrixRain' \| 'aurora' \| 'sakuraDrift' \| 'goldDust'` | `'matrixRain'` | 视觉场景预设 |
| `palette` | `{ accent?: string, accentSecondary?: string }` | `undefined` | 自定义粒子主色/辅色 |
| `density` | `number` | `1.0` | 粒子密度与数量缩放倍数 |
| `pauseWhenHidden` | `boolean` | `true` | 后台标签页或遮挡时是否自动暂停节省能耗 |

---

## 📄 License

MIT © [Pinkney Jiang](https://github.com/pinkney)
