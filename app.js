// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
  }
}

// Create Dino Objects

function getDinos() {
  return fetch("dinos.json")
    .then((response) => response.json())
    .then((json) => {
      console.log("getDinos");
      console.log(json);
      return json.Dinos.map(
        (dino) =>
          new Dino(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact
          )
      );
    })
    .catch((error) => console.log(error));
}

// Create Human Object

class Human {
  constructor(name, feet, inches, diet, weight) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.diet = diet;
    this.weight = weight;
    this.species = "human";
  }
}

function getHuman() {
  let name = document.getElementById("name").value;
  let feet = document.getElementById("feet").value;
  let inches = document.getElementById("inches").value;
  let diet = document.getElementById("diet").value;
  let weight = document.getElementById("weight").value;
  const human = new Human(name, feet, inches, diet, weight);
  console.log("newHuman");
  console.log(human);
  return human;
}

// Use IIFE to get human data from form
(function () {
  document.getElementById("btn").addEventListener("click", getHuman);
})();

// Create Dino Compare Method 1 - weight
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (humanWeight) {
  const diffValue = Math.floor(this.weight - humanWeight);
  const result =
    diffValue > 0 ? `${diffValue} heavier` : `${diffValue} lighter`;
  return result;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
function removeForm() {
  document.getElementById("dino-compare").style.display = "none";
}

// On button click, prepare and display infographic
let grid = document.getElementById("grid");
function displayInfographic() {
  removeForm();
  //   console.log(Date.now());
  human = getHuman();
  console.log(human);
  getDinos().then((dinos) => {
    // console.log(dinos);
    dinos.forEach((dino) => {
      const cell = document.createElement("div");
      cell.setAttribute("class", "grid-item");
      const title = document.createElement("h3");
      title.innerText = dino.species;
      cell.appendChild(title);
      // const img = document.createElement("img");
      // img.setAttribute('src', `images/${dino.species}.png`)

      const fact = document.createElement("p");
      fact.innerText = dino.compareWeight(human.weight);
      cell.appendChild(fact);

      //   cell.appendChild(img);
      grid.appendChild(cell);
      // console.log("xxx");
      // console.log(dino);
    });
  });
}

(function () {
  document.getElementById("btn").addEventListener("click", displayInfographic);
})();
