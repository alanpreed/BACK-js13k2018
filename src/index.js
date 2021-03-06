import { init, Sprite, GameLoop, initKeys } from 'kontra'
import { Swimmer } from "./swimmer"
import '../index.css';

let { canvas } = init();

initKeys();

let swimmer = new Swimmer(400, 500, 400);

let loop = GameLoop({
  update: function () {
    swimmer.update();
  },
  render: function () {
    swimmer.render();
  }
});

loop.start();