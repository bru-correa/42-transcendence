import * as THREE from 'three';

export default class Paddle extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = '#ffffff',
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

    this.bottomSide = this.position.z + this.depth / 2;
    this.topSide = this.position.z - this.depth / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    this.velocity = velocity;

    this.wallDistanceFromCenter = Math.abs(arenaDepth / 2);
  }

  update() {
    this.bottomSide = this.position.z + this.depth / 2;
    this.topSide = this.position.z - this.depth / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    const playerCollisionDelta =
      Math.abs(this.position.z + this.velocity.z) + Math.abs(this.depth / 2);
    if (playerCollisionDelta < this.wallDistanceFromCenter) {
      this.position.z += this.velocity.z;
    }
  }
}
