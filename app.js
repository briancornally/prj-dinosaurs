/**
 * @description Represents a Dinosaur
 * @constructor Create Dino Constructor
 * @param {string} species
 * @param {number} weight
 * @param {number} height
 * @param {string} diet
 * @param {number} where
 * @param {number} when
 * @param {number} fact
 */
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

/**
 * @description Create Dino Class Instances
 * @returns dinos promise
 */

function getDinos() {
  return fetch("dinos.json")
    .then((response) => response.json())
    .then((json) => {
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

/**
 * @description Represents a Human
 * @constructor Create Human Class Instance
 * @param {string} name
 * @param {number} height
 * @param {string} diet
 * @param {number} weight
 */
class Human {
  constructor(name, height, diet, weight) {
    this.name = name;
    this.height = height;
    this.diet = diet;
    this.weight = weight;
    this.species = "human";
  }
}

/**
 * @description generate a human div Tile
 * @param {string} human
 */
function generateHumanTile(human) {
  const tile = document.createElement("div");
  tile.setAttribute("class", "grid-item");

  const title = document.createElement("h3");
  title.innerText = human.name;

  const img = document.createElement("img");
  img.setAttribute("src", `images/human.png`);

  tile.appendChild(title);
  tile.appendChild(img);
  return tile;
}

/**
 * @description validate expected type and not empty
 * @param {string} value
 * @param {string} name
 * @param {string} expectedType
 */
function strValidate(value, name, expectedType) {
  try {
    if (expectedType === "number") {
      value = +value;
    }
    if (expectedType === "string" && !value.trim().length > 0) {
      throw new error();
    }
    if (expectedType === "number" && !value > 0) {
      throw new error();
    }
    actualType = typeof value;
    if (actualType != expectedType) {
      throw new error();
    }
  } catch {
    event.stopImmediatePropagation();
    let notify = document.getElementById("err");
    notify.innerHTML = "Please check " + name;
    notify.style.display = "block";
  }
}

/**
 * @description get human details from form DOM
 * @returns Human Class Instance
 */
function getHuman() {
  let name = document.getElementById("name").value;
  let feet = document.getElementById("feet").value;
  let inches = +document.getElementById("inches").value;
  let diet = document.getElementById("diet").value;
  let weight = document.getElementById("weight").value;

  strValidate(diet, "Diet:", "string");
  strValidate(weight, "Weight:", "number");
  strValidate(feet, "feet:", "number");
  strValidate(inches, "inches:", "number");
  strValidate(name, "Name:", "string");

  let height = +inches + feet * 12;
  const human = new Human(name, height, diet, weight);
  return human;
}

/**
 * @description get human details from form with IIFE
 * @param {string} value
 * @param {string} name
 * @param {string} expectedType
 */
(function () {
  document.getElementById("btn").addEventListener("click", getHuman);
})();

/**
 * @description Create Dino Compare Method 1 - weight
 * @returns string
 */
Dino.prototype.compareWeight = function (humanWeight) {
  const diff = Math.floor(this.weight - humanWeight);
  const factor = Math.floor(this.weight / humanWeight);
  const result = diff > 0 ? `${factor}x heavier` : `${-1 * diff} lbs lighter`;
  return result;
};

/**
 * @description Create Dino Compare Method 2 - height
 * @returns string
 */
Dino.prototype.compareHeight = function (humanHeight) {
  const diff = Math.floor(this.height - humanHeight);
  const factor = Math.floor(this.height / humanHeight);
  const result = diff > 0 ? `${factor}x taller` : `${-1 * diff} in. shorter`;
  return result;
};

/**
 * @description Create Dino Compare Method 3 - diet
 * @returns string
 */
Dino.prototype.compareDiet = function (humanDiet) {
  return humanDiet.toLowerCase() == this.diet
    ? `${humanDiet} also!`
    : `${this.diet.charAt(0).toUpperCase()}${this.diet.slice(1)}`;
};

/**
 * @description helper function for random number
 * @returns number
 */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @description helper function to generate fact
 * @param {Dino Class} dino
 * @param {Human Class} human
 * @returns string
 */
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

/**
 * @description Generate Tiles for each Dino in Array
 * @param {Dino Class} dino
 * @param {Human Class} human
 * @returns html tile
 */
function generateDinoTile(dino, human) {
  const tile = document.createElement("div");
  tile.setAttribute("class", "grid-item");
  const title = document.createElement("h3");
  const img = document.createElement("img");
  title.innerText = dino.species;
  img.setAttribute("src", `images/${dino.species.toLowerCase()}.png`);

  const fact = document.createElement("p");
  fact.innerText = generateFact(dino, human);
  tile.appendChild(fact);
  tile.appendChild(title);
  tile.appendChild(img);
  return tile;
}

/**
 * @description Add tiles to DOM
 */
function addTilesToDOM() {
  let grid = document.getElementById("grid");
  human = getHuman();
  getDinos().then((dinos) => {
    index = 0;
    dinos.forEach((dino) => {
      // place human in the middle
      if (index === 4) {
        let newTile = generateHumanTile(human);
        grid.appendChild(newTile);
      }
      let newTile = generateDinoTile(dino, human);
      grid.appendChild(newTile);
      index += 1;
    });
  });
}

/**
 * @description Remove form from screen
 */
function removeForm() {
  document.getElementById("dino-compare").style.display = "none";
}

/**
 * @description On button click, prepare and display
 */
function displayInfographic() {
  removeForm();
  addTilesToDOM();
}

/**
 * @description displayInfographic with IIFE
 */
(function () {
  document.getElementById("btn").addEventListener("click", displayInfographic);
})();
