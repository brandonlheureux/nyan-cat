export class HudElement {
  constructor(player) {
    this.player = player;
  }

  draw(ctx, resolution) {
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", (resolution.width / 2) - 150, resolution.height / 2);
  }
}
