import {Limb} from "./limb"
import {Body} from "./body"
import {Sprite} from "kontra"

const ARM_LENGTH = 80;
const ARM_WIDTH = 10;
const BODY_LENGTH = 150;
const BODY_WIDTH = 30;
const LEG_LENGTH = 100;
const LEG_WIDTH = 15;

export class Swimmer {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.body = new Body(x, y, 0.5, 0.5, BODY_WIDTH, BODY_LENGTH, Math.PI/4, 'red');

    this.legLeft = new Limb(0, 0.9, 0.5, 0.1, LEG_WIDTH, LEG_LENGTH, Math.PI/4, 'green', this.body);
    this.legRight = new Limb(0, 0.9, 0.5, 0.1, LEG_WIDTH, LEG_LENGTH, -Math.PI/4, 'blue', this.body);

    this.armLeft = new Limb(0, -0.4, 0.5, 0.1, ARM_WIDTH, ARM_LENGTH, Math.PI/4, 'blue', this.body);
    this.armRight = new Limb(0, -0.4, 0.5, 0.1, ARM_WIDTH, ARM_LENGTH, -Math.PI/4, 'cyan', this.body);

    this.body.rotationSpeed = Math.PI/180;
    this.armLeft.rotationSpeed = Math.PI/180;
  }

  update() {
    this.body.update();
    this.legLeft.update(this.body);
    this.legRight.update(this.body);
    this.armLeft.update(this.body);
    this.armRight.update(this.body);
  }

  render() {
    Sprite(this.body).render();

    Sprite(this.legLeft).render();
    Sprite(this.legRight).render();

    Sprite(this.armLeft).render();
    Sprite(this.armRight).render();
  }
}
