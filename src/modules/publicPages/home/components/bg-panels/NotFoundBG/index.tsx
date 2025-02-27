"use client";
import { cn } from "@/lib/utils";
import { DefaultPatten } from "./default_patten";

export interface IDrawData {
  x: number;
  y: number;
  size: number;
  layer: number;
  cellOrigin: { x: number; y: number };
}

interface INotFoundBGProps extends React.HTMLProps<HTMLCanvasElement> {
  layers: number[];
  draw?: (ctx: CanvasRenderingContext2D, data: IDrawData) => void;
  layerDisplacement?: number[]; // Array of displacement factors for each layer
  displacementFactor?: number; // Default displacement factor
}

export default function NotFoundBG({
  layers,
  draw = DefaultPatten,
  layerDisplacement = [], // Default empty array for layerDisplacement
  displacementFactor = 1, // Default displacement factor = 1
  className,
  ...props
}: INotFoundBGProps) {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let gridSize = 100;
  const input = { x: 0, y: 0 };
  const gridData = { layers: new Map(), centers: new Map() };
  let animationFrameId: number;

  const lerp = (a: number, b: number, t: number) => a + t * (b - a);

  const resizeCanvas = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    gridSize = window.innerWidth > 768 ? 100 : 72;
    canvas.height = window.innerHeight;
    gridData.layers.clear();
    gridData.centers.clear();
  };

  const updateInput = (event: MouseEvent | DeviceOrientationEvent) => {
    if (event instanceof MouseEvent) {
      input.x = event.clientX;
      input.y = event.clientY;
    } else if (
      event instanceof DeviceOrientationEvent &&
      event.gamma !== null &&
      event.beta !== null
    ) {
      input.x =
        (event.gamma / 45) * window.innerWidth * 0.5 + window.innerWidth / 2;
      input.y =
        (event.beta / 45) * window.innerHeight * 0.5 + window.innerHeight / 2;
    }
  };

  const getGridLayer = (x: number, y: number) => {
    const key = `${x},${y}`;
    if (!gridData.layers.has(key)) {
      gridData.layers.set(key, Math.floor(Math.random() * layers.length));
    }
    return gridData.layers.get(key);
  };

  const drawGrid = () => {
    if (!canvas) return;

    const rows = Math.ceil(canvas.height / gridSize) + 1;
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const lerpFactor = 0.1;

    const cellsToDraw: IDrawData[] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const layer = getGridLayer(x, y);
        const layerDisplacementFactor =
          layerDisplacement[layer] !== undefined
            ? layerDisplacement[layer]
            : displacementFactor; // Get layer-specific or default displacement

        const layerDepth =
          (layer + 1) * (0.3 / layers.length) * layerDisplacementFactor; // Apply displacement factor to depth
        const offsetX = (input.x / window.innerWidth - 0.5) * 100 * layerDepth;
        const offsetY = (input.y / window.innerHeight - 0.5) * 100 * layerDepth;

        const OriginX = x * gridSize + offsetX;
        const OriginY = y * gridSize + offsetY;

        let centerX = OriginX;
        let centerY = OriginY;

        const key = `${x},${y}`;
        if (gridData.centers.has(key)) {
          const currentCenter = gridData.centers.get(key);
          centerX = lerp(currentCenter.x, OriginX, lerpFactor);
          centerY = lerp(currentCenter.y, OriginY, lerpFactor);
        }

        gridData.centers.set(key, { x: centerX, y: centerY });

        const size = gridSize * layers[layer];

        cellsToDraw.push({
          x: centerX,
          y: centerY,
          size,
          layer,
          cellOrigin: { x: OriginX, y: OriginY },
        });
      }
    }

    cellsToDraw.sort((a, b) => b.layer - a.layer);

    if (ctx) {
      cellsToDraw.forEach((cell) => {
        draw(ctx!, cell);
      });
    }
  };

  const animate = () => {
    if (!canvas || !ctx) return; // Ensure canvas and context exist
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    animationFrameId = requestAnimationFrame(animate);
  };

  const canvasRef = (node: HTMLCanvasElement | null) => {
    const cleanUp = () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", updateInput);
      window.removeEventListener("deviceorientation", updateInput);
      cancelAnimationFrame(animationFrameId);
      ctx = null;
    };

    canvas = node;
    if (canvas) {
      ctx = canvas.getContext("2d");
      resizeCanvas(); // Initial resize
      animate(); // Start animation
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("mousemove", updateInput);
      window.addEventListener("deviceorientation", updateInput);
      return cleanUp;
    } else {
      // Cleanup on unmount
      cleanUp;
    }
  };

  return (
    <canvas
      {...props}
      ref={canvasRef}
      className={cn("w-full h-full bg-black", className)}
    />
  );
}
