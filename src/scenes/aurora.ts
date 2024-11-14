import { ParticleColorPalette } from '../types';

interface AuroraWave {
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  color: string;
}

export class AuroraScene {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private waves: AuroraWave[] = [];
  private time: number = 0;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, palette?: Partial<ParticleColorPalette>) {
    this.ctx = ctx;
    const accent1 = palette?.accent || 'rgba(6, 182, 212, 0.35)';
    const accent2 = palette?.accentSecondary || 'rgba(168, 85, 247, 0.3)';

    this.waves = [
      { amplitude: 70, wavelength: 0.003, speed: 0.0015, phase: 0, color: accent1 },
      { amplitude: 100, wavelength: 0.002, speed: -0.0012, phase: 2, color: accent2 },
      { amplitude: 60, wavelength: 0.004, speed: 0.002, phase: 4, color: 'rgba(56, 189, 248, 0.25)' },
    ];
    this.resize(width, height);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public render(): void {
    this.ctx.fillStyle = 'rgba(9, 9, 11, 0.15)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.time += 1;

    for (const wave of this.waves) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      const centerY = this.height * 0.45;

      for (let x = 0; x <= this.width; x += 8) {
        const y =
          centerY +
          Math.sin(x * wave.wavelength + this.time * wave.speed + wave.phase) * wave.amplitude +
          Math.cos(x * 0.0015 + this.time * 0.0008) * (wave.amplitude * 0.4);

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();

      const gradient = this.ctx.createLinearGradient(0, centerY - wave.amplitude, 0, this.height);
      gradient.addColorStop(0, wave.color);
      gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }
}
