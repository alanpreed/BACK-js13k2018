export class Body {
  constructor(x, y, originX, originY, width, height, rotation, colour) {
    this.x = x;
    this.y = y;
    this.anchor = {x: originX, y: originY};
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.color = colour;
    this.rotationSpeed = 0;
  }

  update(){
    this.rotation += this.rotationSpeed;
  }
}