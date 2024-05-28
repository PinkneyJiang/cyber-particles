import React from 'react';

export type ParticleSceneType = 'aurora' | 'matrixRain' | 'sakuraDrift' | 'goldDust';

export interface ParticleColorPalette {
  accent: string;
  accentSecondary?: string;
  particleBase?: string;
}

export interface ParticleEngineOptions {
  scene: ParticleSceneType;
  /** 自定义主色调 (十六进制或 rgba) */
  palette?: Partial<ParticleColorPalette>;
  /** 粒子密度乘数 (默认: 1.0) */
  density?: number;
  /** 最大 FPS 上限 (默认: 60) */
  maxFps?: number;
  /** 是否在失焦/不可见时暂停以节省性能 (默认: true) */
  pauseWhenHidden?: boolean;
}

export interface CyberParticlesProps extends React.HTMLAttributes<HTMLCanvasElement>, ParticleEngineOptions {
  /** 容器自定义 CSS 类名 */
  className?: string;
  /** 画布样式 */
  style?: React.CSSProperties;
}
