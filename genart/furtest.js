const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());
// random.setSeed(6077);

const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048],
};
console.log(random.getSeed());

const sketch = () => {
  const palette = ["#c#999", ];

  const createGrid = () => {
    const points = [];
    const count = 70;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.07;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v) * 2.618,
          position: [u, v],
        });
      }
    }
    return points;
    console.log(u, v);
  };

  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.004);
  const margin = 20;

  return ({ context, width, height }) => {
    context.fillStyle = "#333";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = "#333";
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      context.bezierCurveTo(100, 200, 3, 400, 50, 60, 70, 80);
      context.lineWidth = (radius * width) / 100;
      context.strokeStyle = "#333";
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
