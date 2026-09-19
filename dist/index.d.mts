import React from 'react';

type ParticleSceneType = 'aurora' | 'matrixRain' | 'sakuraDrift' | 'goldDust';
interface ParticleColorPalette {
    accent: string;
    accentSecondary?: string;
    particleBase?: string;
}
interface ParticleEngineOptions {
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
interface CyberParticlesProps extends React.HTMLAttributes<HTMLCanvasElement>, ParticleEngineOptions {
    /** 容器自定义 CSS 类名 */
    className?: string;
    /** 画布样式 */
    style?: React.CSSProperties;
}

declare const CyberParticles: React.FC<CyberParticlesProps>;

declare class ParticleEngine {
    private canvas;
    private ctx;
    private options;
    private currentScene;
    private rafId;
    private isRunning;
    private resizeObserver;
    constructor(canvas: HTMLCanvasElement, options: ParticleEngineOptions);
    setScene(scene: ParticleSceneType): void;
    private initScene;
    private handleResize;
    private bindEvents;
    start(): void;
    stop(): void;
    destroy(): void;
}

export { CyberParticles, type CyberParticlesProps, type ParticleColorPalette, ParticleEngine, type ParticleEngineOptions, type ParticleSceneType, CyberParticles as default };
