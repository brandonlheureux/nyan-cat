// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = Math.max(document.documentElement.clientWidth);
const GAME_HEIGHT = Math.max(document.documentElement.clientHeight);

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 10;

// These constants represent the player width and height.
const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

const PLAYER_LIVES = 3;

export {
  GAME_HEIGHT,
  GAME_WIDTH,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  MAX_ENEMIES,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_LIVES,
};
