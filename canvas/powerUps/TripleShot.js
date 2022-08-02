import { PowerUp } from "./PowerUp.js";

export class TripleShot extends PowerUp {
  constructor(x, y, entityImage, destroyAnimation) {
    super(x, y, entityImage, destroyAnimation);
  }

  pickUp = (target) => {
    clearTimeout(target.tripleBulletsTimer);
    target.tripleBullets = true;
    let timer = setTimeout(() => {
      target.tripleBullets = false;
    }, 10000);
    target.tripleBulletsTimer = timer;
  };
}
