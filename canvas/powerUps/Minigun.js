import { PowerUp } from "./PowerUp.js";

export class Minigun extends PowerUp {
  constructor(x, y, entityImage, destroyAnimation) {
    super(x, y, entityImage, destroyAnimation);
  }

  pickUp = (target) => {
    clearTimeout(target.minigunTimer);
    target.reloadTimer = 50;
    let timer = setTimeout(() => {
      target.reloadTimer = 200;
    }, 10000);
    target.minigunTimer = timer;
  };
}
