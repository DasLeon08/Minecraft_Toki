/** Achsenparallele Box (Axis-Aligned Bounding Box). */
export class AABB {
  constructor(
    public minX: number,
    public minY: number,
    public minZ: number,
    public maxX: number,
    public maxY: number,
    public maxZ: number,
  ) {}

  static fromFeet(x: number, y: number, z: number, halfWidth: number, height: number): AABB {
    return new AABB(x - halfWidth, y, z - halfWidth, x + halfWidth, y + height, z + halfWidth);
  }

  offset(dx: number, dy: number, dz: number): AABB {
    return new AABB(this.minX + dx, this.minY + dy, this.minZ + dz, this.maxX + dx, this.maxY + dy, this.maxZ + dz);
  }

  expandTowards(dx: number, dy: number, dz: number): AABB {
    return new AABB(
      dx < 0 ? this.minX + dx : this.minX,
      dy < 0 ? this.minY + dy : this.minY,
      dz < 0 ? this.minZ + dz : this.minZ,
      dx > 0 ? this.maxX + dx : this.maxX,
      dy > 0 ? this.maxY + dy : this.maxY,
      dz > 0 ? this.maxZ + dz : this.maxZ,
    );
  }

  intersects(o: AABB): boolean {
    return (
      this.minX < o.maxX && this.maxX > o.minX && this.minY < o.maxY && this.maxY > o.minY && this.minZ < o.maxZ && this.maxZ > o.minZ
    );
  }

  /** Wie weit darf sich `this` entlang Y bewegen, bevor `o` getroffen wird. */
  clipY(o: AABB, dy: number): number {
    if (this.maxX <= o.minX || this.minX >= o.maxX || this.maxZ <= o.minZ || this.minZ >= o.maxZ) return dy;
    if (dy > 0 && this.maxY <= o.minY) {
      const d = o.minY - this.maxY;
      if (d < dy) return d;
    } else if (dy < 0 && this.minY >= o.maxY) {
      const d = o.maxY - this.minY;
      if (d > dy) return d;
    }
    return dy;
  }

  clipX(o: AABB, dx: number): number {
    if (this.maxY <= o.minY || this.minY >= o.maxY || this.maxZ <= o.minZ || this.minZ >= o.maxZ) return dx;
    if (dx > 0 && this.maxX <= o.minX) {
      const d = o.minX - this.maxX;
      if (d < dx) return d;
    } else if (dx < 0 && this.minX >= o.maxX) {
      const d = o.maxX - this.minX;
      if (d > dx) return d;
    }
    return dx;
  }

  clipZ(o: AABB, dz: number): number {
    if (this.maxX <= o.minX || this.minX >= o.maxX || this.maxY <= o.minY || this.minY >= o.maxY) return dz;
    if (dz > 0 && this.maxZ <= o.minZ) {
      const d = o.minZ - this.maxZ;
      if (d < dz) return d;
    } else if (dz < 0 && this.minZ >= o.maxZ) {
      const d = o.maxZ - this.minZ;
      if (d > dz) return d;
    }
    return dz;
  }
}
