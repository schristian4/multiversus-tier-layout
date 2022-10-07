import "./styles.css";
var selectedCharacter = "";
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

var rankingOrder = [{ S: [] }, { A: [] }, { B: [] }, { C: [] }, { D: [] }];

// function clg(content) {
//   console.log(`${content}`, content);
// }

// var rankingOrder = [
//   { S: ["batman", "finn", "superman", "bugs"] },
//   { A: ["shaggy", "jake", "lebron", "harley"] },
//   { B: ["taz", "arya", "steven", "velma", "reindog"] },
//   { C: ["garnet", "wonder_woman", "tom_and_jerry"] },
//   { D: ["iron_giant"] }
// ];

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

// Get the modal id
var modal = document.getElementById("myModal");

// Get the <span> Close Button element that hides the modal
var span = document.getElementsByClassName("close")[0];
const rankingOrderKeys = rankingOrder.map((item) => Object.keys(item)[0]);
const tier_row_container = document.getElementById("tier-row-container");
const tier_row_full_list = document.getElementById("tier-row-full-list");
const tier_modal_selection_container = document.getElementById(
  "tier-modal-selection-container"
);

// JSX - Create Tier Modal Div
function tierModalSelectRow() {
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
}
// JSX - Create Tier Ranks
function renderRanks(content) {
  let rank = content.map((rank) => {
    let key = Object.keys(rank);
    let characters = rank[key].map((img, index) => {
      return `<img class="avatar characterRemoveIcon" charKey="${index}" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
    });
    return ` 
    <div class="tier-row">
      <div class="tier-heading-wrapper"><p class="tier-heading">${key}:</p></div>
      <div class="tier-body avatar-wrapper">
        ${characters.join(",").replace(/,/g, "")}
      </div>
    </div>`;
  });
  return rank;
}
// JSX - Create Tier Ranking List with Characters
function renderCharacterRankList(content) {
  let characterImage = content.map((img, index) => {
    return `<img class="characterIcon" src="./image/${img}.webp" dataValue="${img}" alt="${img}">`;
  });
  let characterDivArray = [
    `<div class=" tier-full-list">
    <div class="tier-heading-wrapper"><p class="tier-heading"> List: </p></div>
    <div class="tier-full-body avatar-wrapper">
      ${characterImage.join(",").replace(/,/g, "")}
    </div>
  </div>`
  ];
  return characterDivArray;
}
/* Content Has Loaded Render Table */
function updateTierRowContainer(content) {
  tier_row_container.innerHTML = content.join(",").replace(/,/g, "");
  console.log(tier_row_container);
}
function updateCharacterRankList(content) {
  tier_row_full_list.innerHTML = content;
}

tier_modal_selection_container.innerHTML = tierModalSelectRow();
const ranking_key_text = document.querySelectorAll(".ranking-key-text");

/*-------------------
 * Event Listeners
 -------------------*/

// Event - Display Modal
function handleDisplayModal() {
  inputField.addEventListener("input", (event) => {
    // modal.style.display = "block";
    searchCharacter(characterList, event.target.value);
  });
}
// Event - Search Character from character list
function handleSearchCharacterModal() {
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      console.log(event.key);
      console.log(event.target.value);
    }
  });
}
// Event - Display Ranking Modal
function modalDisplayEventListner() {
  console.log("trigger modal display");
  let tierFullList = document.querySelectorAll(".characterIcon");
  for (let i = 0; i < tierFullList.length; i++) {
    debugger;
    tierFullList[i].addEventListener("click", (event) => {
      modal.style.display = "block";
      console.log(event.target.attributes["datavalue"].value);
      selectedCharacter = event.target.attributes["datavalue"].value;
    });
  }
}
// Add Character to Ranking Row and Rerender update rank character list
function AddCharacterToRow(rank_Key, character) {
  for (let i = 0; i < rankingOrder.length; i++) {
    if (rankingOrder[i][rank_Key] !== undefined) {
      rankingOrder[i][rank_Key].push(character);
    }
  }
  updateTierRowContainer(renderRanks(rankingOrder));
}
// Removes a charactr from the list and re-renders the character list
function removeFromCharacterList(content) {
  const findCharacter = (element) => element === content;
  let matchCharacterIndex = characterList.findIndex(findCharacter);
  characterList.splice(matchCharacterIndex, 1);
  updateCharacterRankList(renderCharacterRankList(characterList));
  modalDisplayEventListner();
}
// Event - Add Character to Ranking Row
function handlAddCharacterRow() {
  for (let i = 0; i < ranking_key_text.length; i++) {
    ranking_key_text[i].addEventListener("click", (event) => {
      let rank = event.target.attributes["datavalue"].value;
      modal.style.display = "none";
      AddCharacterToRow(rank, selectedCharacter);
      removeFromCharacterList(selectedCharacter);
    });
  }
}

// Initialize All Functions
function initializeAllFunctions() {
  updateTierRowContainer(renderRanks(rankingOrder));
  updateCharacterRankList(renderCharacterRankList(characterList));
  handleSearchCharacterModal();
  modalDisplayEventListner();
  handleDisplayModal();
  handlAddCharacterRow();
}
initializeAllFunctions();

//Event - Close button modal
span.onclick = function () {
  modal.style.display = "none";
};
//Event - Close Modal Click Whitespace
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
