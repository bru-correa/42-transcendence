import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Testing texture
const texture = new THREE.TextureLoader().load(
  './public/aura-matcaps/aura_neon_03.png',
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};

window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true;
      break;
    case 'KeyD':
      keys.d.pressed = true;
      break;
    case 'KeyS':
      keys.s.pressed = true;
      break;
    case 'KeyW':
      keys.w.pressed = true;
      break;
    case 'Space':
      cube.velocity.y = 0.08;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = false;
      break;
    case 'KeyD':
      keys.d.pressed = false;
      break;
    case 'KeyS':
      keys.s.pressed = false;
      break;
    case 'KeyW':
      keys.w.pressed = false;
      break;
  }
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = '#00ff00',
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshMatcapMaterial({ color, matcap: texture }),
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.velocity = velocity;
    this.gravity = -0.002;
  }

  update(ground) {
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;

    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;

    if (this.bottom + this.velocity.y <= ground.top) {
      this.velocity.y *= 0.8;
      this.velocity.y = -this.velocity.y;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}

const cube = new Box({
  width: 2,
  height: 0.1,
  depth: 0.1,
  color: '#ff0000',
  velocity: {
    x: 0,
    y: -0.01,
    z: 0,
  },
});
// cube.castShadow = true;
scene.add(cube);

const ground = new Box({
  width: 5,
  height: 0.5,
  depth: 10,
  color: '#0000ff',
  position: {
    x: 0,
    y: -2,
    z: 0,
  },
});
// ground.receiveShadow = true;
scene.add(ground);

// const lightning = new THREE.DirectionalLight();
// lightning.position.z = 2;
// lightning.position.y = 3;
// lightning.castShadow = true;
// scene.add(lightning);

camera.position.z = 10;

function handleInput(cube) {
  cube.velocity.x = 0;
  cube.velocity.z = 0;
  if (keys.a.pressed) cube.velocity.x = -0.02;
  else if (keys.d.pressed) cube.velocity.x = 0.02;

  if (keys.s.pressed) cube.velocity.z = 0.02;
  else if (keys.w.pressed) cube.velocity.z = -0.02;
}

function animate() {
  requestAnimationFrame(animate);
  handleInput(cube);
  cube.update(ground);
  renderer.render(scene, camera);
}

animate();
