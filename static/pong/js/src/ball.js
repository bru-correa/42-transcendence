import * as THREE from "../three/three.module.js";

export default class Ball extends THREE.Mesh {
  constructor({
    radius = 2,
    color = "#ffff00",
    speed = 0.2,
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

    this.velocity = {
      x: this.speed,
      y: 0,
      z: this.speed,
    };
  }

  update(arena, paddleL, paddleR) {
    if (this.checkWallHCollision(arena)) {
      this.velocity.z *= -1;
    } else if (this.checkWallVCollision(arena)) {
      this.velocity.x *= -1;
    }
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
  }

  checkWallHCollision(arena) {
    const nextPosZ = this.position.z + this.velocity.z;
    if (nextPosZ <= arena.topSide) return true;
    else if (nextPosZ >= arena.bottomSide) return true;
    return false;
  }

  checkWallVCollision(arena) {
    const nextPosX = this.position.x + this.velocity.x;
    if (nextPosX >= arena.rightSide) return true;
    else if (nextPosX <= arena.leftSide) return true;
    return false;
  }

  // checkPaddleColision(paddle) {
  //   const nextPosX = this.position.x + this.velocity.x;
  //   if (nextPosX >= paddle) {

  //   }
  // }
}
