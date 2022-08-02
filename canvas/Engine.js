// import { Player } from "Player.js";
import { Vector2d } from "./physics/Vector2d.js";
import { getViewDimensions } from "./utils/getViewDimensions.js";
import { getPlayerDirection } from "./utils/inputUtils.js";

import { Player } from "./entities/Player.js";
import { Movement } from "./physics/Movement.js";
import { Enemy } from "./entities/Enemy.js";
import { checkCollision } from "./utils/collisionDetection.js";
import { withinBoundary } from "./utils/boundaryCheck.js";
import { Minigun } from "./powerUps/Minigun.js";
import { TripleShot } from "./powerUps/TripleShot.js";
import { Nuke } from "./powerUps/Nuke.js";
import { getDirectionTowards } from "./utils/getDirectionTowards.js";
import { HudElement } from "./HudElement.js";
import { loadImages } from "./utils/loadImages.js";
import { loadAnimation } from "./utils/loadAnimation.js";

export class Engine {
  constructor(canvasCtx) {
    this.ctx = canvasCtx;
    this.lastFrameDate;
    this.resolution = getViewDimensions();
    this.run = false;
    this.initialized = false;
    this.fpsAvg = [];

    this.movementEngine = new Movement(0.05, [
      // { name: "space drag", factor: 0.05, direction: new Vector2d(0, 1) },
    ]);

    this.keyPressed = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      ArrowDown: false,
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      Space: false, //shoot
    };

    this.player;
    this.entities = [];
    this.projectiles = [];
    this.powerUps = [
      { imageName: "minigunImage", constructor: Minigun },
      { imageName: "tripleShotImage", constructor: TripleShot },
      { imageName: "nukeImage", constructor: Nuke },
    ];
    this.powerUp;
    this.lastPowerUpDate = new Date().getTime();
    this.mousePosition = new Vector2d(0, 0);
    this.mouseClicked = false;
    this.pointsCounter = 0;
    this.nextLife = 0;
    this.image = document.createElement("img");
    this.image.src = "../images/space.jpeg";

    this.images;
    this.explosionAnimation;

