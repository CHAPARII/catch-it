const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let score = 0;
let gameInterval;
let gameOver = false;

// Move the basket with arrow keys
document.addEventListener("keydown", (e) => {
  const basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));

  if (e.key === "ArrowLeft" && basketLeft > 0) {
    basket.style.left = `${basketLeft - 20}px`;
  } else if (e.key === "ArrowRight" && basketLeft < 340) {
    basket.style.left = `${basketLeft + 20}px`;
  }
});

// Create a falling item
function createItem() {
  if (gameOver) return;

  const item = document.createElement("div");
  item.classList.add("item");

  // Random horizontal position
  item.style.left = `${Math.floor(Math.random() * 370)}px`;
  item.style.top = "0px";

  gameContainer.appendChild(item);

  let fallInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(fallInterval);
      item.remove();
      return;
    }

    const itemTop = parseInt(window.getComputedStyle(item).getPropertyValue("top"));
    const itemLeft = parseInt(window.getComputedStyle(item).getPropertyValue("left"));
    const basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
    const basketTop = parseInt(window.getComputedStyle(basket).getPropertyValue("top"));

    // Check if item hits the ground
    if (itemTop > 570) {
      clearInterval(fallInterval);
      item.remove();

      // End the game if an item hits the ground
      gameOver = true;
      alert("Game Over! Final Score: " + score);
      restartButton.style.display = "block";
    }

    // Check if item is caught
    if (
      itemTop + 30 > basketTop &&
      itemLeft + 30 > basketLeft &&
      itemLeft < basketLeft + 60
    ) {
      clearInterval(fallInterval);
      item.remove();
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    // Move the item down
    item.style.top = `${itemTop + 5}px`;
  }, 30);
}

// Start the game
function startGame() {
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = `Score: 0`;
  restartButton.style.display = "none";

  gameInterval = setInterval(createItem, 1000);
}

// Restart the game
restartButton.addEventListener("click", startGame);

// Start the game when the page loads
startGame();
