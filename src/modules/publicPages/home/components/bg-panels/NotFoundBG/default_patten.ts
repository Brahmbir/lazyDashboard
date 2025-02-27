import { IDrawData } from "./index";

export function DefaultPatten(ctx: CanvasRenderingContext2D, data: IDrawData) {
  const { x, y, size, layer, cellOrigin } = data;

  ctx.save();
  // Shadow properties
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  // Draw the circle
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fillStyle = `rgba(${255 - data.layer * 50}, ${255 - data.layer * 50}, 255, 255)`;
  ctx.fill();

  var gradient = ctx.createRadialGradient(
    cellOrigin.x,
    cellOrigin.y,
    0,
    x,
    y,
    size / 2
  );
  gradient.addColorStop(0, "rgba(1,1,1,0)");

  gradient.addColorStop(0.5, "rgba(1,1,1,0.09)");

  gradient.addColorStop(1, "rgba(0,0,0,0.25)");

  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}
