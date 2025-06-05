import { ParticleColorPalette } from '../types';

interface Dust {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  speedY: number;
  pulseSpeed: number;
  pulse: number;
  color: string;
}

export class GoldDustScene {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private particles: Dust[] = [];
  private count: number = 100;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    palette?: Partial<ParticleColorPalette>,
    density = 1.0
  ) {
    this.ctx = ctx;
    this.count = Math.floor(100 * density);
    const primary = palette?.accent || '251, 191, 36'; // Amber-400 RGB

    this.particles = Array.from({ length: this.count }, () => {
      const baseAlpha = Math.random() * 0.6 + 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        alpha: baseAlpha,
        baseAlpha,
        speedY: -(Math.random() * 0.4 + 0.15),
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulse: Math.random() * Math.PI,
        color: primary,
      };
    });

    this.resize(width, height);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public render(): void {
    this.ctx.fillStyle = 'rgba(9, 9, 11, 0.2)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;
      p.alpha = p.baseAlpha + Math.sin(p.pulse) * 0.2;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, p.alpha)})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }
}
