import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import Arena from './src/arena.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Paddle from './src/paddle.js';

// TODO: Move these global variables
const gameWidth = innerWidth;
const gameHeight = innerHeight;

const arenaWidth = 50;
const arenaDepth = 30;

// TODO: Remove the walls global variables
const backgroundImage = new THREE.TextureLoader().load(
  './public/Starfield.png',
);

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

const camera = new THREE.PerspectiveCamera(45, gameWidth / gameHeight);
// camera.position.set(0, 45, 20);
camera.position.set(0, 48, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(gameWidth, gameHeight);
renderer.setAnimationLoop(animationLoop);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

// const light = new THREE.DirectionalLight(0x2dd7ff, 85);
const light1 = new THREE.DirectionalLight(0xffffff, 5);
// light.position.set(0, 0, 1);
light1.position.set(30, 0.5, 1);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 5);
light2.position.set(-30, 0.5, 1);
scene.add(light2);

// Post Processing Setup
const renderScene = new RenderPass(scene, camera);

const bloomResolution = new THREE.Vector2(gameWidth, gameHeight);
const bloomPass = new UnrealBloomPass(bloomResolution, 0.5, 0.5, 0.1);

const outputPass = new OutputPass(THREE.ReinhardToneMapping);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);

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
  arenaLimit: {
    bot: arena.bottomSide,
    top: arena.topSide,
  },
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
  arenaLimit: {
    bot: arena.bottomSide,
    top: arena.topSide,
  },
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

window.addEventListener('resize', (event) => {
  camera.aspect = gameWidth / gameHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(gameWidth, gameHeight);
  composer.setSize(gameWidth, gameHeight);
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
  ball.rotation.set(Math.sin(t / 700), Math.cos(t / 800), 0);
  handleInput();
  paddleL.update();
  paddleR.update();
  console.log(
    `Player: ${paddleL.position.z} Top: ${arena.topSide} Bot: ${arena.bottomSide}`,
  );
  composer.render(scene, camera);
}
