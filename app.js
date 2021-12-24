const memoryElements = document.querySelectorAll("#game-board li");
const memoryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
const btnStartNewGame = document.getElementById("start-new-game");
const overlay = document.getElementById("overlay");
const player1Element = document.getElementById("player-1");
const player2Element = document.getElementById("player-2");
const player1SideElement = document.getElementById("player-1-side");
const player2SideElement = document.getElementById("player-2-side");

let activePlayer = 0;

const memoryPictures = [
  "/images/annanas.jpg",
  "/images/appel.jpg",
  "/images/banaan.jpg",
  "/images/citroen.jpg",
  "/images/kiwi.jpg",
  "/images/meloen.jpg",
  "/images/perzik.jpg",
  "/images/sinasappel.jpg",
];

let firstClickedField = 0;
let secondClickedField = 0;

btnStartNewGame.addEventListener("click", startNewGame);

for (let memoryElement of memoryElements) {
  memoryElement.addEventListener("click", checkNumber);
}

shuffle(memoryNumbers);

startNewGame();

function startNewGame() {
  for (let memoryElement of memoryElements) {
    memoryElement.removeAttribute("class");
    memoryElement.innerHTML = "";
  }
  shuffle(memoryNumbers);
  console.log(memoryNumbers);
  activePlayer = 1;
  player1Element.style.display = "block";
  player2Element.style.display = "none";
  player1SideElement.innerHTML = "<p>SPELER 1</p>";
  player2SideElement.innerHTML = "<p>SPELER 1</p>";
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function switchPlayer() {
  if (activePlayer === 1) {
    activePlayer = 2;
    player1Element.style.display = "none";
    player2Element.style.display = "block";
  } else {
    activePlayer = 1;
    player1Element.style.display = "block";
    player2Element.style.display = "none";
  }
}

function checkNumber(event) {
  const clickedField = event.target.dataset.field;
  event.target.innerHTML =
    '<img id="picture" src="' +
    memoryPictures[memoryNumbers[clickedField - 1] - 1] +
    '" />';
  if (firstClickedField == 0) {
    firstClickedField = event.target.dataset.field;
    event.target.innerHTML =
      '<img id="picture" src="' +
      memoryPictures[memoryNumbers[firstClickedField - 1] - 1] +
      '" />';
    return;
  } else {
    secondClickedField = event.target.dataset.field;
    event.target.innerHTML =
      '<img id="picture" src="' +
      memoryPictures[memoryNumbers[secondClickedField - 1] - 1] +
      '" />';
    overlay.style.display = "block";
    const myTimeout = setTimeout(checkForSame, 2000);
    return;
  }
}

function checkForSame() {
  if (
    memoryNumbers[firstClickedField - 1] ===
    memoryNumbers[secondClickedField - 1]
  ) {
    // confirm("Deze waren gelijk!");
    imageToPlayerSide(activePlayer);
    memoryElements[firstClickedField - 1].classList.add("found");
    memoryElements[firstClickedField - 1].innerHTML = "";
    memoryElements[secondClickedField - 1].classList.add("found");
    memoryElements[secondClickedField - 1].innerHTML = "";
    firstClickedField = 0;
    secondClickedField = 0;
  } else {
    // confirm("Deze waren niet gelijk!");
    memoryElements[firstClickedField - 1].innerHTML = "";
    memoryElements[secondClickedField - 1].innerHTML = "";
    firstClickedField = 0;
    secondClickedField = 0;
  }
  switchPlayer();
  overlay.style.display = "none";
}

function imageToPlayerSide(activePlayer) {
  if (activePlayer === 1) {
    let img = document.createElement("img");
    img.src = memoryPictures[memoryNumbers[secondClickedField - 1] - 1];
    player1SideElement.appendChild(img);
  } else {
    let img = document.createElement("img");
    img.src = memoryPictures[memoryNumbers[secondClickedField - 1] - 1];
    player2SideElement.appendChild(img);
  }
}
