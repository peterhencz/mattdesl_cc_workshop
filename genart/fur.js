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
  // colorCount = random.rangeFloor(1, 6);
  // const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  // console.log(palette);

  const palette = ["#f18f01", "#048ba8", "#2e4057", "#99c24d", "#2f2d2e"];
  const palette2 = ["#AFCB1B", "#DEEF83", "#A8C319", "#7C8F18", "#682480"];
  const createGrid = () => {
    const points = [];
    const count = 305;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.004;
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
  const points = createGrid().filter(() => random.value() > 0.8);
  const margin = 250;

  return ({ context, width, height }) => {
    context.fillStyle = "#333";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color, rotation } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(
      //   x,
      //   y,
      //   (radius * width) / 1.2,
      //   0,
      //   Math.PI * random.value(),
      //   false
      // );

      // context.strokeStyle = color;
      // context.lineWidth = 5;
      // context.stroke();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();

      context.lineWidth = (radius * width) / 100;
      context.strokeStyle = "#ddd";
      context.stroke();
      context.bezierCurveTo(
        radius * 3,
        100,
        100,
        radius * width * 100,
        Math.cos(30 * Math.PI),
        radius * 10,
        200,
        100
      );
      context.lineWidth = (radius * width) / 10;
      context.strokeStyle = color;
      context.stroke();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
