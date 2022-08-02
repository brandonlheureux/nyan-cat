import { Entity } from "./Entity.js";

export class Enemy extends Entity {
  constructor(
    hitpoints,
    team,
    maxSpeed,
    acceleration,
    x,
    y,
    baseImage,
    deathAnimation
  ) {
    super(
      hitpoints,
      team,
      maxSpeed,
      acceleration,
      x,
      y,
      50,
      30,
      baseImage,
      deathAnimation
    );
    this.name = "Nyan";
  }
}
