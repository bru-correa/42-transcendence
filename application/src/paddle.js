import * as THREE from 'three';

export default class Paddle extends THREE.Mesh {
  constructor({
    width = 0.5,
    height = 0.5,
    depth = 3.5,
    color = '#ffffff',
    speed = 0.1,
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    arenaDepth,
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshBasicMaterial({ color }),
    );

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z);

    this.updateCollisionPoints();

    this.speed = speed;
    this.velocity = 0;

    this.wallDistanceFromCenter = Math.abs(arenaDepth / 2);
  }

  update(paddleInputZ) {
    this.velocity = paddleInputZ * this.speed;
    this.updateCollisionPoints();
    this.checkCollision();
  }

  updateCollisionPoints() {
    this.bottomSide = this.position.z + this.depth / 2;
    this.topSide = this.position.z - this.depth / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;
  }

  checkCollision() {
    console.log(this.velocity);
    const playerCollisionDelta =
      Math.abs(this.position.z + this.velocity) + Math.abs(this.depth / 2);
    if (playerCollisionDelta < this.wallDistanceFromCenter) {
      this.position.z += this.velocity;
    }
  }
}
