import { Engine } from "./Engine.js";

// this game does not have proper separation of concern.
// the Enemy instance does not need any information other than it's own settings
// same with Player instance
// spaghettification is bad

const gameEngine = new Engine(document.getElementById("app"));

const keydownHandler = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

document.addEventListener("keydown", keydownHandler);

gameEngine.gameLoop();
