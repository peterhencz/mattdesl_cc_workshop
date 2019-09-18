const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());
// random.setSeed(6077);

const settings = {
  suffix: random.getSeed(),
  dimensions: [1125, 2436],
};
console.log(random.getSeed());

const sketch = () => {
  const palette = ["#ccc", "#999", "#ddd", "tomato"];

  const createGrid = () => {
    const points = [];
    const count = 725;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.04;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v) * 1.618,
          position: [u, v],
        });
      }
    }
    return points;
    console.log(u, v);
  };

  // random.setSeed(512);
  const points = createGrid().filter(() => random.value() > 0.4);
  const margin = 10;

  return ({ context, width, height }) => {
    context.fillStyle = "#333";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      context.lineWidth = (radius * width) / 10;
      context.strokeStyle = "#ddd";
      context.stroke();
      context.bezierCurveTo(
        radius * 300,
        30,
        10,
        radius * width * 10,
        Math.cos(10.33 * Math.PI),
        radius * 10,
        30,
        100
      );
      context.lineWidth = (radius * width) / 800;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
