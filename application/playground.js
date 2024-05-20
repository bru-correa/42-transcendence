import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000,
);

camera.position.z = -50;

new OrbitControls(camera, renderer.domElement);

// const geometry = new THREE.SphereGeometry(20, 20, 20);
// const wireframe = new THREE.WireframeGeometry(geometry);
// const line = new THREE.LineSegments(wireframe);
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;
// scene.add(line);

const planeGeometry = new THREE.PlaneGeometry(20, 20, 8, 8);
const planeMaterial = new THREE.MeshBasicMaterial({
color: 0x0000ff,
side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

function animate() {
requestAnimationFrame(animate);
renderer.render(scene, camera);
}

animate();
