import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const backgroundImage = new THREE.TextureLoader().load(
  './public/Starfield.png',
);

const gameWidth = innerWidth;
const gameHeight = innerHeight;

const keys = {
  paddleLUp: false,
  paddleLDown: false,
  paddleRUp: false,
  paddleRDown: false,
};

// Boilerplate
const scene = new THREE.Scene();
scene.background = backgroundImage;

const camera = new THREE.PerspectiveCamera(45, gameWidth / gameHeight);
// camera.position.set(0, 45, 20);
camera.position.set(0, 48, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(gameWidth, gameHeight);
renderer.setAnimationLoop(animationLoop);
document.body.appendChild(renderer.domElement);

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

window.addEventListener('resize', (event) => {
  camera.aspect = gameWidth / gameHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(gameWidth, gameHeight);
  composer.setSize(gameWidth, gameHeight);
});

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshBasicMaterial({ color: 0xffff00 }),
);
scene.add(ball);

// Plane
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(50, 2, 30),
  new THREE.MeshStandardMaterial({
    // color: new THREE.Color(0x3333dd),
    color: new THREE.Color(0x0000aa),
    metalness: 0.2,
    roughness: 0.7,
    emissive: new THREE.Color(0x98),
    flatShading: true,
  }),
);
ground.position.y = -3;
ground.position.z = -2;
scene.add(ground);

// Walls
// const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x0000dd });
const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000dd,
});
const horizontalWallGeometry = new THREE.BoxGeometry(50, 2, 2);
const verticalWallGeometry = new THREE.BoxGeometry(2, 2, 32);

const wallUp = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
wallUp.position.y = -2;
wallUp.position.z = -17;
scene.add(wallUp);

const wallDown = new THREE.Mesh(horizontalWallGeometry, wallMaterial);
wallDown.position.y = -2;
wallDown.position.z = 13;
scene.add(wallDown);

const wallRight = new THREE.Mesh(verticalWallGeometry, wallMaterial);
wallRight.position.x = 26;
wallRight.position.y = -2;
wallRight.position.z = -2;
scene.add(wallRight);

const wallLeft = new THREE.Mesh(verticalWallGeometry, wallMaterial);
wallLeft.position.x = -26;
wallLeft.position.y = -2;
wallLeft.position.z = -2;
scene.add(wallLeft);

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
      new THREE.MeshBasicMaterial({ color }),
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);

    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    this.velocity = velocity;
  }

  update() {
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    this.position.z += this.velocity.z;
    console.log(this.velocity.z);
  }
}

// Player 1
const paddleL = new Box({
  width: 0.5,
  height: 0.5,
  depth: 3.5,
  color: '#FF0000',
  position: {
    x: -20,
    y: 0,
    z: 0,
  },
});
scene.add(paddleL);

// Player 2
const paddleR = new Box({
  width: 0.5,
  height: 0.5,
  depth: 3.5,
  color: '#00FF00',
  position: {
    x: 20,
    y: 0,
    z: 0,
  },
});
scene.add(paddleR);

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
  composer.render(scene, camera);
}
