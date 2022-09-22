import "./styles.css";
var userSelection = "";
var characterList = [
  "batman",
  "finn",
  "superman",
  "bugs",
  "shaggy",
  "jake",
  "lebron",
  "harley",
  "taz",
  "arya",
  "steven",
  "velma",
  "reindog",
  "garnet",
  "wonder_woman",
  "tom_and_jerry",
  "iron_giant"
];

var rankingOrder = [
  { S: ["batman", "finn", "superman", "bugs"] },
  { A: ["shaggy", "jake", "lebron", "harley"] },
  { B: ["taz", "arya", "steven", "velma", "reindog"] },
  { C: ["garnet", "wonder_woman", "tom_and_jerry"] },
  { D: ["iron_giant"] }
];

const inputField = document.getElementById("input-field-character");

function searchCharacter() {
  // Declare variables
  var input, filter, tierDiv, img, i, txtValue;
  input = document.getElementById("input-field-character");
  filter = input.value.toUpperCase();
  tierDiv = document.getElementById("tier-row-full-list");
  img = tierDiv.getElementsByTagName("img");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < img.length; i++) {
    txtValue = img[i].attributes["datavalue"].value;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      img[i].style.display = "";
    } else {
      img[i].style.display = "none";
    }
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const rankingOrderKeys = rankingOrder.map((item) => Object.keys(item)[0]);

// function searchCharacter(array, inputValue) {
//   console.log(inputValue);
//   var score = 0;
//   array.filter((word) => (word === inputValue ? console.log(word) : ""));

// }
/**
 * Empty Row Field
 * Add New Row
 *
 */
// const Add New Character = document.getElementsByClassName("btn-new");
// const tierRow = document.getElementById("tier-row");
const tier_row_container = document.getElementById("tier-row-container");
const tier_row_full_list = document.getElementById("tier-row-full-list");
const characterIcon = document.querySelectorAll(".characterIcon");
const tier_selection_container = document.getElementById(
  "tier-selection-container"
);
const rank_selection_list = document.querySelectorAll(".ranking-key-text");

// array.forEach(element => {

// });
// constcharacterIcon.forEach((element)=>{
//   element.addEventListener("click", (event) => {
//     console.log(event.target.attributes["charKey"].value);
//   });

// })

let tierSelectRow = () => {
  let icons = rankingOrderKeys.map((rankKey) => {
    return `
    <div class="ranking-key-text" dataValue="${rankKey}" >
      ${rankKey}
    </div>`;
  });
  let tierRow = `<div class="ranking-select-row glassmorph">${icons
    .join(",")
    .replace(/,/g, "")}</div>`;
  return tierRow;
};

let rank = rankingOrder.map((rank) => {
  let key = Object.keys(rank);
  let images = rank[key].map((img, index) => {
    return `<img class="avatar characterRemoveIcon" charKey="${index}" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
  });
  return ` 
  <div class="tier-row">
    <div class="tier-heading-wrapper"><p class="tier-heading">${key}:</p></div>
    <div class="tier-body avatar-wrapper">
      ${images.join(",").replace(/,/g, "")}
    </div>
  </div>`;
});

let characterRankDiv = () => {
  let images = characterList.map((img, index) => {
    return `<img class="characterIcon" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
  });

  return [
    `<div class=" tier-full-list">
    <div class="tier-heading-wrapper"><p class="tier-heading"> List: </p></div>
    <div class="tier-full-body avatar-wrapper">
      ${images.join(",").replace(/,/g, "")}
    </div>
  </div>`
  ];
};
/* Content Has Loaded Render Table */

tier_row_container.innerHTML = rank.join(",").replace(/,/g, "");
tier_row_full_list.innerHTML = characterRankDiv();
tier_selection_container.innerHTML = tierSelectRow();

// tier_row_full_list.innerHTML = characterRankDiv()
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

/*-------------------
 * Event Listeners
 -------------------*/

// Event - Display Modal
inputField.addEventListener("input", (event) => {
  // modal.style.display = "block";
  searchCharacter(characterList, event.target.value);
});
// Event - Search Character in Modal
inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    console.log(event.key);
    console.log(event.target.value);
  }
});

const tier_row_full_list_CharacterList = document.querySelectorAll(
  ".characterIcon"
);

for (let i = 0; i < tier_row_full_list_CharacterList.length; i++) {
  tier_row_full_list_CharacterList[i].addEventListener("click", (event) => {
    modal.style.display = "block";
    console.log(event.target.attributes["datavalue"].value);
    // userSelection = event.target.attributes["datavalue"].value;
    // for (let y = 0; y < rank_selection_list.length; y++) {
    //   rank_selection_list[y].addEventListener("click", (event) => {
    //     console.log(event.target.attributes["datavalue"].value);
    //   });
    // }
  });
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// tier_row_full_list_CharacterList.map((item) =>{
//
// })
console.log("user selection: ", userSelection);
