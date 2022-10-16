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
  constructor(name, height, diet, weight) {
    this.name = name;
    this.height = height;
    this.diet = diet;
    this.weight = weight;
    this.species = "human";
  }
}

function getHuman() {
  let name = document.getElementById("name").value;
  let height =
    +document.getElementById("inches").value +
    +document.getElementById("feet").value * 12;
  let diet = document.getElementById("diet").value;
  let weight = document.getElementById("weight").value;
  const human = new Human(name, height, diet, weight);
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
  const diff = Math.floor(this.weight - humanWeight);
  const factor = Math.floor(this.weight / humanWeight);
  const result = diff > 0 ? `${factor}x heavier` : `${-1 * diff} lbs lighter`;
  return result;
};

// Create Dino Compare Method 2 - height
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (humanHeight) {
  const diff = Math.floor(this.height - humanHeight);
  const factor = Math.floor(this.height / humanHeight);
  const result = diff > 0 ? `${factor}x taller` : `${-1 * diff} in. shorter`;
  return result;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (humanDiet) {
  return humanDiet.toLowerCase() == this.diet
    ? `${humanDiet} also!`
    : `${this.diet.charAt(0).toUpperCase()}${this.diet.slice(1)}`;
};

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
function removeForm() {
  document.getElementById("dino-compare").style.display = "none";
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// On button click, prepare and display
function generateFact(dino, human) {
  if (dino.species === "Pigeon") {
    return dino.fact;
  } else {
    const rndInt = randomIntFromInterval(1, 6);
    switch (rndInt) {
      case 1:
        return dino.compareWeight(human.weight);
      case 2:
        return dino.compareHeight(human.height);
      case 3:
        return dino.compareDiet(human.diet);
      case 4:
        return dino.fact;
      case 5:
        return `lived in ${dino.where}`;
      case 6:
        return `lived during ${dino.when}`;
      default:
        return "fact oops!";
    }
  }
}

let grid = document.getElementById("grid");
function displayInfographic() {
  removeForm();
  //   console.log(Date.now());
  human = getHuman();
  //   console.log(human);
  getDinos().then((dinos) => {
    // console.log(dinos);
    let index = 0;
    dinos.forEach((dino) => {
      // place human in the middle
      if (index === 4) {
        const cell = document.createElement("div");
        cell.setAttribute("class", "grid-item");

        const title = document.createElement("h3");
        title.innerText = human.name;
        cell.appendChild(title);

        const img = document.createElement("img");
        imgName = dino.species.toLowerCase();
        img.setAttribute("src", `images/human.png`);
        cell.appendChild(img);
        grid.appendChild(cell);
        index += 1;
      }

      const cell = document.createElement("div");
      cell.setAttribute("class", "grid-item");

      const title = document.createElement("h3");
      title.innerText = dino.species;
      cell.appendChild(title);

      const img = document.createElement("img");
      img.setAttribute("src", `images/${dino.species.toLowerCase()}.png`);
      cell.appendChild(img);

      const fact = document.createElement("p");
      fact.innerText = generateFact(dino, human);
      cell.appendChild(fact);
      grid.appendChild(cell);
      index += 1;
    });
  });
}

(function () {
  document.getElementById("btn").addEventListener("click", displayInfographic);
})();
