import * as THREE from "../three/three.module.js";

export default class Ball extends THREE.Mesh {
  constructor({
    radius = 2,
    color = "#ffff00",
    speed = 0.25,
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
    const nextPosX = this.position.x + this.velocity.x;
    const nextPosZ = this.position.z + this.velocity.z;
    if (this.checkWallHCollision(arena)) {
      this.velocity.z *= -1;
    } else if (this.checkWallVCollision(arena)) {
      this.velocity.x *= -1;
    } else if (this.checkPaddleColision(paddleL)) {
      this.updateVelocity(nextPosX, nextPosZ, paddleL);
    } else if (this.checkPaddleColision(paddleR)) {
      this.updateVelocity(nextPosX, nextPosZ, paddleR);
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

  updateVelocity(intersectX, intersectZ, paddle) {
    const relativeDelta = intersectZ - paddle.position.z;
    const normalizedDelta = relativeDelta / (paddle.depth / 2);
    const maxBounceAngle = Math.PI / 4;
    const bounceAngle = normalizedDelta * maxBounceAngle;
    this.checkPaddleSideCollision(paddle);
    this.velocity.x =
      Math.sign(this.velocity.x) * -Math.cos(bounceAngle) * this.speed;
    this.velocity.z = Math.sin(bounceAngle) * this.speed;
  }

  // TODO: One collision at time
  checkPaddleSideCollision(paddle) {
    if (
      this.position.z + this.radius <= paddle.topSide ||
      this.position.z - this.radius >= paddle.bottomSide
    ) {
      if (Math.sign(paddle.position.x) > 0) {
        this.position.x = paddle.position.x - paddle.depth / 2 - this.radius;
      } else {
        this.position.x = paddle.position.x + paddle.depth / 2 + this.radius;
      }
    }
  }
}
