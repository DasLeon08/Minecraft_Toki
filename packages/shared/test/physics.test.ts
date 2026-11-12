import { describe, expect, it } from 'vitest';
import { AIR, STONE, WATER } from '../src/registry/blocks';
import { PlayerBody, type MoveInput } from '../src/physics/player';
import { raycast } from '../src/world/raycast';
import { makeWorld } from './helpers';

const idle: MoveInput = { forward: 0, strafe: 0, jump: false, sneak: false, sprint: false, yaw: 0 };

describe('Spielerphysik', () => {
  it('fällt und landet exakt auf dem Boden', () => {
    const { world } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    const p = new PlayerBody();
    p.flying = false;
    p.setPosition(0.5, 70, 0.5);
    let landed = 0;
    for (let i = 0; i < 60; i++) landed = Math.max(landed, p.tick(world, idle).landedFrom);
    expect(p.onGround).toBe(true);
    expect(p.y).toBeCloseTo(60, 5);
    expect(landed).toBeGreaterThan(9);
  });

  it('Sprunghöhe ≈ 1,25 Blöcke', () => {
    const { world } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    const p = new PlayerBody();
    p.setPosition(0.5, 60, 0.5);
    p.tick(world, idle);
    p.tick(world, idle);
    expect(p.onGround).toBe(true);
    let maxY = 60;
    p.tick(world, { ...idle, jump: true });
    for (let i = 0; i < 20; i++) {
      p.tick(world, idle);
      maxY = Math.max(maxY, p.y);
    }
    expect(maxY - 60).toBeGreaterThan(1.2);
    expect(maxY - 60).toBeLessThan(1.3);
  });

  it('Gehgeschwindigkeit ≈ 4,3 m/s, Sprinten ≈ 5,6 m/s', () => {
    const { world } = makeWorld(2, (_x, y) => (y < 60 ? STONE : AIR));
    const measure = (sprint: boolean): number => {
      const p = new PlayerBody();
      p.setPosition(0.5, 60, 0.5);
      p.tick(world, idle);
      for (let i = 0; i < 20; i++) p.tick(world, { ...idle, forward: 1, sprint });
      const z0 = p.z;
      for (let i = 0; i < 20; i++) p.tick(world, { ...idle, forward: 1, sprint });
      return Math.abs(p.z - z0);
    };
    expect(measure(false)).toBeCloseTo(4.317, 1);
    expect(measure(true)).toBeCloseTo(5.612, 1);
  });

  it('läuft nicht durch Wände', () => {
    const { world } = makeWorld(1, (x, y) => (y < 60 || (x === 3 && y < 63) ? STONE : AIR));
    const p = new PlayerBody();
    p.setPosition(0.5, 60, 0.5);
    for (let i = 0; i < 60; i++) p.tick(world, { ...idle, strafe: 1 });
    expect(p.x).toBeLessThanOrEqual(3 - 0.3 + 1e-9);
  });

  it('Schleichen verhindert das Herunterfallen von Kanten', () => {
    // Plattform x < 4 auf Höhe 60, daneben Abgrund
    const { world } = makeWorld(1, (x, y) => (y < 50 || (x < 4 && y < 60) ? STONE : AIR));
    const p = new PlayerBody();
    p.setPosition(2.5, 60, 0.5);
    p.tick(world, idle);
    for (let i = 0; i < 80; i++) p.tick(world, { ...idle, strafe: 1, sneak: true });
    expect(p.y).toBeCloseTo(60, 5);
    expect(p.x).toBeLessThan(4 + 0.3);
  });

  it('erkennt Wasser und sinkt darin langsam', () => {
    const { world } = makeWorld(1, (_x, y) => (y < 50 ? STONE : y < 62 ? WATER : AIR));
    const p = new PlayerBody();
    p.setPosition(0.5, 58, 0.5);
    p.tick(world, idle);
    expect(p.inWater).toBe(true);
    const y0 = p.y;
    for (let i = 0; i < 10; i++) p.tick(world, idle);
    expect(y0 - p.y).toBeLessThan(2);
  });

  it('Raycast trifft den ersten festen Block mit korrekter Normale', () => {
    const { world } = makeWorld(1, (_x, y) => (y < 60 ? STONE : AIR));
    const hit = raycast(world, 0.5, 61.6, 0.5, 0, -1, 0, 5);
    expect(hit).not.toBeNull();
    expect(hit!.y).toBe(59);
    expect(hit!.ny).toBe(1);
    expect(raycast(world, 0.5, 70, 0.5, 0, 1, 0, 5)).toBeNull();
  });
});
