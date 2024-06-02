export default class GameManager {
  constructor({ maxScore }) {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.maxScore = maxScore;

    this.targetFrameRate = 1000 / 60; // 60 fps

    this.deltaTime = 0;

    this.previousTime = performance.now();

    this.lastTimeStamp = 0;

    this.playerLSpan = document.getElementById("player-l-score");
    this.playerRSpan = document.getElementById("player-r-score");
    this.setScoreSpans();

    this.gameOver = false;
  }

  setScoreSpans() {
    this.playerLSpan.innerHTML = this.playerLScore;
    this.playerRSpan.innerHTML = this.playerRScore;
  }

  resetScore() {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.setScoreSpans();
  }

  increaseLScore() {
    this.playerLScore++;
    this.playerLSpan.innerHTML = this.playerLScore;
    if (this.playerLScore >= this.maxScore) {
      this.gameOver = true;
      // Send info to database
    }
  }

  increaseRScore() {
    this.playerRScore++;
    this.playerRSpan.innerHTML = this.playerRScore;
    if (this.playerRScore >= this.maxScore) {
      this.gameOver = true;
      // Send info to database
    }
  }

  updateDeltaTime(timestamp) {
    this.deltaTime = (timestamp - this.lastTimeStamp) / this.targetFrameRate;
    this.lastTimeStamp = timestamp;
  }
}
