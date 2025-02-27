let currBombTile;
let score = 0;
let gameOver = false;

// Get the hammer element
const hammer = document.getElementById("hammer");

// Add an event listener for mouse movement to follow the cursor
window.addEventListener("mousemove", (e) => {
    // Update the position of the hammer based on the mouse position
    hammer.style.left = e.pageX - hammer.offsetWidth / 2 + 'px';
    hammer.style.top = e.pageY - hammer.offsetHeight / 2 + 'px';
});

// Create an Audio object for the hit sound
const hitSound = new Audio("sound/hit_sound.mp3"); // Path to your sound file

window.onload = function() {
    setGame();
}

function setGame() {
    // Set up the grid in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("mouseover", handleMouseOver); // Listen for mouse over
        tile.addEventListener("click", selectTile); // Listen for click
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // Every 1 second, set a new mole
    setInterval(setBomb, 2000); // Every 2 seconds, set a new bomb
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;

    // Check if there was a previously set mole tile and remove it if it exists
    if (currMoleTile && currMoleTile.firstChild) {
        currMoleTile.innerHTML = ""; // Remove the mole image
    }

    let mole = document.createElement("img");
    mole.src = "/images/mole.png";

    let num = getRandomTile();

    // Avoid placing the mole where the bomb is
    if (currBombTile && currBombTile.id === num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    if (currMoleTile) {
        currMoleTile.appendChild(mole); // Add mole to the selected tile
    }
}

function setBomb() {
    if (gameOver) return;

    // Check if there was a previously set bomb tile and remove it if it exists
    if (currBombTile && currBombTile.firstChild) {
        currBombTile.innerHTML = ""; // Remove the bomb image
    }

    let bomb = document.createElement("img");
    bomb.src = "/images/bomb.png";

    let num = getRandomTile();

    // Avoid placing the bomb where the mole is
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }

    currBombTile = document.getElementById(num);
    if (currBombTile) {
        currBombTile.appendChild(bomb); // Add bomb to the selected tile
    }
}

function handleMouseOver(event) {
    if (gameOver) return;

    const tile = event.target;

    // Check if the tile is the current mole tile
    if (tile === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "SCORE : " + score;

        // Play the hit sound
        hitSound.play();
    }
    // Check if the tile is the current bomb tile
    else if (tile === currBombTile) {
        alert("GAME OVER! Your final score is: " + score);
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score;
    }
}

function selectTile() {
    if (gameOver) return;
    // This function doesn't do much now since we are handling events on mouseover
    // If you want more specific behavior on clicking a tile, you can modify this logic
}