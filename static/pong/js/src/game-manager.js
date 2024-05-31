export default class GameManager {
  constructor({ maxScore }) {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.maxScore = maxScore;
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
}
