export class Mercedes {
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

  constructor(angle: number, radius: number) {
    this.x = radius * Math.cos(angle);
    this.y = -radius * Math.sin(angle);
  }
}
