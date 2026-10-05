import type { Pen, Ctx } from './draw';

export interface FrameInfo {
  sheet?: string;
  title?: string;
  coords?: [number, number] | null;
  hud?: number;
  marks?: number;
}

export interface Frame {
  t: number;
  lt: number;
  p: number;
  dur: number;
  g: Ctx;
  pen: Pen;
  glow: Ctx;
  info: FrameInfo;
}

export abstract class Scene {
  start = 0;
  end = 0;
  init(): void | Promise<void> {}
  abstract render(f: Frame): void;
  samples(_t: number): number {
    return 0;
  }
}

export interface Entry {
  id: string;
  start: number;
  end: number;
  scene: Scene;
}
