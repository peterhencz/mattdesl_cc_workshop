// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  // Make the loop animated
  dimension: [512, 512],
  fps: 24,
  duration: 4,
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor("#666", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  const controls = new THREE.OrbitControls(camera);
  // Setup your scene
  const scene = new THREE.Scene();

  const palette = ["#f4baba"];

  const box = new THREE.BoxGeometry(1, 1, 1);
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette),
      })
    );
    const cica = random.noise2D(1, 3, 4) * 4;
    mesh.position.set(
      random.range(-cica, cica),
      random.range(-cica, cica),
      random.range(-cica, cica)
    );

    mesh.scale.set(
      random.range(-cica, cica),
      random.range(-cica, cica),
      random.range(-cica, cica)
    );
    mesh.scale.multiplyScalar(1);
    scene.add(mesh);
  }

  scene.add(new THREE.AmbientLight("purple"));
  const light = new THREE.DirectionalLight("pink", 1);
  light.position.set(1, 4, 1);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 4;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead }) {
      scene.rotation.y = Math.cos(playhead * Math.PI * 2);
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
