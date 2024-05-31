export default class GameManager {
  constructor({ maxScore }) {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.maxScore = maxScore;

    this.targetFrameRate = 1000 / 60; // 60 fps

    this.deltaTime = 0;

    this.previousTime = performance.now();

    this.lastTimeStamp = 0;
  }

  resetScore() {
    this.playerLScore = 0;
    this.playerRScore = 0;
  }

  increaseLScore() {
    this.playerLScore++;
    if (this.playerLScore >= this.maxScore) {
      console.log("Game Over! The Left Player Won");
    }
  }

  increaseRScore() {
    this.playerRScore++;
    if (this.playerRScore >= this.maxScore) {
      console.log("Game Over! The Right Player Won");
    }
  }

  updateDeltaTime(timestamp) {
    this.deltaTime = (timestamp - this.lastTimeStamp) / this.targetFrameRate;
    this.lastTimeStamp = timestamp;
  }
}
