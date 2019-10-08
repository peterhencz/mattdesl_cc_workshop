const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const eases = require("eases");
const palettes = require("nice-color-palettes");

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [1024, 1024],
  animate: true,
  duration: 32,
  fps: 24,
};
console.log(random.getSeed());

const sketch = () => {
  const palette = ["#ddd", "#ccc"];
  const createGrid = () => {
    const points = [];
    const count = 305;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.09;
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
  const points = createGrid().filter(() => random.value() > 0.89);
  const margin = 10;

  return ({ context, width, height, playhead }) => {
    context.fillStyle = "#333";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const t = Math.sin(playhead * Math.PI * 2) * rotation * 2;
      const e = eases.sineInOut(t);
      const [u, v] = position;
      const x = lerp(margin, width - margin, v);
      const y = lerp(margin, height - margin, u);

      context.save();
      context.translate(x, y);
      context.beginPath();
      context.rotate((rotation * e) / 2);
      context.strokeStyle = "#ddd";
      context.bezierCurveTo(10, 10, 100, 50, 10, 10, 100, 100);
      context.lineWidth = (radius * width) / 800;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
