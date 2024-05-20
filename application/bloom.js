import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const backgroundImage = new THREE.TextureLoader().load(
'./public/Starfield.png',
);

// Boilerplate
const scene = new THREE.Scene();
scene.background = backgroundImage;

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight);
camera.position.set(0, 36, 10);
// camera.position.set(0, 35, 20);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
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

const bloomPass = new UnrealBloomPass(
new THREE.Vector2(innerWidth, innerHeight),
0.5,
0.5,
0.1,
);

const outputPass = new OutputPass(THREE.ReinhardToneMapping);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);

window.addEventListener('resize', (event) => {
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(innerWidth, innerHeight);
composer.setSize(innerWidth, innerHeight);
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

// Player 1
const paddleL = new THREE.Mesh(
new THREE.BoxGeometry(0.5, 0.5, 3.5),
new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
paddleL.position.x = -20;
scene.add(paddleL);

// Player 2
const paddleR = new THREE.Mesh(
new THREE.BoxGeometry(0.5, 0.5, 3.5),
new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
paddleR.position.x = 20;
scene.add(paddleR);

function animationLoop(t) {
ball.rotation.set(Math.sin(t / 700), Math.cos(t / 800), 0);
composer.render(scene, camera);
}
