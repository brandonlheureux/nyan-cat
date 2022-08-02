import { MAX_ENEMIES, GAME_HEIGHT, GAME_WIDTH } from "./data.js";
import { Enemy } from "./Enemy.js";
import {
  addBackground,
  checkCollision,
  nextEnemySpot,
} from "./utils/engine-utilities.js";
import { Player } from "./Player.js";
import { Text } from "./Text.js";

class Engine {
  lastFrameDate;
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    addBackground(this.root);
  }

  gameLoop = () => {
    if (this.lastFrameDate === undefined) {
      this.lastFrameDate = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrameDate;
    this.lastFrameDate = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
      checkCollision(enemy, this.player);
    });

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.hitPoints < 1) enemy.destroy();

      if (enemy.position.y > GAME_HEIGHT) {
        enemy.destroy(false);
      }
      return enemy.hitPoints > 0;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
      this.player.destroy();
      this.enemies.forEach((enemy) => enemy.destroy());
      let text = new Text(this.root, GAME_WIDTH / 3, GAME_HEIGHT / 2);
      text.update("game over");
      console.log("Game over");
      return;
    }

    setTimeout(this.gameLoop, 1000 / 60); //60 fps
  };

  isPlayerDead = () => {
    return this.player.hitPoints < 1;
  };
}

export { Engine };
