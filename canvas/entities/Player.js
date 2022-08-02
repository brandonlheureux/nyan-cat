import { Entity } from "./Entity.js";
import { Vector2d } from "../physics/Vector2d.js";
import { Projectile } from "./Projectile.js";

export class Player extends Entity {
  constructor(
    hitpoints,
    team,
    maxSpeed,
    acceleration,
    x,
    y,
    baseImage,
    deathAnimation,
    projectileImage,
    projectileDestroyedAnimation
  ) {
    super(
      hitpoints,
      team,
      maxSpeed,
      acceleration,
      x,
      y,
      60,
      40,
      baseImage,
      deathAnimation
    );
    this.name = "Player";

    this.reloadTimer = 200;
    this.lastShotTime = new Date().getTime();
    this.tripleBullets = false;
    this.minigunTimer;
    this.tripleBulletsTimer;
    this.nukes = 0;
    this.nukeRate = 1000;
    this.projectileImage = projectileImage;
    this.projectileDestroyedAnimation = projectileDestroyedAnimation;
  }

  shoot = (projectileList, mousePosition) => {
    let currentTime = new Date().getTime();
    let direction = mousePosition.subtract(this.position).normalize();
    if (currentTime - this.lastShotTime >= this.reloadTimer) {
      projectileList.push(
        new Projectile(
          1,
          "Player",
          30,
          0.5,
          this.position.x,
          this.position.y,
          direction,
          this.projectileImage,
          this.projectileDestroyedAnimation
        )
      );
      if (this.tripleBullets) {
        projectileList.push(
          new Projectile(
            1,
            "Player",
            30,
            0.5,
            this.position.x,
            this.position.y,
            direction.rotate(20).normalize(),
            this.projectileImage,
            this.projectileDestroyedAnimation
          )
        );
        projectileList.push(
          new Projectile(
            1,
            "Player",
            30,
            0.5,
            this.position.x,
            this.position.y,
            direction.rotate(-20).normalize(),
            this.projectileImage,
            this.projectileDestroyedAnimation
          )
        );
      }
      this.lastShotTime = currentTime;
    }
  };

  itsOver = (entities) => {
    if (this.nukes > 0) {
      this.nukes--;
      entities.forEach((entity) => {
        entity.destroy();
      });
    }
  };
}
