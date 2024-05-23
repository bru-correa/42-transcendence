import * as THREE from 'three';

export default class Paddle extends THREE.Mesh {
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
    arenaLimit = {
      bot,
      top,
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

    this.bottomSide = this.position.z + this.depth / 2;
    this.topSide = this.position.z - this.depth / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    this.velocity = velocity;

    this.arenaLimit = arenaLimit;
  }

  update() {
    this.bottomSide = this.position.z + this.depth / 2;
    this.topSide = this.position.z - this.depth / 2;
    this.rightSide = this.position.x + this.width / 2;
    this.leftSide = this.position.x - this.width / 2;

    // if (
    //   this.topSide + this.velocity.z <= this.arenaLimit.top ||
    //   this.bottomSide + this.velocity.z >= this.arenaLimit.bot
    // ) {
    //   this.velocity.z = 0;
    // } else {
    //   this.position.z += this.velocity.z;
    // }
    console.log(`Player Bot: ${this.bottomSide + this.velocity.z}`);
    // if (
    //   this.topSide + this.velocity.z > this.arenaLimit.top &&
    //   this.bottomSide + this.velocity.y < this.arenaLimit.bot
    // ) {
    //   this.position.z += this.velocity.z;
    // }
    if (
      this.topSide + this.velocity.z < Math.abs(this.arenaLimit.top) &&
      this.bottomSide + this.velocity.y > Math.abs(this.arenaLimit.bot)
    ) {
      this.position.z += this.velocity.z;
    }
  }
}
