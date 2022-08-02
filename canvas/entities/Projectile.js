import { Entity } from "./Entity.js";
import { Vector2d } from "../physics/Vector2d.js";

export class Projectile extends Entity {
  constructor(
    hitpoints,
    team,
    maxSpeed,
    acceleration,
    x,
    y,
    direction = new Vector2d(0, -1),
    baseImage,
    deathAnimation
  ) {
    super(
      hitpoints,
      team,
      maxSpeed,
      acceleration,
      x + 15,
      y + 10,
      30,
      20,
      baseImage,
      deathAnimation
    );
    this.direction = direction;

    this.name = "bullet";
  }

  drawTrail(ctx, trailImg) {
    this.trail.forEach((position) => {
      ctx.drawImage(
        trailImg,
        position.x,
        position.y,
        this.dimensions.width,
        this.dimensions.height
      );
    });
  }
}
