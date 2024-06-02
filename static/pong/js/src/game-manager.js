export default class GameManager {
  constructor({ maxScore }) {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.maxScore = maxScore;

    this.targetFrameRate = 1000 / 60; // 60 fps

    this.deltaTime = 0;

    this.previousTime = performance.now();

    this.lastTimeStamp = 0;

    this.playerLName = document.getElementById("player-l-name").innerHTML;
    this.playerRName = document.getElementById("player-r-name").innerHTML;

    this.popupWinnerName = document.getElementById("popup-winner-name");

    this.playerLSpan = document.getElementById("player-l-score");
    this.playerRSpan = document.getElementById("player-r-score");
    this.playerLSpan.innerHTML = 0;
    this.playerRSpan.innerHTML = 0;

    this.gameOver = false;
    this.gameOverPopUp = document.getElementById("game-over");

    this.unpauseFrame = false;
  }

  resetScore() {
    this.playerLScore = 0;
    this.playerRScore = 0;
    this.playerLSpan.innerHTML = this.playerLScore;
    this.playerRSpan.innerHTML = this.playerRScore;
  }

  increaseLScore() {
    this.playerLScore++;
    this.playerLSpan.innerHTML = this.playerLScore;
    if (this.playerLScore >= this.maxScore) {
      this.gameOver = true;
      this.popupWinnerName.innerHTML = this.playerLName;
      this.gameOverPopUp.style.display = "flex";
      // Send info to database
    }
  }

  increaseRScore() {
    this.playerRScore++;
    this.playerRSpan.innerHTML = this.playerRScore;
    if (this.playerRScore >= this.maxScore) {
      this.gameOver = true;
      this.popupWinnerName.innerHTML = this.playerRName;
      this.gameOverPopUp.style.display = "flex";
      // Send info to database
    }
  }

  updateDeltaTime(timestamp) {
    if (this.unpauseFrame) {
      this.lastTimeStamp = timestamp;
      this.unpauseFrame = false;
      return;
    }
    this.deltaTime = (timestamp - this.lastTimeStamp) / this.targetFrameRate;
    this.lastTimeStamp = timestamp;
  }

  resetGame() {
    this.resetScore();
    this.gameOverPopUp.style.display = "none";
    this.gameOver = false;
    this.deltaTime = 0;
    this.unpauseFrame = true;
  }
}
