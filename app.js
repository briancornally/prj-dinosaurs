// Create Dino Constructor

// Create Dino Objects

// Create Human Object

class Human {
  constructor(name, feet, inches, diet, weight) {
    (this.name = name),
      (this.feet = feet),
      (this.inches = inches),
      (this.diet = diet),
      (this.weight = weight),
      (this.species = "human"),
      (this.img = "human");
  }
}

// Use IIFE to get human data from form

function newHuman() {
  let name = document.getElementById("name").value;
  let feet = document.getElementById("feet").value;
  let inches = document.getElementById("inches").value;
  let diet = document.getElementById("diet").value;
  let weight = document.getElementById("diet").value;
  const human = new Human(name, feet, inches, diet);
  console.log(human)
}

/**
 * @description IIFE to attach the event listeners on the buttons
 */
(function () {
  document.getElementById("btn").addEventListener("click", newHuman);
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
function removeForm() {
	document.getElementById('dino-compare').style.display = 'none';
}

// On button click, prepare and display infographic
function displayInfographic() {
	removeForm()
	console.log(Date.now());
}

(function () {
	document.getElementById("btn").addEventListener("click", displayInfographic);
})();
  