import { ParticleEngineOptions, ParticleSceneType } from '../types';
import { MatrixRainScene } from '../scenes/matrixRain';
import { AuroraScene } from '../scenes/aurora';
import { SakuraDriftScene } from '../scenes/sakuraDrift';
import { GoldDustScene } from '../scenes/goldDust';

interface SceneInstance {
  resize(w: number, h: number): void;
  render(): void;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: ParticleEngineOptions;
  private currentScene: SceneInstance | null = null;
  private rafId: number | null = null;
  private isRunning = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(canvas: HTMLCanvasElement, options: ParticleEngineOptions) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context from canvas');
    this.ctx = ctx;
    this.options = options;

    this.initScene(options.scene);
    this.bindEvents();
    this.start();
  }

  public setScene(scene: ParticleSceneType): void {
    this.options.scene = scene;
    this.initScene(scene);
  }

  private initScene(scene: ParticleSceneType): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const { palette, density } = this.options;

    switch (scene) {
      case 'matrixRain':
        this.currentScene = new MatrixRainScene(this.ctx, width, height, palette);
        break;
      case 'aurora':
        this.currentScene = new AuroraScene(this.ctx, width, height, palette);
        break;
      case 'sakuraDrift':
        this.currentScene = new SakuraDriftScene(this.ctx, width, height, palette, density);
        break;
      case 'goldDust':
        this.currentScene = new GoldDustScene(this.ctx, width, height, palette, density);
        break;
    }
  }

  private handleResize = (): void => {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.scale(dpr, dpr);

    if (this.currentScene) {
      this.currentScene.resize(w, h);
    }
  };

  private bindEvents(): void {
    this.handleResize();

    if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
      this.resizeObserver = new ResizeObserver(() => this.handleResize());
      this.resizeObserver.observe(this.canvas.parentElement);
    } else {
      window.addEventListener('resize', this.handleResize);
    }

    if (this.options.pauseWhenHidden !== false) {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    }
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;
      if (this.currentScene) {
        this.currentScene.render();
      }
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  public destroy(): void {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.handleResize);
    }
  }
}
