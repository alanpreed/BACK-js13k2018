import {Limb} from "./limb"
import {Body} from "./body"
import {Sprite, keyPressed} from "kontra"

const ARM_LENGTH = 80;
const ARM_WIDTH = 10;
const BODY_LENGTH = 150;
const BODY_WIDTH = 20;
const LEG_LENGTH = 100;
const LEG_WIDTH = 15;

const ARM_ROT_SPEED = Math.PI/100;
const LEG_ROT_SPEED = Math.PI/70;

const BODY_ROT_SPEED = Math.PI/180;

const MAX_LEG_ANGLE = Math.PI/4;

const SWIMMER_MASS = 100;

export class Swimmer {
  constructor(x, y, waterHeight) {
    this.waterHeight = waterHeight;

    this.body = new Body(x, y, 0.5, 0.5, BODY_WIDTH, BODY_LENGTH, Math.PI/4, 'red', 0.09, SWIMMER_MASS);
    this.legLeft = new Limb(0, 0.9, 0.5, 0.1, LEG_WIDTH, LEG_LENGTH, Math.PI/4, 'green', this.body);
    this.legRight = new Limb(0, 0.9, 0.5, 0.1, LEG_WIDTH, LEG_LENGTH, Math.PI/4, 'blue', this.body);
    this.armLeft = new Limb(0, -0.4, 0.5, 0.1, ARM_WIDTH, ARM_LENGTH, Math.PI/4, 'blue', this.body);
    this.armRight = new Limb(0, -0.4, 0.5, 0.1, ARM_WIDTH, ARM_LENGTH, -Math.PI/4, 'cyan', this.body);
  }

  update() {
    let legForce = false;
    let armForce = false;

    if(keyPressed('s') && (this.legRight.rotation - this.body.rotation) < MAX_LEG_ANGLE) {
      this.legRight.rotationSpeed = LEG_ROT_SPEED;
    }
    else if (keyPressed('x') && (this.legRight.rotation - this.body.rotation) > -MAX_LEG_ANGLE) {
      this.legRight.rotationSpeed = -LEG_ROT_SPEED;
      legForce = true;
    }
    else {
      this.legRight.rotationSpeed = 0;
    }

    if(keyPressed('k') && (this.legLeft.rotation - this.body.rotation) < MAX_LEG_ANGLE) {
      this.legLeft.rotationSpeed = LEG_ROT_SPEED;
    }
    else if (keyPressed('m') && (this.legLeft.rotation - this.body.rotation) > -MAX_LEG_ANGLE) {
      this.legLeft.rotationSpeed = -LEG_ROT_SPEED;
      legForce = true;
    }
    else {
      this.legLeft.rotationSpeed = 0;
    }

    if(keyPressed('p')){
      this.armLeft.rotationSpeed = ARM_ROT_SPEED;
      armForce = true;
    }
    else {
      this.armLeft.rotationSpeed = 0;
    }    
    
    if(keyPressed('q')){
      this.armRight.rotationSpeed = ARM_ROT_SPEED;
      armForce = true;
    }
    else {
      this.armRight.rotationSpeed = 0;
    }

    if (legForce && this.body.rotation < 6 * Math.PI/16 ) {
      this.body.rotationSpeed = BODY_ROT_SPEED;
    }
    else if (this.body.rotation > 0) {
      this.body.rotationSpeed = -BODY_ROT_SPEED;
    }
    else {
      this.body.rotationSpeed = 0;
    }


    if (legForce){//} && this.body.y < this.waterHeight) {
        console.log("rising");
      this.body.applyForce(0, 6);
    }

    if (armForce) {
      console.log("arms");
      this.body.applyForce(0, 8);
    }

    //gravity
    this.body.applyForce(-this.body.rotation, -5);
   

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
