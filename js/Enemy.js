import { ENEMY_HEIGHT, ENEMY_WIDTH } from "./data.js";
import { Entity } from "./common/Entity.js";

class Enemy extends Entity {
  speed = Math.random() / 2 + 0.25;
  constructor(theRoot, enemySpot) {
    super(
      1,
      "Enemy",
      1,
      {
        x: enemySpot * ENEMY_WIDTH,
        y: -ENEMY_HEIGHT,
      },
      document.createElement("img"),
      "../images/explode.gif"
    );

    this.spot = enemySpot;

    // We give it a src attribute to specify which image to display.
    this.domElement.src = "./images/enemy.png";
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.position.x}px`;
    this.domElement.style.top = `${this.position.y}px`;
    this.domElement.style.zIndex = 5;
    theRoot.appendChild(this.domElement);
  }

  update(timeDiff) {
    this.position.y = this.position.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.position.y}px`;
  }
}

export { Enemy };
