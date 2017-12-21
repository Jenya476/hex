export class Hexagon {
  top: Vec2;
  topLeft: Vec2;
  topRight: Vec2;
  bottom: Vec2;
  bottomLeft: Vec2;
  bottomRight: Vec2;
  center: Vec2;
  edgeHeight: number;
}

export class Vec2 {
  x: number;
  y: number;

  constructor(angle: number, radius: number, scale: number) {
    this.x = radius * Math.cos(angle);
    this.y = -scale * radius * Math.sin(angle);
  }
}
