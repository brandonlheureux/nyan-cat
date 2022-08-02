import { Vector2d } from "../physics/Vector2d.js";

export const getPlayerDirection = (keyMap) => {
  let xDirection =
    (keyMap["KeyD"] || keyMap["ArrowRight"]) -
    (keyMap["KeyA"] || keyMap["ArrowLeft"]);
  let yDirection =
    (keyMap["KeyS"] || keyMap["ArrowDown"]) -
    (keyMap["KeyW"] || keyMap["ArrowUp"]);

  return (new Vector2d(xDirection, yDirection)).normalize();
};