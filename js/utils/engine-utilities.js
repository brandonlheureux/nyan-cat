import { ENEMY_WIDTH, GAME_HEIGHT, GAME_WIDTH } from "../data.js";

const nextEnemySpot = (enemies) => {
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots);
  }

  return candidate;
};

const addBackground = (root) => {
  const bg = document.createElement("img");

  bg.src = "images/stars.png";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  root.append(bg);
};

const checkCollision = (entity1, entity2) => {
  let rect1 = entity1.domElement.getBoundingClientRect();
  let rect2 = entity2.domElement.getBoundingClientRect();
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  ) {
    entity1.damage();
    entity2.damage();
  }
};

export { nextEnemySpot, addBackground, checkCollision };
