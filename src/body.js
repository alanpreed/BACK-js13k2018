export class Body {
  constructor(x, y, originX, originY, width, height, rotation, colour, drag) {
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

    this.drag = drag;
    
    this.rotationSpeed = 0;
  }

  update(){
    this.rotation += this.rotationSpeed;

    this.calculateDrag(this.drag);

    this.dx += this.ddx;
    this.x += this.dx;
    this.dy += this.ddy;
    this.y += this.dy;

    this.ddx = 0;
    this.ddy = 0;
  }

  calculateDrag(dragCoeff) {
    let drag = this.dx**2 + this.dy**2;

    if(drag != 0) {
      const speed = Math.sqrt(drag);
      drag = drag * dragCoeff;
      const dragX = -drag * this.dx/speed;
      const dragY = -drag * this.dy/speed;

      this.ddx += dragX;
      this.ddy += dragY;
    }
  }
}