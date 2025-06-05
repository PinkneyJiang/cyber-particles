import React, { useEffect, useRef } from 'react';
import { CyberParticlesProps } from '../types';
import { ParticleEngine } from '../core/Engine';

export const CyberParticles: React.FC<CyberParticlesProps> = ({
  scene = 'matrixRain',
  palette,
  density = 1.0,
  maxFps = 60,
  pauseWhenHidden = true,
  className = '',
  style = {},
  ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new ParticleEngine(canvas, {
      scene,
      palette,
      density,
      maxFps,
      pauseWhenHidden,
    });
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [scene, palette, density, maxFps, pauseWhenHidden]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
      {...rest}
    />
  );
};

export default CyberParticles;
