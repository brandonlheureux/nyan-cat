import { PowerUp } from "./PowerUp.js";

export class Nuke extends PowerUp {
  constructor(x, y, entityImage, destroyAnimation) {
    super(x, y, entityImage, destroyAnimation);
  }

  pickUp = (target) => {
    target.nukes++;
  };
}
