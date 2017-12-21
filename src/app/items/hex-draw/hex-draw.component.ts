import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// import {Hexagon, Vec2} from '../../models/hexagon';
import {Mercedes, Vec2} from '../../models/mercedes';

interface screenSize {
  width: number;
  height: number;
}

@Component({
  selector: 'app-hex-draw',
  templateUrl: './hex-draw.component.html',
  styleUrls: ['./hex-draw.component.sass']
})
export class HexDrawComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  time = 0;
  screenSize: screenSize = {
    width: 0,
    height: 0
  };
  MAIN_COLOR = '#1C1549';
  LINE_COLOR = '#231C4E';
  radius = 40;

  top = Math.PI / 2;
  topLeft = 7 * Math.PI / 6;
  topRight = 11 * Math.PI / 6;

  bottom = 3 * Math.PI / 2;
  bottomLeft = 5 * Math.PI / 6;
  bottomRight = Math.PI / 6;
  edgeHeight: number;
  mercedes = new Mercedes();

  constructor() {
    this.screenSize = this.getScreenSize();
    this.mercedes.top = new Vec2(this.top, this.radius);
    this.mercedes.topLeft = new Vec2(this.topLeft, this.radius);
    this.mercedes.topRight = new Vec2(this.topRight, this.radius);

    this.mercedes.bottom = new Vec2(this.bottom, this.radius);
    this.mercedes.bottomLeft = new Vec2(this.bottomLeft, this.radius);
    this.mercedes.bottomRight = new Vec2(this.bottomRight, this.radius);
    this.mercedes.center = new Vec2(0, 0);

    this.edgeHeight = this.radius * 2 * Math.sin(this.topLeft);
  }

  getScreenSize(): screenSize  {
    this.screenSize.height = document.documentElement.clientHeight;
    this.screenSize.width = document.documentElement.clientWidth;
    return this.screenSize;
  }

  drawMercedesTop(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number, time: number) {
    let point;
    ctx.beginPath();
    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);
    point = this.offsetFunction(this.mercedes.bottomLeft.x + offsetX, this.mercedes.bottomLeft.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);

    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);
    point = this.offsetFunction(this.mercedes.bottomRight.x + offsetX, this.mercedes.bottomRight.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);

    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);
    point = this.offsetFunction(this.mercedes.bottom.x + offsetX, this.mercedes.bottom.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);
    ctx.stroke();
  }
  drawMercedesBottom(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number, time: number) {
    let point;
    ctx.beginPath();
    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);

    point = this.offsetFunction(this.mercedes.topLeft.x + offsetX, this.mercedes.topLeft.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);

    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);
    point = this.offsetFunction(this.mercedes.topRight.x + offsetX, this.mercedes.topRight.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);

    point = this.offsetFunction(this.mercedes.center.x + offsetX, this.mercedes.center.y + offsetY, time);
    ctx.moveTo(point[0], point[1]);
    point = this.offsetFunction(this.mercedes.top.x + offsetX, this.mercedes.top.y + offsetY, time);
    ctx.lineTo(point[0], point[1]);
    ctx.stroke();
  }

  offsetFunction(x:number, y:number, time: number): [number, number] {
    return [x + Math.sin((time + ((x + y) / 20)) / 20) * 40, y + Math.sin((time + ((x + y) / 20)) / 20) * 40];
  }

  ngOnInit() {
    requestAnimationFrame(this.draw.bind(this))
  }

  draw() {
    let time = this.time++;

    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.LINE_COLOR;
    const x = this.mercedes.bottom.x - this.mercedes.bottomRight.x;
    const y = this.mercedes.bottom.y - this.mercedes.bottomRight.y;
    const width = Math.sqrt(x*x + y*y);

    const height = -this.radius * Math.cos(2 * Math.PI / 3);

    for(let offsetY = 0; offsetY < this.screenSize.height; offsetY+= this.radius * 3) {
      for(let offsetX = -width; offsetX < this.screenSize.width; offsetX+= width) {
        this.drawMercedesTop(ctx, width + offsetX, height + offsetY, time);
      }
      for(let offsetX = -width; offsetX < this.screenSize.width; offsetX+= width) {
        this.drawMercedesBottom(ctx, width / 2 + offsetX, this.radius + offsetY, time);
      }
    }

    for(let offsetY = -this.radius * 1.5; offsetY < this.screenSize.height; offsetY+= this.radius * 3) {
      for(let offsetX = -width; offsetX < this.screenSize.width; offsetX+= width) {
        this.drawMercedesTop(ctx, width / 2 + offsetX, height + offsetY, time);
      }
      for(let offsetX = -width; offsetX < this.screenSize.width; offsetX+= width) {
        this.drawMercedesBottom(ctx, width  + offsetX, this.radius + offsetY, time);
      }
    }
    requestAnimationFrame(this.draw.bind(this))
  }

}
