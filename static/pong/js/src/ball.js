import * as THREE from "../three/three.module.js";

export default class Ball extends THREE.Mesh {
  constructor({
    radius = 2,
    color = "#ffff00",
    speed = 0.5,
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
  }) {
    super(
      new THREE.SphereGeometry(radius),
      new THREE.MeshBasicMaterial({ color })
    );

    this.position.set(position.x, position.y, position.z);

    this.speed = speed;
    this.velocity = 0;
  }

  update(arena, paddleL, paddleR) {}
}
