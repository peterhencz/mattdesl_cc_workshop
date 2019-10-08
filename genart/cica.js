const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const eases = require("eases");
const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [1024, 1024],
  animate: false,
  duration: 32,
  fps: 24,
};
console.log(random.getSeed());

const sketch = (
  numberOfSides,
  xCenter,
  yCenter,
  size,
  lineWidth,
  gradientAngle
) => {
  const margin = 10;
  return ({ context, width, height }) => {
    context.fillStyle = "#666";
    context.fillRect(0, 0, width, height);

    const lineWidth = 2;
    const numberOfSides = 10;
    const xCenter = width / 2;
    const yCenter = height / 2;
    const size = 300;
    const gradientAngle = 2;
    context.beginPath();
    context.moveTo(
      xCenter + (size * Math.cos(0)) / 1,
      yCenter + (size * Math.sin(0)) / 2
    );
    {
      for (let i = 1; i <= numberOfSides; i += 1) {
        context.lineTo(
          xCenter + size * Math.cos((i * 2 * Math.PI) / numberOfSides),
          yCenter + size * Math.sin((i * 2 * Math.PI) / numberOfSides)
        );
      }
    }
    context.lineWidth = lineWidth;
    context.strokeStyle = "tomato";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
