import { Vector2d } from "./Vector2d.js";

export class Movement {
  constructor(
    friction = 0.05,
    dragForces = [
      { name: "gravity", factor: 0.05, direction: new Vector2d(0, 1) },
    ]
  ) {
    this.friction = friction;
    this.dragForces = dragForces;
  }

  move = (entity, direction, time) => {
    // get current speed
    let newSpeed = time * entity.acceleration;

    // get applied velocity
    let newVelocity = direction.multiply(newSpeed);

    // combine velocities for total "speed"
    entity.velocity = entity.velocity.add(newVelocity);

    // drag forces
    entity.velocity = entity.velocity.multiply(1 - this.friction);
    this.dragForces.forEach((force) => {
      entity.velocity = entity.velocity.add(
        force.direction.multiply(force.factor)
      );
    });

    // limit to normalized max speed
    entity.velocity = entity.velocity.limitTo(entity.maxSpeed);

    // update position
    entity.trail.push(entity.position);
    if (entity.trail.length > 4) {
      entity.trail.shift();
    }
    entity.oldPosition = entity.position;
    entity.position = entity.position.add(entity.velocity);
  };
}
