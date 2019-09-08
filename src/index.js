import { init, Sprite, GameLoop } from 'kontra'
import {Swimmer} from "./swimmer"

let { canvas } = init();

let swimmer = new Swimmer(400, 750);

let loop = GameLoop({
  update: function () {
    swimmer.update();
  },
  render: function () {
    swimmer.render();
  }
});

loop.start();