const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "teal",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "teal"
];

// here is a helper function to shuffle 
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// handle clicks on divs
let first = null;
let second = null;
let flipped = 0;
let notclicked = false;
let gameStarted = false;
let moves = 0;

function handleCardClick(event) {
    if (!gameStarted) {
      return;
    }  
    if (notclicked) return;
    if (event.target === first) return;

    let card = event.target;
    card.style.backgroundColor = card.classList[0];

    if (!first || !second) {
        card.classList.add("flipped");
        first = first || card;
        second = card === first ? null : card;
    }

    if (first && second) {
        notclicked = true;
        let card1 = first;
        let card2 = second;

        if (card1.className === card2.className) {
            flipped += 2;
            first.removeEventListener("click", handleCardClick);
            second.removeEventListener("click", handleCardClick);
            first = null;
            second = null;
            notclicked = false;
        } else {
            setTimeout(function() {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                first = null;
                second = null;
                notclicked = false;
            }, 1000);
        }
        // move counter
        moves++;
        document.getElementById("moves").textContent = moves;
    }

    if (flipped === shuffledColors.length) {
      alert("You win!");
      restartButton.style.display = 'block';
      let bestScore = localStorage.getItem('bestScore');
      if (!bestScore || moves < bestScore) {
          localStorage.setItem('bestScore', moves);
          alert(`Congratulations! You beat the previous best score of ${bestScore}.`);
      }
  }
}

createDivsForColors(shuffledColors);

// start button
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);

function startGame() {
  //moves reset
  moves = 0;
  document.getElementById("moves").textContent = moves;
  // start button
  gameStarted = true;
  if (gameContainer.children.length > 0) {
    return;
  }
  shuffledColors = shuffle(generateRandomColors(16));
  createDivsForColors(shuffledColors);
  const cards = document.querySelectorAll('div');
  cards.forEach(card => card.addEventListener('click', handleCardClick));
}

//restart button
const restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  const gameDiv = document.getElementById('game');
  // gameDiv.innerHTML = '';
  flipped = 0;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  restartButton.style.display = 'none';
  const cards = document.querySelectorAll('div');
  cards.forEach(card => card.addEventListener('click', handleCardClick));
  gameDiv.innerHTML = '';
  gameStarted = false;
}

