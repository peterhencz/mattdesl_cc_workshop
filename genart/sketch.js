const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: "A3",
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#f4baba";
    context.fillRect(0, 0, width, height);
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 1.618, false);
    context.fillStyle = "tomato";
    context.fill();
    context.lineWidth = width * 0.3;
    context.strokeStyle = "salmon";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
