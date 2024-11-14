import { ParticleColorPalette } from '../types';

interface Petal {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  flip: number;
  flipSpeed: number;
  color: string;
}

export class SakuraDriftScene {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private petals: Petal[] = [];
  private count: number = 65;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    palette?: Partial<ParticleColorPalette>,
    density = 1.0
  ) {
    this.ctx = ctx;
    this.count = Math.floor(65 * density);
    const primaryColor = palette?.accent || 'rgba(244, 114, 182, 0.75)';

    this.petals = Array.from({ length: this.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      size: (Math.random() * 8 + 8) * (Math.random() * 0.5 + 0.8),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      vx: Math.random() * 1.5 + 0.8,
      vy: Math.random() * 1.2 + 0.6,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.04 + 0.01,
      color: primaryColor,
    }));

    this.resize(width, height);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (const p of this.petals) {
      p.x += p.vx * p.z;
      p.y += p.vy * p.z;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      if (p.x > this.width + 30) p.x = -30;
      if (p.y > this.height + 30) p.y = -30;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.scale(Math.cos(p.flip), 1);

      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.ellipse(0, 0, p.size * p.z, (p.size / 2) * p.z, 0, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }
  }
}
