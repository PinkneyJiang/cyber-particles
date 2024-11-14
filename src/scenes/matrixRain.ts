import { ParticleColorPalette } from '../types';

const CHARACTERS = '0123456789ABCDEFHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';

export class MatrixRainScene {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private drops: number[] = [];
  private fontSize: number = 16;
  private columns: number = 0;
  private color: string = '#00ff41';

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, palette?: Partial<ParticleColorPalette>) {
    this.ctx = ctx;
    this.color = palette?.accent || '#00ff41';
    this.resize(width, height);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.columns = Math.floor(width / this.fontSize);
    this.drops = Array.from({ length: this.columns }, () => Math.floor((Math.random() * -height) / this.fontSize));
  }

  public render(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      if (y > 0) {
        this.ctx.fillText(char, x, y);
      }

      if (y > this.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }
}
