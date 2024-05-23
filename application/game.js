import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Arena from './src/arena.js';
import Paddle from './src/paddle.js';
import PostProcessing from './src/post-processing.js';

// TODO: Move these global variables
const gameWidth = innerWidth;
const gameHeight = innerHeight;

const arenaWidth = 50;
const arenaDepth = 30;

const backgroundImage = new THREE.TextureLoader().load('./Starfield.png');

const keys = {
  paddleLUp: false,
  paddleLDown: false,
  paddleRUp: false,
  paddleRDown: false,
};

// TODO: Move rendering boiler plate to another file

// Boilerplate
const scene = new THREE.Scene();
scene.background = backgroundImage;

// Create camera
const camera = new THREE.PerspectiveCamera(45, gameWidth / gameHeight);
camera.position.set(0, 52, 10);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(gameWidth, gameHeight);
renderer.setAnimationLoop(animationLoop);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

// Create directional lights
const light1 = new THREE.DirectionalLight(0xffffff, 5);
light1.position.set(30, 0.5, 1);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 5);
light2.position.set(-30, 0.5, 1);
scene.add(light2);

// Setup post processing effects
const postProcessing = new PostProcessing({
  scene: scene,
  camera: camera,
  renderer: renderer,
  gameWidth: gameWidth,
  gameHeight: gameHeight,
});
postProcessing.setup();

// TODO: Create a ball class
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
);
scene.add(ball);

const arena = new Arena({
  width: arenaWidth,
  height: 2,
  depth: arenaDepth,
  walls: {
    thickness: 2,
    height: 0,
    color: '#0000dd',
  },
});
scene.add(arena);
arena.buildWalls(scene);

// Player 1
const paddleL = new Paddle({
  width: 0.5,
  height: 0.5,
  depth: 3.5,
  color: '#FF0000',
  position: {
    x: -20,
    y: 1.5,
    z: 0,
  },
  arenaDepth: arena.depth,
});
scene.add(paddleL);

// Player 2
const paddleR = new Paddle({
  width: 0.5,
  height: 0.5,
  depth: 3.5,
  color: '#00FF00',
  position: {
    x: 20,
    y: 1.5,
    z: 0,
  },
  arenaDepth: arena.depth,
});
scene.add(paddleR);

// TODO: Move the event listeners to another file
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      keys.paddleLUp = true;
      break;
    case 'KeyS':
      keys.paddleLDown = true;
      break;
    case 'KeyK':
      keys.paddleRUp = true;
      break;
    case 'KeyJ':
      keys.paddleRDown = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
      keys.paddleLUp = false;
      break;
    case 'KeyS':
      keys.paddleLDown = false;
      break;
    case 'KeyK':
      keys.paddleRUp = false;
      break;
    case 'KeyJ':
      keys.paddleRDown = false;
      break;
  }
});

// TODO: Move input to another file
function handleInput() {
  paddleR.velocity.z = 0;
  paddleL.velocity.z = 0;
  if (keys.paddleLUp) paddleL.velocity.z = -0.1;
  else if (keys.paddleLDown) paddleL.velocity.z = 0.1;
  if (keys.paddleRUp) paddleR.velocity.z = -0.1;
  else if (keys.paddleRDown) paddleR.velocity.z = 0.1;
}

function animationLoop(t) {
  // ball.rotation.set(Math.sin(t / 700), Math.cos(t / 800), 0);
  handleInput();
  paddleL.update();
  paddleR.update();
  postProcessing.render();
}
