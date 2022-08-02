import { Vector2d } from "../physics/Vector2d.js";

export class Entity {
  constructor(
    hitPoints = 1,
    team,
    maxSpeed,
    acceleration,
    x,
    y,
    width = 60,
    height = 40,
    entityImage,
    destroyAnimation = ""
  ) {
    this.hitPoints = hitPoints;
    this.team = team;
    this.maxSpeed = maxSpeed;
    this.acceleration = acceleration;
    this.position = new Vector2d(x, y);
    this.oldPosition = new Vector2d(x, y);
    this.trail = [];
    this.speed = 0;
    this.velocity = new Vector2d(0, 0);
    this.dimensions = { width: width, height: height };
    this.collideable = true;
    this.destroyed = false;
    this.removeable = false;
    this.baseImage = entityImage;
    this.destroyedAnimation = destroyAnimation;
    this.destroyedAnimationFrame = 0;
  }
  damage = (amount = 1) => {
    this.hitPoints -= amount;
    // if (this.hitPoints < 1) this.destroy()
  };

  heal = (amount = 1) => {
    this.hitPoints += amount;
  };

  destroy = () => {
    this.speed = 0;
    this.velocity = new Vector2d(0, 0);
    this.collideable = false;
    this.destroyed = true;
  };

  draw = (ctx) => {
    if (this.baseImage) {
      // console.log(this.baseImage);
      if (!this.destroyed) {
        ctx.drawImage(
          this.baseImage,
          this.position.x,
          this.position.y,
          this.dimensions.width,
          this.dimensions.height
        );
      } else {
        if (
          this.destroyedAnimationFrame >=
          this.destroyedAnimation.imageList.length - 1
        ) {
          this.removeable = true;
        } else {
          ctx.drawImage(
            this.destroyedAnimation.imageList[this.destroyedAnimationFrame],
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height
          );
          this.destroyedAnimationFrame++;
        }
      }
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  };
}
