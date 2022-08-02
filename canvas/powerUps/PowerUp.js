import { Entity } from "../entities/Entity.js";

export class PowerUp extends Entity {
  constructor(x, y, entityImage, destroyAnimation) {
    super(
      1,
      "player",
      5,
      0.05,
      x,
      y,
      32,
      32,
      entityImage,
      destroyAnimation
    );
  }
}
