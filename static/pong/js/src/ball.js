import * as THREE from "../three/three.module.js";

export default class Ball extends THREE.Mesh {
  constructor({
    radius = 2,
    color = "#ffff00",
    speed = 0.15,
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
  }) {
    super(
      new THREE.SphereGeometry(radius),
      new THREE.MeshBasicMaterial({ color }),
    );

    this.radius = radius;

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
    } else if (
      this.checkPaddleColision(paddleL) ||
      this.checkPaddleColision(paddleR)
    ) {
      this.velocity.z *= -1;
      this.velocity.x *= -1;
    }
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
  }

  checkWallHCollision(arena) {
    const nextPosZ = this.position.z + this.velocity.z;
    if (nextPosZ - this.radius <= arena.topSide) return true;
    else if (nextPosZ + this.radius >= arena.bottomSide) return true;
    return false;
  }

  checkWallVCollision(arena) {
    const nextPosX = this.position.x + this.velocity.x;
    if (nextPosX + this.radius >= arena.rightSide) return true;
    else if (nextPosX - this.radius <= arena.leftSide) return true;
    return false;
  }

  checkPaddleColision(paddle) {
    const nextPosX = this.position.x + this.velocity.x;
    const nextPosZ = this.position.z + this.velocity.z;
    if (
      nextPosX + this.radius >= paddle.leftSide &&
      nextPosX - this.radius <= paddle.rightSide
    ) {
      if (
        nextPosZ - this.radius <= paddle.bottomSide &&
        nextPosZ + this.radius >= paddle.topSide
      ) {
        return true;
      }
    }
    return false;
  }
}
