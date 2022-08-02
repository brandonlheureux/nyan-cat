import {
  GAME_HEIGHT,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  GAME_WIDTH,
} from "./data.js";
import { Entity } from "./common/Entity.js";

class Player extends Entity {
  constructor(root) {
    super(
      1,
      "Player",
      3,
      { x: 2 * PLAYER_WIDTH, y: GAME_HEIGHT - PLAYER_HEIGHT - 10 },
      document.createElement("img"),
      "./images/explode.gif"
    );

    this.domElement.src = "images/player.png";
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.position.x}px`;
    this.domElement.style.top = ` ${this.position.y}px`;
    this.domElement.style.zIndex = "10";
    document.getElementById("app").appendChild(this.domElement);
  }

  moveLeft() {
    if (this.position.x > 0) {
      this.position.x = this.position.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.position.x}px`;
  }

  moveRight() {
    if (this.position.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.position.x = this.position.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.position.x}px`;
  }
}
export { Player };
