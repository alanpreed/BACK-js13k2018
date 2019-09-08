export class Body {
  constructor(x, y, originX, originY, width, height, rotation, colour) {
    this.x = x;
    this.y = y;
    this.anchor = {x: originX, y: originY};
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.color = colour;
    this.dx = 0;
    this.dy = 0;
    this.ddx = 0;
    this.ddy = 0;

    this.rotationSpeed = 0;
  }

  update(){
    this.rotation += this.rotationSpeed;
    this.dx += this.ddx;
    this.x += this.dx;
    this.dy += this.ddy;
    this.y += this.dy;
  }
}