    this.enemyCount = 100;
    this.enemyHp = 1;
  }

  init = () => {
    this.images = loadImages([
      {
        name: "playerImage",
        path: "../images/player.png",
      },
      {
        name: "enemyImage",
        path: "../images/enemy.png",
      },
      {
        name: "projectileImage",
        path: "../images/player.png",
      },
      {
        name: "tripleShotImage",
        path: "../images/Ammo.png",
      },
      { name: "minigunImage", path: "../images/minigun.png" },
      {
        name: "nukeImage",
        path: "../images/nuke.png",
      },
      {
        name: "smokeTrailImage",
        path: "../images/smoke.png",
      },
    ]);

    this.explosionAnimation = loadAnimation("explosion", [
      "../images/explodeAnimation/frame_00_delay-0.1s.png",
      "../images/explodeAnimation/frame_01_delay-0.1s.png",
      "../images/explodeAnimation/frame_02_delay-0.1s.png",
      "../images/explodeAnimation/frame_03_delay-0.1s.png",
      "../images/explodeAnimation/frame_04_delay-0.1s.png",
      "../images/explodeAnimation/frame_05_delay-0.1s.png",
      "../images/explodeAnimation/frame_06_delay-0.1s.png",
      "../images/explodeAnimation/frame_07_delay-0.1s.png",
      "../images/explodeAnimation/frame_08_delay-0.1s.png",
      "../images/explodeAnimation/frame_09_delay-0.1s.png",
      "../images/explodeAnimation/frame_10_delay-0.1s.png",
      "../images/explodeAnimation/frame_11_delay-0.1s.png",
      "../images/explodeAnimation/frame_12_delay-0.1s.png",
      "../images/explodeAnimation/frame_13_delay-0.1s.png",
      "../images/explodeAnimation/frame_14_delay-0.1s.png",
      "../images/explodeAnimation/frame_15_delay-0.1s.png",
      "../images/explodeAnimation/frame_16_delay-0.1s.png",
    ]);

    this.player = new Player(
      100,
      "player",
      20,
      0.05,
      this.resolution.width / 2,
      this.resolution.height / 2,
      this.images.playerImage,
      this.explosionAnimation,
      this.images.projectileImage,
      this.explosionAnimation
    );

    // direction inputs
    document.onkeydown = document.onkeyup = (e) => {
      // set to true when pressed
      this.keyPressed[e.code] = e.type == "keydown";
      if ((e.code === "KeyN" || e.code === "Space") && e.type === "keydown") {
        this.pointsCounter += this.entities.length;
        this.player.hitPoints++;
        this.player.itsOver(this.entities);
      }
    };

    window.onmousemove = (e) => {
      this.mousePosition = new Vector2d(e.clientX, e.clientY);
    };

    document.getElementById("app").onmousedown = document.getElementById(
      "app"
    ).onmouseup = (e) => {
      this.mouseClicked = e.type == "mousedown";
    };
  };

  start = () => {
    if (!this.initialized) this.init();
    this.run = true;
    this.step();
  };

  stop = () => {
    this.run = false;
    let gameOver = new HudElement(this.player);
    gameOver.draw(this.ctx, this.resolution);
  };

  step = () => {
    if (!this.run) return;
    //   get time difference
    if (this.lastFrameDate === undefined) {
      this.lastFrameDate = new Date().getTime();
    }
    let thisDate = new Date().getTime();
    let elapsedTime = thisDate - this.lastFrameDate;
    this.lastFrameDate = new Date().getTime();

    this.resolution = getViewDimensions();
    this.ctx.canvas.width = this.resolution.width;
    this.ctx.canvas.height = this.resolution.height;

    // game logic
    while (this.entities.length < this.enemyCount) {
      let random = Math.random();

      // border spawn
      let possibilities = [
        [0, random * this.resolution.height],
        [random * this.resolution.width, 0],
        [this.resolution.width - 100, (this.resolution.height - 100) * random],
        [(this.resolution.width - 150) * random, this.resolution.height - 100],
      ];
      let randomPos =
        possibilities[Math.floor(Math.random() * possibilities.length)];

      // circular spawn
      // randomPos = [
      //   this.resolution.width / 2 +
      //     (Math.cos(random * 360) * this.resolution.height) / 2,
      //   this.resolution.height / 2 +
      //     (Math.sin(random * 360) * this.resolution.height) / 2,
      // ];
      this.entities.push(
        new Enemy(
          this.enemyHp,
          "Enemy",
          Math.random()*1 + 1,
          1,
          randomPos[0],
          randomPos[1],
          this.images.enemyImage,
          this.explosionAnimation
        )
      );
    }

    if (!this.powerUp && thisDate - this.lastPowerUpDate >= 500) {
      this.lastPowerUpDate = thisDate;
      let selection =
        this.powerUps[Math.floor(Math.random() * this.powerUps.length)];
      this.powerUp = new selection["constructor"](
        (this.resolution.width - 50) * Math.random(),
        0,
        this.images[selection.imageName],
        this.explosionAnimation
      );
    }

    if (this.mouseClicked) {
      this.player.shoot(this.projectiles, this.mousePosition);
    }

    // movement
    this.movementEngine.move(
      this.player,
      getPlayerDirection(this.keyPressed),
      elapsedTime
    );
    this.entities.forEach((entity) => {
      this.movementEngine.move(
        entity,
        getDirectionTowards(this.player.position, entity.position),
        elapsedTime
      );
    });
    this.projectiles.forEach((projectile) => {
      this.movementEngine.move(projectile, projectile.direction, elapsedTime);
    });
    if (this.powerUp) {
      this.movementEngine.move(this.powerUp, new Vector2d(0, 1), elapsedTime);
    }

    // collision
    this.entities.forEach((entity) => {
      if (checkCollision(entity, this.player)) {
        entity.damage();
        this.player.damage();
      }
    });

    this.projectiles.forEach((projectile) => {
      this.entities.forEach((entity) => {
        if (checkCollision(entity, projectile)) {
          entity.damage();
          projectile.damage();
          this.pointsCounter++;
          this.nextLife++;
        }
      });
    });

    if (this.nextLife > 100) {
      this.player.hitPoints++;
      this.nextLife = 0;
    }

    if (this.powerUp) {
      if (checkCollision(this.player, this.powerUp)) {
        this.powerUp.pickUp(this.player);
        this.powerUp.destroy();
        this.lastPowerUpDate = thisDate;
        this.powerUp = undefined;
      }
    }

    // boundary
    this.entities.forEach((entity, index) => {
      let boundaries = withinBoundary(
        entity,
        this.resolution.width,
        this.resolution.height
      );
      if (!boundaries.bottom || !boundaries.left || !boundaries.right) {
        entity.destroy();
      }
    });

    let playerBoundary = withinBoundary(
      this.player,
      this.resolution.width,
      this.resolution.height
    );
    let x = 1 - 2 * (!playerBoundary.left || !playerBoundary.right);
    let y = 1 - 2 * (!playerBoundary.top || !playerBoundary.bottom);
    let direction = new Vector2d(x, y);
    if (x === -1 || y === -1) {
      this.player.velocity = this.player.velocity.dot(direction);
      this.player.speed = 5;
      this.player.velocity = this.player.velocity
        .multiply(this.player.speed)
        .limitTo(this.player.maxSpeed);
    }

    if (this.powerUp) {
      let boundaries = withinBoundary(
        this.powerUp,
        this.resolution.width,
        this.resolution.height
      );
      if (
        !boundaries.bottom ||
        !boundaries.left ||
        !boundaries.right ||
        !boundaries.top
      ) {
        this.powerUp.destroy();
        this.powerUp = undefined;
      }
    }

    this.projectiles.forEach((projectile) => {
      let projectileBoundary = withinBoundary(
        projectile,
        this.resolution.width,
        this.resolution.height
      );

      if (!projectileBoundary.left) {
        projectile.velocity = projectile.velocity.dot(new Vector2d(-1, 1));
        projectile.direction = projectile.direction.dot(new Vector2d(-1, 1));
      } else if (!projectileBoundary.top) {
        projectile.velocity = projectile.velocity.dot(new Vector2d(1, -1));
        projectile.direction = projectile.direction.dot(new Vector2d(1, -1));
      } else if (!projectileBoundary.right) {
        projectile.velocity = projectile.velocity.dot(new Vector2d(-1, 1));
        projectile.direction = projectile.direction.dot(new Vector2d(-1, 1));
      } else if (!projectileBoundary.bottom) {
        projectile.velocity = projectile.velocity.dot(new Vector2d(1, -1));
        projectile.direction = projectile.direction.dot(new Vector2d(1, -1));
      }
    });

    // health
    this.entities.forEach((entity, index) => {
      if (entity.hitPoints < 1) {
        entity.collideable = false;
        entity.destroy();
      }
      if (entity.removeable) {
        this.entities.splice(index, 1);
      }
    });

    this.projectiles.forEach((projectile, index) => {
      if (projectile.hitPoints < 1) {
        projectile.collideable = false;
        projectile.destroy();
      }
      if (projectile.removeable) {
        this.projectiles.splice(index, 1);
      }
    });

    if (this.player.hitPoints < 1) {
      this.stop();
    }

    // update resolution

    // fps
    this.fpsAvg.push(Math.round(1000 / elapsedTime));
    if (this.fpsAvg.length > 60) this.fpsAvg.shift();
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(
      "FPS: " +
        Math.round(this.fpsAvg.reduce((a, b) => a + b, 0) / this.fpsAvg.length),
      10,
      30
    );

    // draw
    this.draw(this.ctx);
    requestAnimationFrame(this.step);
  };

  draw = (ctx) => {
    this.player.draw(ctx);
    this.entities.forEach((enemy) => {
      enemy.draw(ctx);
    });
    this.projectiles.forEach((projectile) => {
      projectile.drawTrail(ctx, this.images.smokeTrailImage);
      projectile.draw(ctx);
    });
    if (this.powerUp) this.powerUp.draw(ctx);

    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("NUKES: " + this.player.nukes, 200, 30);

    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(
      "HP: " + this.player.hitPoints,
      this.resolution.width / 2,
      30
    );

    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(
      "SCORE: " + this.pointsCounter,
      this.resolution.width - 300,
      30
    );
  };
}
