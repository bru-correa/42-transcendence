import * as THREE from "./three/three.module.js";
// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";

import { OrbitControls } from "./three/addons/OrbitControls.js";

import Arena from "./src/arena.js";
import Paddle from "./src/paddle.js";
import PostProcessing from "./src/post-processing.js";
import InputManager from "./src/input-manager.js";

// TODO: Move these global variables
const gameWidth = innerWidth;
const gameHeight = innerHeight;

const arenaWidth = 50;
const arenaDepth = 30;

const backgroundImage = new THREE.TextureLoader().load(
  "static/pong/img/Starfield.png"
);

// Boilerplate
const scene = new THREE.Scene();
scene.background = backgroundImage;

// Create camera
const camera = new THREE.PerspectiveCamera(45, gameWidth / gameHeight);
camera.lookAt(scene);
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

const inputManager = new InputManager({});

// TODO: Create a ball class
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(ball);

const arena = new Arena({
  width: arenaWidth,
  height: 2,
  depth: arenaDepth,
  walls: {
    thickness: 2,
    height: 0,
    color: "#0000dd",
  },
});
scene.add(arena);
arena.buildWalls(scene);

// Player 1
const paddleL = new Paddle({
  color: "#FF0000",
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
  color: "#00FF00",
  position: {
    x: 20,
    y: 1.5,
    z: 0,
  },
  arenaDepth: arena.depth,
});
scene.add(paddleR);

function animationLoop(_) {
  // ball.rotation.set(Math.sin(t / 700), Math.cos(t / 800), 0);
  inputManager.handleInput();
  paddleL.update(inputManager.paddleLInputZ);
  paddleR.update(inputManager.paddleRInputZ);
  postProcessing.render();
}
