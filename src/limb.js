export class Limb {
  constructor(xOffset, yOffset, originX, originY, width, height, rotation, colour, parentLimb) {
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.anchor = {x: originX, y: originY};
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.color = colour;
    this.rotationSpeed = 0;
    this.calculatePosition(parentLimb);
  }

  update(parentLimb){
    this.calculatePosition(parentLimb);
    this.rotation += this.rotationSpeed + parentLimb.rotationSpeed;
  }

  calculatePosition(parentLimb) {
    const xShift = this.yOffset * parentLimb.height / 2 * Math.sin(parentLimb.rotation);
    const yShift = this.yOffset * parentLimb.height / 2 * Math.cos(parentLimb.rotation);

    this.x = parentLimb.x - xShift;
    this.y = parentLimb.y + yShift;
  }
}