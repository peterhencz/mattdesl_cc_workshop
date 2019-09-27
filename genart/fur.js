const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [512, 512],
  animate: true,
  duration: 4,
  fps: 30,
};
console.log(random.getSeed());

const sketch = () => {
  const palette = ["#ddd", "#ccc"];
  const createGrid = () => {
    const points = [];
    const count = 145;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.03;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v) * 3.618,
          position: [u, v],
        });
      }
    }
    return points;
    console.log(u, v);
  };

  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.84);
  const margin = 10;

  return ({ context, width, height, playhead }) => {
    context.fillStyle = "#333";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const t = Math.sin(playhead * Math.PI * 2);
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate((rotation * t) / 2);
      context.beginPath();

      // context.lineWidth = (radius * width) / 200;
      context.strokeStyle = "#ddd";

      context.bezierCurveTo(10, 20, 30, 100, 10, 10, 10, 10);
      context.lineWidth = (radius * width) / 80;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
